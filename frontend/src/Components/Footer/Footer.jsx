import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">회사 소개</h3>
              <p className="text-gray-400">
                저희회사는 최고의 서비를 제공하기 위해 노력합니다. 완전히
                촬영잘합니다.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">빠른 링크</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    회사 정보
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leadership"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    임원 소개
                  </Link>
                </li>
                <li>
                  <Link
                    to="/board"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    업무 게시판
                  </Link>
                </li>
                <li>
                  <Link
                    to="/our-services"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    제공 기술
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={scrollToTop}
                    className="hover:text-white transition-colors"
                  >
                    문의
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">연락처</h3>
              <ul className="space-y-2 text-gray-400">
                <li>경상남도 진주시</li>
                <li>호탄동 624-19 1층</li>
                <li>대표 권오형 010-8553-0545</li>
                <li>이메일: marumidi@naver.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">소셜 미디어</h3>
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

          <div className="border-t borber-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Maru company. All rights reseved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
