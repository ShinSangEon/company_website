import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import footerLocale from "../../Locale/Footer.json"; // JSON 파일 불러오기

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
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

  // JSON 데이터에서 텍스트 가져오는 함수
  const getLocalizedText = (key) => {
    const keys = key.split(".");
    return (
      keys.reduce((obj, k) => obj?.[k], footerLocale[currentLanguage]) || key
    );
  };

  return (
    <div>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* 🔹 회사 소개 */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {getLocalizedText("footer.company.title")}
              </h3>
              <p className="text-gray-400">
                {getLocalizedText("footer.company.description")}
              </p>
            </div>

            {/* 🔹 빠른 링크 */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {getLocalizedText("footer.quickLinks.title")}
              </h3>
              <ul className="space-y-2">
                {[
                  "home",
                  "about",
                  "leadership",
                  "board",
                  "services",
                  "contact",
                ].map((key) => (
                  <li key={key}>
                    <Link
                      to={`/${key}`}
                      onClick={scrollToTop}
                      className="hover:text-white transition-colors"
                    >
                      {getLocalizedText(`footer.quickLinks.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 🔹 연락처 */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {getLocalizedText("footer.contact.title")}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>{getLocalizedText("footer.contact.address1")}</li>
                <li>{getLocalizedText("footer.contact.address2")}</li>
                <li>{getLocalizedText("footer.contact.phone")}</li>
                <li>{getLocalizedText("footer.contact.email")}</li>
              </ul>
            </div>

            {/* 🔹 소셜 미디어 */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {getLocalizedText("footer.social.title")}
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* 🔹 저작권 표시 */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{getLocalizedText("footer.copyright")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
