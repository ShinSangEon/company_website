import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroImage from "../../assets/videoEdit.jpg";
import { Link } from "react-router-dom";
import CountUp from "react-countup";
import heroLocale from "../../Locale/Hero.json"; // JSON 파일 불러오기

// 🔹 모션 애니메이션 설정
const textVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
};

const buttonVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.5 } },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.7 },
  },
};

const statusVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1 } },
};

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("language") || "ko"
  );

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(localStorage.getItem("language") || "ko");
    };
    window.addEventListener("languageChange", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);

  // 🔹 JSON 데이터에서 텍스트 가져오는 함수
  const getLocalizedText = (key) => {
    const keys = key.split(".");
    return (
      keys.reduce((obj, k) => obj?.[k], heroLocale[currentLanguage]) || key
    );
  };

  return (
    <div className="relative min-h-[120vh] bg-gradient-to-b from-gray-50 to-white pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* 🔹 텍스트 부분 */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              className="text-3xl sm:text-4xl 2xl:text-5xl font-bold text-gray-900 leading-tight mb-6 lg:mb-12"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              {getLocalizedText("title.main")}
              <motion.span
                className="block text-blue-600 mt-2 lg:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {getLocalizedText("title.highlight")}
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-800 text-semibold mb-8 max-w-2xl mx-auto"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              {getLocalizedText("description")}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/contact">
                <motion.button
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold shadow-lg hover:shadow-xl"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariant}
                >
                  {getLocalizedText("buttons.consult")}
                </motion.button>
              </Link>
              <Link to="/our-services">
                <motion.button
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors duration-300 text-lg font-semibold"
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariant}
                >
                  {getLocalizedText("buttons.learnMore")}
                </motion.button>
              </Link>
            </div>
          </div>

          {/* 🔹 이미지 부분 */}
          <motion.div
            className="flex-1 w-full max-w-2xl lg:max-w-none"
            initial="hidden"
            animate="visible"
            variants={imageVariant}
          >
            <img
              src={HeroImage}
              className="relative rounded-2xl shadow-2xl w-full max-h-[400px] object-cover transform hover:scale-[1.02] transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* 🔹 통계 섹션 */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {Object.keys(getLocalizedText("stats")).map((key, index) => {
            const rawNumber = getLocalizedText(`stats.${key}.number`);

            // ✅ 24/7 같은 경우를 처리하기 위해, 숫자와 나머지 기호를 분리
            let extractedNumber, suffix;
            if (rawNumber.includes("/")) {
              // 24/7 같은 경우는 숫자 두 개를 분리해서 따로 표시
              const parts = rawNumber.split("/");
              extractedNumber = parseInt(parts[0], 10);
              suffix = `/${parts[1]}`; // `/7`을 유지
            } else {
              extractedNumber = parseInt(rawNumber.replace(/[^0-9]/g, ""), 10);
              suffix = rawNumber.replace(/[0-9,]/g, "").trim();
            }

            return (
              <motion.div
                key={index}
                className="text-center"
                initial="hidden"
                animate="visible"
                variants={statusVariant}
              >
                {/* 숫자 카운트 애니메이션 */}
                <div className="text-3xl font-bold text-blue-600">
                  <CountUp start={0} end={extractedNumber} duration={5} />
                  {suffix} {/* 올바른 접미사 유지 */}
                </div>
                <div className="text-gray-900">
                  {getLocalizedText(`stats.${key}.label`)}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🔹 서비스 과정 (Process) */}
      <motion.div
        className="container mx-auto px-6 py-16 bg-blue-50 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={statusVariant}
      >
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          {currentLanguage === "ko"
            ? "비디오 편집 과정"
            : "Video Editing Process"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.keys(getLocalizedText("process")).map((step, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial="hidden"
              animate="visible"
              variants={statusVariant}
            >
              <h3 className="text-lg font-bold">
                {getLocalizedText(`process.${step}.title`)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedText(`process.${step}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 서비스 특징 섹션 (Features) */}
      <motion.div
        className="container mx-auto px-6 py-16 bg-gray-50 rounded-lg shadow-md"
        initial="hidden"
        animate="visible"
        variants={statusVariant}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {currentLanguage === "ko" ? "🎯 우리의 강점" : "🎯 Our Strengths"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.keys(getLocalizedText("features")).map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
              initial="hidden"
              animate="visible"
              variants={statusVariant}
            >
              <h3 className="text-lg font-bold">
                {getLocalizedText(`features.${feature}.title`)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedText(`features.${feature}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 자주 묻는 질문 (FAQ) */}
      <motion.div
        className="container mx-auto px-6 py-16"
        initial="hidden"
        animate="visible"
        variants={statusVariant}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {currentLanguage === "ko"
            ? "❓ 자주 묻는 질문"
            : "❓ Frequently Asked Questions"}
        </h2>
        <div className="max-w-4xl mx-auto space-y-6">
          {Object.keys(getLocalizedText("faq")).map((faq, index) => (
            <motion.div
              key={index}
              className="border-b pb-4 last:border-none last:pb-0"
              initial="hidden"
              animate="visible"
              variants={textVariant}
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {getLocalizedText(`faq.${faq}.question`)}
              </h3>
              <p className="text-gray-600">
                {getLocalizedText(`faq.${faq}.answer`)}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
