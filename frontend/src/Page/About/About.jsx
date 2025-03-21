import React, { useState, useEffect } from "react";
import companyImage from "../../assets/camera.jpg";
import { motion } from "framer-motion";
import aboutData from "../../Locale/about.json"; // JSON 데이터 불러오기

// 🔹 애니메이션 효과 설정
const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2 },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const About = () => {
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
    return keys.reduce((obj, k) => obj?.[k], aboutData[currentLanguage]) || key;
  };

  return (
    <motion.div className="container mx-auto px-4 py-32 max-w-7xl">
      {/* 🔹 이미지 섹션 */}
      <motion.div
        className="relative rounded-2xl overflow-hidden shadow-2xl mb-24"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img src={companyImage} className="w-full h-[450px] object-cover" />
      </motion.div>

      {/* 🔹 회사 소개 */}
      <motion.div className="mb-24 max-w-4xl mx-auto" variants={fadeInVariants}>
        <h2 className="text-5xl font-bold mb-10 text-gray-900">
          {getLocalizedText("about.title")}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          {getLocalizedText("about.description")}
        </p>
      </motion.div>

      {/* 🔹 서비스 섹션 */}
      <motion.div className="mb-24">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          {getLocalizedText("about.services.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.keys(getLocalizedText("about.services.items")).map(
            (key, index) => (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300 border border-gray-100"
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                  {getLocalizedText(`about.services.items.${key}.title`)}
                </h3>
                <p className="text-gray-600 text-lg">
                  {getLocalizedText(`about.services.items.${key}.desc`)}
                </p>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      {/* 🔹 핵심 가치 */}
      <motion.div className="mb-24">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          {getLocalizedText("about.services.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {getLocalizedText("about.services.items").map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-10 rounded-xl shadow-lg text-center"
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
            >
              <h3 className="text-2xl font-bold mb-4 text-indigo-600">
                {service.title}
              </h3>
              <p className="text-gray-600 text-lg">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 🔹 회사 연혁 */}
      <motion.div className="mb-24">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">
          {getLocalizedText("about.history.title")}
        </h2>
        <div className="space-y-12 max-w-5xl mx-auto">
          {getLocalizedText("about.history.events").map(
            ({ year, event }, index) => (
              <motion.div
                key={index}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
              >
                {/* 연혁 카드 */}
                <div className="w-1/2 text-center">
                  <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100">
                    <h3 className="text-2xl font-bold mb-3 text-indigo-600">
                      {year}
                    </h3>
                    <p className="text-gray-700 text-lg">{event}</p>
                  </div>
                </div>

                {/* 타임라인 점 */}
                <div className="w-4 h-4 bg-indigo-600 rounded-full"></div>

                {/* 빈 공간 - 번갈아 배치 */}
                <div className="w-1/2"></div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
