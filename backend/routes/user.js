const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const axios = require("axios");
const jwt = require("jsonwebtoken");

// ✅ 회원가입 라우트 추가 (회원가입과 로그인 통합)
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1. 이미 존재하는 사용자 확인
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. 새 사용자 생성
    const user = new User({
      username,
      email,
      password: hashedPassword,
      isActive: true,
      failedLoginAttempts: 0,
      isLoggedIn: false,
    });

    await user.save();
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "이미 존재하는 사용자입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "사용자를 찾을 수 없습니다." });
    }

    if (!user.isActive) {
      return res
        .status(401)
        .json({ message: "비활성화된 계정입니다. 관리자에게 문의하세요." });
    }

    if (user.isLoggedIn) {
      return res
        .status(401)
        .json({ message: "이미 다른 기기에서 로그인되어 있습니다." });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      user.failedLoginAttempts += 1;
      user.lastLoginAttempt = new Date();

      if (user.failedLoginAttempts >= 5) {
        user.isActive = false;
        await user.save();
        return res.status(401).json({
          message: "비밀번호를 5회 이상 틀려 계정이 비활성화되었습니다.",
        });
      }

      await user.save();
      return res.status(401).json({
        message: "비밀번호가 일치하지 않습니다.",
        remainingAttempts: 5 - user.failedLoginAttempts,
      });
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAttempt = new Date();
    user.isLoggedIn = true;

    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = response.data.ip;
      user.ipAddress = ipAddress;
    } catch (ipError) {
      console.error("IP 주소를 가져오는 중 오류 발생:", ipError.message);
    }

    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error("서버 오류:", error.message);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: "이미 로그아웃된 상태입니다." });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);

      if (user) {
        user.isLoggedIn = false;
        await user.save();
      }
    } catch (error) {
      console.log("토큰 검증 오류: ", error.message);
    }

    res.clearCookie("token", {
      httpOnly: true,
      secure: "production",
      sameSite: "strict",
    });

    res.json({ message: "로그아웃되었습니다." });
  } catch (error) {
    console.log("로그아웃 오류: ", error.message);
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/delete/:userId", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    res.json({ message: "사용자가 성공적으로 삭제되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.post("/verify-token", async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ isValid: false, message: "토큰이 유효하지 않습니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res
        .status(401)
        .json({ isValid: false, message: "사용자를 찾을 수 없습니다." });
    }

    const now = new Date();
    const lastActiveAt = new Date(user.lastActiveAt);
    const inactiveTime = (now - lastActiveAt) / (1000 * 60); // ✅ 분 단위 변환

    if (inactiveTime > 30) {
      // ✅ 30분 이상 비활동 시 자동 로그아웃
      user.isLoggedIn = false;
      await user.save();
      return res
        .status(401)
        .json({
          isValid: false,
          message: "세션이 만료되었습니다. 다시 로그인하세요.",
        });
    }

    user.lastActiveAt = now; // ✅ 활동 시 시간 업데이트
    await user.save();

    return res.status(200).json({ isValid: true, user: decoded });
  } catch (error) {
    return res
      .status(401)
      .json({ isValid: false, message: "토큰이 유효하지 않습니다." });
  }
});

module.exports = router;
