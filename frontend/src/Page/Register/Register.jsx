import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const buttonVariants = {
  hover: { scale: 1.05, transition: { duration: 0.3 } },
  tap: { scale: 0.95 },
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        setSuccess("회원가입이 완료되었습니다! 🎉");
        setError("");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    } catch (error) {
      setSuccess("");
      setError(error.response?.data?.message || "회원가입에 실패했습니다.");
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex items-center justify-center px-4"
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl"
        variants={fadeIn}
        custom={0}
      >
        <motion.div className="text-center mb-6" variants={fadeIn} custom={1}>
          <h2 className="text-3xl font-semibold text-gray-900">회원가입</h2>
          <p className="text-lg text-gray-600">
            계정을 만들고 서비스를 이용하세요.
          </p>
        </motion.div>

        <motion.form
          className="space-y-6"
          onSubmit={handleSubmit}
          variants={fadeIn}
          custom={2}
        >
          {[
            {
              name: "username",
              label: "사용자 이름",
              type: "text",
              placeholder: "로그인시 사용할 아이디",
            },
            {
              name: "email",
              label: "이메일",
              type: "email",
              placeholder: "example@example.com",
            },
            {
              name: "password",
              label: "비밀번호",
              type: "password",
              placeholder: "비밀번호 입력",
            },
            {
              name: "confirmPassword",
              label: "비밀번호 확인",
              type: "password",
              placeholder: "비밀번호 재입력",
            },
          ].map((field, index) => (
            <motion.div key={index} variants={fadeIn} custom={index + 3}>
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <motion.input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                placeholder={field.placeholder}
                whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
              />
            </motion.div>
          ))}

          {error && (
            <motion.div
              className="bg-red-50 text-red-500 p-4 rounded-lg text-base font-bold text-center"
              variants={fadeIn}
              custom={7}
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="bg-green-50 text-green-600 p-4 rounded-lg text-base font-bold text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {success}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="w-full px-4 py-3 border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium transition-colors duration-300"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            회원가입
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Register;
