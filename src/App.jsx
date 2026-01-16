import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronRight,
  MapPin,
  Clock,
  Calendar,
  Heart,
  Users,
  Youtube,
  ArrowRight,
  UserPlus,
  FileText,
  BookOpen,
  Search,
  Hash,
  ChevronLeft,
  ChevronDown,
  ExternalLink,
  Download,
  Copy,
} from "lucide-react";
import mainLogo from "./assets/mainlogo-removebg-preview.png";
import background02 from "./assets/background02.jpg";
import background03 from "./assets/background03.jpg";
import temp01 from "./assets/yoon.jpg";
import temp02 from "./assets/temp01.jpg";
import temp03 from "./assets/temp02.jpg";
import temp04 from "./assets/temp03.jpg";
import spastor_ko from "./assets/spastor_ko.png";
import keep from "./assets/keep.png";
import Worship from "./assets/worship01.png";
import moment from "moment";
import "moment/locale/ko";
import {
  bookList,
  coreValuePart1,
  coreValuePart2,
  groups,
  historyData,
  vision,
} from "./data";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";

const RECEIPT_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfD5f0YpO6Y1b9Z6U6Yz4k3n8FQ1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1ZQ/viewform";

// 커스텀 재생 버튼 컴포넌트
const CustomPlayButton = ({ size = 64, className = "" }) => (
  <div
    className={`flex items-center justify-center transition-transform duration-300 hover:scale-110 drop-shadow-lg cursor-pointer ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 15L0 30V0L24 15Z" fill="white" />
    </svg>
  </div>
);

// --- 서브 페이지용 헤더 ---
const HeroSub = ({ title, subtitle, image }) => (
  <div className="relative h-[300px] flex items-center justify-center bg-slate-900 overflow-hidden">
    <img
      src={image}
      alt="bg"
      className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
    <div className="relative z-10 text-center">
      <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
      <p className="text-sky-300 font-medium tracking-wide uppercase">
        {subtitle}
      </p>
    </div>
  </div>
);

// --- Hero Carousel Component ---
const HeroCarousel = ({ slides, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides, interval]);

  return (
    <div className="absolute inset-0 bg-slate-900">
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-60" : "opacity-0"
          }`}
          alt={`Hero Slide ${index + 1}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/40 to-transparent"></div>
    </div>
  );
};

// --- Simple Carousel Component (Replaces reactstrap) ---
const SimpleCarousel = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] group bg-slate-100">
      {items.map((item, index) => (
        <div
          key={item.key || index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={item.src}
            alt={item.altText}
            className="w-full h-full object-cover"
          />
          {/* Caption Overlay */}
          {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-8 md:p-12 text-white text-center flex flex-col justify-end h-1/2">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 drop-shadow-md">
              {item.header}
            </h3>
          </div> */}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300"
      >
        <ChevronRight size={32} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {items.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// --- 메인 페이지 컴포넌트 ---
const MainPage = () => {
  const navigate = useNavigate();
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const slides = [background02, background03];

  const handleNavClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="animate-fade-in">
        {/* 1. Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image & Overlay */}
          <HeroCarousel slides={slides} />

          {/* Hero Content */}
          <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-white mt-10">
            <div className="mb-4">
              {/* <span className="text-sky-300 font-bold text-lg tracking-wide border-b-2 border-sky-300 pb-1">수원하나교회</span> */}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
              하나님을 즐거워하고
              <br />그 분의 목적에 헌신하는 공동체
            </h1>
            <div className="flex flex-col gap-1 mb-10 text-slate-200 font-light text-sm md:text-base">
              <p>주일예배 매주 1부(9:00), 2부(11:00), 3부(14:30)</p>
              <p>금요예배 매주 9:00</p>
            </div>
            <button
              onClick={() => handleNavClick("/intro/vision")}
              className="group flex items-center gap-2 text-white border border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white hover:text-slate-900 px-8 py-3 rounded-full transition-all duration-300"
            >
              자세히 보기{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </section>

        {/* 2. Welcome Message Section */}
        <section className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-snug">
              수원하나교회에 오신 것을 환영합니다!
            </h3>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed font-light mb-12">
              <p>
                수원하나교회는 하나님을 즐거워하고 그 분의 목적에 헌신하는
                공동체입니다.
              </p>
              <p className="text-base md:text-lg">
                <strong className="text-slate-900">하나</strong>의 의미는{" "}
                <span className="font-semibold text-slate-800">
                  하나님의 나라(Kingdom of God)
                </span>
                를 건설하고
                <br className="hidden md:block" />
                형제 자매가{" "}
                <span className="font-semibold text-slate-800">
                  연합(Unity)
                </span>
                하여 하나가 되어간다는 의미입니다.
              </p>
              <p className="text-sm text-slate-400 pt-4">
                수원하나교회는 기독교 한국 침례회 교단 소속 입니다.
              </p>
            </div>

            <button
              onClick={() => handleNavClick("/intro/pastor")}
              className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold text-sm hover:bg-sky-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
            >
              더 알아보기
            </button>
          </div>
        </section>

        {/* --- Newcomer Guide Section (Design Updated with Step 4) --- */}
        <section className="py-24" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-left mb-16">
              {/* <h2 className="text-sky-600 font-bold tracking-widest text-sm uppercase mb-3">Newcomer Guide</h2> */}
              <h3 className="text-4xl font-bold text-slate-900 mb-6">
                처음이신가요?
              </h3>
              <p className="text-slate-500 text-lg mb-8">
                수원하나교회에 오신 것을 환영합니다. 등록 절차를 안내해
                드립니다. 새가족 담당자 (신상철 목사 :010-2484-0776)
              </p>
            </div>

            <div className="relative pl-4 md:pl-0">
              {/* Vertical Line for Mobile layout adjustment */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-sky-100 md:hidden"></div>

              {/* 그리드를 4열로 변경하여 Step 4 추가 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {/* Step 1 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-300">
                      <UserPlus size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-sky-50 transition-colors">
                      01
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-sky-600 font-bold text-xs mb-2 tracking-wider">
                      STEP 01
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      새가족 담당 문의
                    </h4>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <FileText size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      02
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 02
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      등록카드 작성
                    </h4>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <BookOpen size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      03
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 03
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      새가족 교육 (6주)
                    </h4>
                  </div>
                </div>

                {/* Step 4 (추가됨) */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start h-full">
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors duration-300">
                      <Users size={24} />
                    </div>
                    <span className="text-4xl font-bold text-slate-100 group-hover:text-slate-100 transition-colors">
                      04
                    </span>
                  </div>
                  <div>
                    <span className="inline-block text-slate-400 font-bold text-xs mb-2 tracking-wider">
                      STEP 04
                    </span>
                    <h4 className="font-bold text-xl text-slate-900">
                      셀 배정
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Sermon Preview --- */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-8">
              <div>
                <span className="text-sky-600 font-bold uppercase tracking-wide text-sm">
                  Sermon Bank
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mt-2">
                  주일 강단 메세지
                </h2>
              </div>
              <button
                className="hidden md:flex items-center text-slate-500 hover:text-sky-600 text-sm font-medium transition-colors"
                onClick={() => handleNavClick("/sermon")}
              >
                메세지 더보기 <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div
                className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl aspect-video"
                onClick={() => handleNavClick("/sermon")}
              >
                <img
                  src="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="sermon"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <CustomPlayButton />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                  <div className="inline-block px-3 py-1 bg-red-600 rounded text-xs font-bold mb-3">
                    LIVE REPLAY
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    2025.12.07 주일 2부 예배
                  </h3>
                  <p className="text-slate-300">
                    본문: 요한복음 3장 16절 | 설교: 담임목사
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 max-h-[450px] overflow-y-auto pr-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="flex gap-4 p-3 bg-slate-50 rounded-xl hover:shadow-md transition-shadow cursor-pointer border border-slate-100 group"
                      onClick={() => handleNavClick("/sermon")}
                    >
                      <div className="w-32 aspect-video bg-slate-200 rounded-lg overflow-hidden shrink-0 relative">
                        <img
                          src={`https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
                          className="w-full h-full object-cover"
                          alt="thumb"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <CustomPlayButton size={24} />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-slate-400 mb-1">
                          2025.11.{30 - item}
                        </span>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1 group-hover:text-sky-600 transition-colors line-clamp-2">
                          믿음으로 승리하는 삶 (Part {item})
                        </h4>
                        <span className="text-xs text-slate-500">
                          로마서 8장 {item}-15절
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleNavClick("/sermon")}
                  className="w-full py-4 mt-auto bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all flex items-center justify-center"
                >
                  설교 더보기 <ChevronRight size={18} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/*  기부금 영수증 */}
        <section className="py-24" style={{ backgroundColor: "#f8f8f8" }}>
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">
              기부금 영수증
            </h3>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              연말정산 및 세액공제를 위한 기부금 영수증을 온라인으로 간편하게
              신청하고 발급받으실 수 있습니다.
              <br />
              <span className="text-sm text-slate-400 mt-2 block">
                * 신청 후 발급까지 약 일주일정도 소요될 수 있습니다.
              </span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={RECEIPT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                발급 신청하기 <ArrowRight size={16} />
              </a>
              <button
                onClick={() => setShowAccountInfo(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-50 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1"
              >
                헌금 계좌 안내 <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* 헌금 계좌 모달 */}
      {showAccountInfo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowAccountInfo(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-slate-900">
                  헌금 계좌 안내
                </h3>
                <button
                  onClick={() => setShowAccountInfo(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-500" />
                </button>
              </div>

              <div className="mb-6 bg-slate-50 p-4 rounded-2xl text-center">
                <span className="text-slate-500 text-sm font-medium block mb-1">
                  예금주
                </span>
                <p className="text-slate-900 font-bold text-lg">수원하나교회</p>
              </div>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {[
                  { label: "십일조/감사", num: "468001-01-318042" },
                  { label: "선교헌금", num: "422001-04-084939" },
                  { label: "건축헌금", num: "920301-01-563418" },
                  { label: "DA", num: "920301-01-563450" },
                  { label: "난민사역후원", num: "920301-01-512487" },
                  { label: "구제헌금", num: "920301-01-027154" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      navigator.clipboard.writeText(`국민 ${item.num}`);
                      alert(`${item.label} 계좌가 복사되었습니다.`);
                    }}
                    className="group flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-sky-50 hover:border-sky-200 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-sky-600 transition-colors">
                        <span className="text-[10px] font-bold text-slate-500">
                          국민
                        </span>
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-slate-900">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-600 group-hover:text-sky-600">
                        {item.num}
                      </span>
                      <Copy
                        size={14}
                        className="text-slate-300 group-hover:text-sky-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-slate-400 mt-6">
                계좌번호를 클릭하면 복사됩니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- 서브 페이지 (IntroPage) ---
const IntroPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const tabs = [
    "비전",
    "핵심가치",
    "교회연혁",
    "담임목사 소개",
    "섬기는 이들",
    "예배안내",
    "오시는 길",
  ];

  const tabMap = {
    vision: "비전",
    "core-values": "핵심가치",
    history: "교회연혁",
    pastor: "담임목사 소개",
    staff: "섬기는 이들",
    worship: "예배안내",
    location: "오시는 길",
  };

  const activeIntroTab = tabMap[tab] || "담임목사 소개";

  const setActiveIntroTab = (tabName) => {
    const slug = Object.keys(tabMap).find((key) => tabMap[key] === tabName);
    if (slug) navigate(`/intro/${slug}`);
  };

  const visionSlides = [
    {
      src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 1",
      caption: "하나님을 즐거워하는 예배",
      header: "하나님을 즐거워하는 예배",
      key: 1,
    },
    {
      src: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 2",
      caption: "사랑의 공동체",
      header: "사랑의 공동체",
      key: 2,
    },
    {
      src: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      altText: "Vision 3",
      caption: "열방을 향한 선교",
      header: "열방을 향한 선교",
      key: 3,
    },
  ];

  const [expandedYears, setExpandedYears] = useState(["2025"]);

  const toggleYear = (year) => {
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  // 핵심가치 개별 아이템 컴포넌트 (토글 기능 포함)
  const CoreValueItem = ({ index, title, sub, desc }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex gap-5 group items-start">
        {/* 번호 영역 */}
        <div
          className={`
          shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl transition-colors duration-300
          ${
            isOpen
              ? "bg-sky-600 text-white"
              : "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white"
          }
        `}
        >
          {String(index).padStart(2, "0")}
        </div>

        {/* 텍스트 및 토글 영역 */}
        <div className="flex-1 pt-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center flex-wrap gap-2 text-xl font-bold text-slate-900 hover:text-sky-600 transition-colors text-left w-full group/btn"
          >
            <span>{title}</span>
            {sub && (
              <span className="text-sm font-normal text-slate-500 mt-1">
                {sub}
              </span>
            )}
            <ChevronDown
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              } group-hover/btn:text-sky-600`}
            />
          </button>

          {/* 토글 내용 (애니메이션 효과) */}
          <div
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              isOpen ? "grid-rows-[1fr] mt-4" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 text-slate-600 leading-relaxed text-justify shadow-sm whitespace-pre-line">
                {desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 비전 개별 아이템 컴포넌트
  const VisionItem = ({ index, title, sub, desc }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="flex gap-5 group items-start">
        {/* 텍스트 및 토글 영역 */}
        <div className="flex-1 pt-1">
          <h4 className="text-xl font-bold text-slate-900 mt-1 mb-4">
            {title}
          </h4>
          <div className="overflow-hidden">
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 text-slate-600 leading-relaxed text-justify shadow-sm whitespace-pre-line">
              {desc}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="교회소개"
        subtitle="About Us"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row gap-4 md:gap-12">
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-900 pb-4 mb-6 hidden md:block">
              소개
            </h3>
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1">
              <div className="flex space-x-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveIntroTab(tab)}
                    className={`whitespace-nowrap pb-3 text-sm font-bold border-b-2 transition-colors ${
                      activeIntroTab === tab
                        ? "text-slate-900 border-slate-900"
                        : "text-slate-500 border-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <ul className="hidden md:space-y-1 md:block">
              {tabs.map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveIntroTab(tab)}
                    className={`w-full text-left py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                      activeIntroTab === tab
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-h-[500px]">
          {activeIntroTab === "비전" && (
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <span className="text-sky-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                  VISION STATEMENT
                </span>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">
                  하나님을 즐거워하고
                  <br />그 분의 목적에 헌신하는 공동체
                </h2>
                {/* <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  수원하나교회는 이 땅에 하나님의 나라를 세우며, 복음의 능력을
                  경험하는 믿음의 공동체입니다.
                </p> */}
              </div>

              {/* Carousel Section */}
              <div className="mb-16 rounded-3xl overflow-hidden shadow-lg max-w-5xl mx-auto border border-slate-100">
                <SimpleCarousel items={visionSlides} />
              </div>

              {/* Vision Accordion Section */}
              <div className="max-w-4xl mx-auto space-y-6 mb-16">
                {vision?.map((item, idx) => (
                  <VisionItem
                    key={idx}
                    index={idx + 1}
                    title={item.title}
                    sub={item.sub}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>
          )}

          {activeIntroTab === "핵심가치" && (
            <div className="space-y-20 animate-fade-in max-w-5xl mx-auto py-10">
              {/* Section 1 */}
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <h3 className="text-2xl font-bold text-slate-900 text-center px-4 py-2 bg-slate-50 rounded-lg">
                    핵심가치 Part 1
                  </h3>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-12 gap-y-8">
                  {coreValuePart1 &&
                    coreValuePart1?.map((item, idx) => (
                      <CoreValueItem
                        key={idx}
                        index={idx + 1}
                        title={item.title}
                        sub={item.sub}
                        desc={item.desc}
                      />
                    ))}
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-center gap-4 mb-12">
                  <div className="h-px flex-1 bg-slate-200"></div>
                  <h3 className="text-2xl font-bold text-slate-900 text-center px-4 py-2 bg-slate-50 rounded-lg">
                    핵심가치 Part 2
                  </h3>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-x-12 gap-y-8">
                  {coreValuePart2 &&
                    coreValuePart2?.map((item, idx) => (
                      <CoreValueItem
                        key={idx}
                        index={idx + 7}
                        title={item.title}
                        sub={item.sub}
                        desc={item.desc}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}

          {activeIntroTab === "교회연혁" && (
            <div className="animate-fade-in max-w-4xl mx-auto">
              <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                교회연혁
              </h3>
              <div className="mt-2 mb-6">
                <p className="">
                  우리가 섬기고 있는 수원하나침례교회는 기독교한국침례회에
                  소속된 침례교회입니다. 기독교한국침례회는 미국
                  남침례교단(Southern Baptist Convention)의 한국 자매교단입니다.
                  수원하나침례교회의 간략한 역사는 다음과 같습니다.
                </p>
              </div>

              <div className="border-l-2 border-slate-200 pl-8 space-y-10 pb-12">
                {historyData &&
                  historyData?.map((item) => (
                    <div key={item.year} className="relative">
                      {/* Timeline Dot */}
                      <div
                        className={`absolute -left-[41px] md:-left-[42px]  w-5 h-5 rounded-full border-4 transition-colors duration-300 z-10 ${
                          expandedYears.includes(item.year)
                            ? "bg-white border-sky-600 scale-110"
                            : "bg-slate-200 border-white"
                        }`}
                      ></div>

                      {/* Header */}
                      <div
                        onClick={() => toggleYear(item.year)}
                        className="flex items-center gap-4 cursor-pointer group select-none"
                      >
                        <h3
                          className={`text-600 font-bold transition-colors duration-300 ${
                            expandedYears.includes(item.year)
                              ? "text-sky-600"
                              : "text-slate-400 group-hover:text-slate-500"
                          }`}
                        >
                          {item.year}
                        </h3>
                        <button
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                            expandedYears.includes(item.year)
                              ? "bg-sky-100 text-sky-600 rotate-180"
                              : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                          }`}
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>

                      {/* Content */}
                      {expandedYears.includes(item.year) && (
                        <div className="mt-6 animate-fade-in">
                          <ul className="space-y-4">
                            {item.events.map((event, idx) => (
                              <li
                                key={idx}
                                className="flex flex-col sm:flex-row sm:items-start gap-2"
                              >
                                <span className=" text-slate-600 text-sm w-26 shrink-0">
                                  {/* 날짜 포맷 YYYY-MM-dd */}
                                  {moment(
                                    `${item.year}-${event.date}`,
                                    "YYYY-MM-DD"
                                  ).format("YYYY년MM월DD일")}
                                </span>
                                {/* <span className="font-medium text-slate-800 w-24 shrink-0 sm:hidden">
                                {event.date}
                              </span> */}
                                <span className="text-slate-800 whitespace-pre-line leading-relaxed text-sm">
                                  {event.content}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeIntroTab === "담임목사 소개" && (
            <div className="animate-fade-in-up space-y-16">
              {/* 섹션 1: 목사님 프로필 (기존 코드 유지) */}
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-[320px] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50 relative group">
                    <img
                      src={spastor_ko}
                      alt="고성준 담임목사"
                      className="w-full h-auto object-cover aspect-[4/5] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-6 pb-6 border-b border-slate-100">
                    <h2 className="text-3xl font-bold text-slate-900 flex items-end gap-3 mb-2">
                      고성준{" "}
                      <span className="text-lg text-slate-500 font-normal mb-1">
                        담임목사
                      </span>
                    </h2>
                    <p className="text-sky-600 font-medium text-sm tracking-widest uppercase">
                      Senior Pastor. Ko Sung Jun
                    </p>
                  </div>
                  <div className="space-y-6 text-slate-600 leading-relaxed text-justify text-base">
                    <p>
                      서울대 수학과와 동 대학원을 졸업했으며 국비유학생에
                      선발되어 미국 UC버클리에서 수학 박사 학위(Ph.D)를 받았다.
                      대전침례신학대학교(M.Div)을 졸업했으며 현재 수원하나교회
                      담임목사이자 Come Mission 국제 이사로 섬기고 있다.
                    </p>
                    <p>
                      다음세대를 위한 기독대안학교 다니엘 아카데미, 선교사들을
                      훈련하는 다니엘훈련학교(Daniel School of Ministry), 난민
                      사역을 위한 NGO 리홉(ReHope)을 발족하여 활동하고 있다.
                    </p>
                  </div>
                </div>
              </div>

              {/* 섹션 2: 저서 소개 (신규 추가) */}
              <div className="border-t border-slate-100 pt-10">
                <div className="flex items-center justify-between mb-8 px-1">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                      저서 소개
                    </h3>
                  </div>
                </div>

                {/* Book List Grid/Scroll */}
                <div className="flex md:grid md:grid-cols-6 gap-4 overflow-x-auto md:overflow-visible pb-4 px-1 scrollbar-hide snap-x">
                  {bookList.map((book) => (
                    <div
                      key={book.id}
                      className="shrink-0 w-[140px] md:w-auto flex flex-col group snap-start"
                    >
                      {/* 책 표지 영역 */}
                      <div
                        className={`w-full aspect-[1/1.4] rounded-lg shadow-sm mb-3 overflow-hidden relative ${book.color} flex items-center justify-center text-center p-2 border border-slate-100`}
                      >
                        {/* 실제 이미지가 있다면 아래 주석을 풀고 img 태그를 사용하세요 */}
                        {/* <img 
                      src={`/images/books/${book.title}.jpg`} 
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    /> 
                    */}

                        {/* 이미지가 없을 때를 대비한 타이포그래피 디자인 */}
                        <div className="group-hover:scale-105 transition-transform duration-300">
                          <span className="font-serif font-bold text-slate-700 text-sm md:text-base leading-tight block mb-2 break-keep">
                            {book.title}
                          </span>
                          <div className="w-8 h-0.5 bg-slate-400 mx-auto opacity-50"></div>
                        </div>

                        {/* 호버 시 나타나는 구매 바로가기 오버레이 */}
                        <a
                          href={book.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]"
                        >
                          <span className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            구매하기 <ExternalLink className="w-3 h-3" />
                          </span>
                        </a>
                      </div>

                      {/* 책 정보 영역 */}
                      <div className="px-1">
                        <h4 className="font-bold text-slate-900 text-sm md:text-base mb-1 truncate">
                          {book.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed break-keep line-clamp-3 md:line-clamp-none">
                          {book.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeIntroTab === "섬기는 이들" && (
            <div className="space-y-16 animate-fade-in">
              {/* Section 1: 사역팀 */}
              <div className="bg-slate-50 p-8 md:p-12 rounded-3xl">
                <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">
                  사역팀{" "}
                  <span className="text-slate-500 font-light ml-2 text-base">
                    Ministry Team
                  </span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[
                    {
                      name: "윤성철 목사",
                      role: (
                        <>
                          수원하나교회 협동목사
                          <br />현 CG선교회 대표
                        </>
                      ),
                      img: temp01,
                    },
                    { name: "엘리야 한 목사", role: "EM, 예배팀", img: temp02 },
                    {
                      name: "김태환 전도사",
                      role: "DSM, 중보기도팀",
                      img: temp03,
                    },
                    { name: "김세빛 간사", role: "YCM, 음향", img: temp04 },
                  ].map((staff, i) => (
                    /* 디자인 수정: 직사각형 카드 디자인 (라운드X) */
                    <div
                      key={i}
                      className="bg-white shadow-sm hover:shadow-md transition-all group cursor-pointer text-center"
                    >
                      <div className="w-full aspect-[3/4] overflow-hidden bg-slate-200">
                        <img
                          src={staff.img}
                          alt={staff.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4 border-t border-slate-100">
                        <h4 className="font-bold text-lg text-slate-900 mb-1">
                          {staff.name}
                        </h4>
                        <div className="w-6 h-0.5 bg-gray-200 mx-auto mb-2"></div>
                        <p className="text-sm text-slate-500">{staff.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeIntroTab === "예배안내" && (
            <div className="space-y-16 animate-fade-in max-w-5xl mx-auto">
              {/* 1. Newcomer Guide (새가족 안내) - Redesigned */}
              <section>
                <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50 border border-sky-100  p-8 md:p-10 shadow-sm">
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-60"></div>

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 text-xs font-bold rounded-l mb-3">
                          Welcome
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                          새신자 / 방문자 예배 참석 안내
                        </h3>
                      </div>

                      <p className="text-slate-600 leading-relaxed text-lg">
                        수원하나교회에 처음 방문하여 예배에 참석하기 원하시는
                        분들은
                        <br className="hidden md:block" />
                        따뜻한 마음으로 환영합니다. 아래 담당 사역자에게 연락
                        주시면 친절히 안내해 드리겠습니다.
                      </p>
                      <p className="text-slate-800 leading-relaxed text-lg">
                        새가족부 담당: 신상철 목사 (010-2484-0776)
                      </p>

                      {/* <div className="flex flex-col md:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
                        <div className="flex items-center gap-3 bg-white pl-4 pr-6 py-3 rounded-xl border border-sky-100 shadow-sm hover:border-sky-300 transition-colors cursor-default group">
                          <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                            <span className="font-bold text-sky-600">P</span>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                              새가족부 담당
                            </p>
                            <p className="text-slate-900 font-bold">
                              신상철 목사
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 bg-white pl-4 pr-6 py-3 rounded-xl border border-sky-100 shadow-sm hover:border-sky-300 transition-colors cursor-default group">
                          <div className="w-10 h-10 bg-sky-50 rounded-full flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                            <span className="font-bold text-sky-600">T</span>
                          </div>
                          <div className="text-left">
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                              연락처
                            </p>
                            <p className="text-slate-900 font-bold tracking-wide">
                              010-2484-0776
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Main Worship (메인 워십) - Redesigned */}
              <section>
                <div className="flex flex-col md:flex-row md:items-end gap-3 mb-8 px-2">
                  <h3 className="font-bold text-3xl text-slate-900">
                    예배 시간 안내
                  </h3>
                  <span className="text-slate-400 font-medium text-sm pb-1 mb-1">
                    Main Worship Service
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* 2-1. Sunday Morning */}
                  <div className="group flex flex-col h-full bg-white p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-2xl font-bold text-slate-900  transition-colors break-keep">
                          자녀와 함께 드리는
                          <br />
                          열린예배
                        </h4>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed break-keep">
                        자녀들과 함께 드리는 예배로{" "}
                        <span className="text-slate-900 font-semibold bg-yellow-100/50 px-1">
                          복음과 구원
                        </span>
                        에 초점을 맞추어 드려지는 예배입니다. “열린 예배”는
                        누구에게나 열려 있습니다.
                      </p>
                      <div className="bg-slate-50 p-4 text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">시간</span>
                          <span className="font-bold text-slate-800">
                            주일 오전 9시, 11시, 14시 30분
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">장소</span>
                          <span className="font-bold text-slate-800">
                            본당 2층 대예배실
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-slate-50 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded uppercase shrink-0 mt-0.5">
                          Target
                        </span>
                        <p className="text-slate-700 font-medium text-sm mt-1">
                          복음을 알기 원하는 분, 복음을 전하기 원하는 분
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-xs font-medium">
                          #복음과구원
                        </span>
                        <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-xs font-medium">
                          #치유와중보
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2-3. Friday Night (Updated to Light Theme matching Sunday) */}
                  <div className="group flex flex-col h-full bg-white p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex-1 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-2xl font-bold text-slate-900 transition-colors break-keep">
                          금요예배
                          <br />
                          &nbsp;
                        </h4>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed break-keep">
                        하나교회 가족들이 참가하는 예배이며,
                        <span className="text-slate-900 font-semibold bg-sky-100/50 px-1">
                          믿는 자들의 영적 성숙
                        </span>
                        에 초점을 맞추고 있습니다. 깊이 있는 말씀과 기도로
                        은혜를 나눕니다.
                      </p>
                      <div className="bg-slate-50 p-4 text-sm space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-500">시간</span>
                          <span className="font-bold text-slate-800">
                            금요일 저녁 9시
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">장소</span>
                          <span className="font-bold text-slate-800">
                            본당 2층 대예배실
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-slate-50 space-y-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs bg-slate-100 text-slate-500 font-bold px-2 py-1 rounded uppercase shrink-0 mt-0.5">
                          Target
                        </span>
                        <p className="text-slate-700 font-medium text-sm mt-1">
                          하나교회 등록 교인, 영적 성숙을 사모하는 성도
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-xs font-medium">
                          #영적성숙
                        </span>
                        <span className="px-2.5 py-1 bg-white border border-slate-200 text-slate-400 rounded-lg text-xs font-medium">
                          #비전
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Next Gen (다음세대) - Hover Effects Added */}
              <section>
                <div className="flex items-end gap-3 mb-8 px-2">
                  <h3 className="font-bold text-3xl text-slate-900">
                    다음세대 예배 안내
                  </h3>
                  <span className="text-slate-400 font-medium text-sm pb-1 mb-0 hidden md:block">
                    Next Generation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Joy Baby */}
                  <div className="bg-white p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center ">
                      <span className="w-2 h-2 rounded-full bg-sky-500 mr-2"></span>
                      조이베이비 (영아부)
                    </h4>
                    <p className="text-slate-600 text-sm mb-4">
                      36개월 미만의 유아들과 부모님이 함께 드리는 예배입니다.
                    </p>
                    <div className="bg-slate-50 p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">대상</span>
                        <span className="font-bold text-slate-800">
                          36개월 미만의 영유아와 부모님
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">시간</span>
                        <span className="font-bold text-slate-800">
                          주일 오전 9시 30분
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">장소</span>
                        <span className="font-bold text-slate-800">
                          NGC 지하예배실
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Joy Corner */}
                  <div className="bg-white p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                      조이코너 (유치부)
                    </h4>
                    <p className="text-slate-600 text-sm mb-4">
                      36개월 이상의 유치부 아동들의 예배입니다.
                    </p>
                    <div className="bg-slate-50 p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">대상</span>
                        <span className="font-bold text-slate-800">
                          36개월 이상 ~ 미취학 아동과 부모님
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">시간</span>
                        <span className="font-bold text-slate-800">
                          주일 오후 1시
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">장소</span>
                        <span className="font-bold text-slate-800">
                          본당 2층
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Joy Land */}
                  <div className="bg-white p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      조이랜드 (초등부)
                    </h4>
                    <p className="text-slate-600 text-sm mb-4">
                      주일예배는 “자녀와 함께 드리는 열린예배”를 부모님과 함께
                      드립니다.
                    </p>
                    <div className="bg-slate-50 p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">시간</span>
                        <span className="font-bold text-slate-800">
                          화요일 저녁 7시
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">장소</span>
                        <span className="font-bold text-slate-800">
                          NGC 지하예배실
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* YCM */}
                  <div className="bg-white p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                      YCM (중고등부)
                    </h4>
                    <p className="text-slate-600 text-sm mb-4">
                      예배 후 모임(스탠딩 투게더)이 있습니다.
                    </p>
                    <div className="bg-slate-50 p-4 text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">시간</span>
                        <span className="font-bold text-slate-800">
                          주일 오후 4시 30분
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">장소</span>
                        <span className="font-bold text-slate-800">
                          본당 2층
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          {activeIntroTab === "오시는 길" && (
            <div className="space-y-12 animate-fade-in">
              {/* 타이틀 */}
              <h3 className="font-bold text-2xl text-slate-900 flex items-center">
                수원하나교회 찾아오시는 길
              </h3>
              {/* 지도 섹션 */}
              <div className="w-full h-[400px] bg-slate-100 overflow-hidden shadow-sm border border-slate-200 relative">
                <iframe
                  width="100%"
                  height="100%"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=경기도%20용인시%20기흥구%20서그내로%2016번길%2011-6&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  title="church-map"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 주소 정보 */}
                <div className="bg-white p-8 border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-xl mb-6 flex items-center text-slate-900">
                    교회 위치
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-500 font-bold mb-1">
                        주소
                      </p>
                      <p className="text-lg text-slate-800">
                        (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-bold mb-1">
                        대표번호
                      </p>
                      <p className="text-lg text-slate-800">
                        {" "}
                        031 - 202 - 0697
                      </p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <a
                        href="https://map.kakao.com/link/search/수원하나교회"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-slate-800 text-slate-800 font-bold text-sm hover:bg-slate-800 hover:text-white transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 text-yellow-500 group-hover:animate-bounce" />
                        카카오맵
                      </a>
                      <a
                        href="https://map.naver.com/v5/search/수원하나교회"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl border border-[#03C75A] text-[#03C75A] font-bold text-sm hover:bg-[#03C75A] hover:text-white transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:animate-bounce" />
                        네이버지도
                      </a>
                    </div>
                  </div>
                </div>

                {/* 교통편 */}
                <div className="bg-white p-8  border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-xl mb-6 flex items-center text-slate-900">
                    교통 안내
                  </h3>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-20 font-bold text-slate-500 shrink-0">
                        버스
                      </div>
                      <div className="text-slate-700 text-sm leading-relaxed">
                        <span className="font-bold text-sky-600">일반</span>{" "}
                        1112, M5107, 5100, 7000 등 (서그내 하차)
                        <br />
                        <span className="font-bold text-green-600">
                          마을
                        </span>{" "}
                        55, 53-1 (SK아파트 하차)
                        <br />
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-20 font-bold text-slate-500 shrink-0">
                        지하철
                      </div>
                      <div className="text-slate-700 text-sm leading-relaxed">
                        수인분당선{" "}
                        <span className="font-bold text-yellow-600">
                          영통역
                        </span>{" "}
                        1번 출구 <br />→{" "}
                        <span className="font-bold">55번 마을버스</span> 승차 →
                        SK아파트 정류장에서 하차 → GS25서천현대점 안쪽 골목까지
                        200m(도보2분)
                        <br />
                        <span className="text-slate-400 text-xs">
                          * 영통역에서 교회까지 도보로는 15분 정도 소요됩니다.{" "}
                        </span>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-20 font-bold text-slate-500 shrink-0"></div>
                      <div className="text-slate-700 text-sm leading-relaxed">
                        수인분당선{" "}
                        <span className="font-bold text-yellow-600">
                          망포역
                        </span>{" "}
                        3번 출구 <br />→{" "}
                        <span className="font-bold">8번 버스</span> 승차 →
                        서그내 정류장에서 하차 → GS25서천현대점 안쪽 골목까지
                        400m(도보5분)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 주차 안내 */}
              <div className="bg-white p-8 border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xl mb-8 flex items-center text-slate-900">
                  주차 및 셔틀버스 안내
                </h3>

                <div className="space-y-6">
                  {/* 1. 교육관 주차장 */}
                  <div className="flex flex-col md:flex-row bg-white overflow-hidden border border-slate-100 shadow-sm">
                    <div className="bg-gray-50 p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 mb-3 shadow-sm">
                        <MapPin size={24} />
                      </div>
                      <span className="font-bold text-gray-700">
                        교육관 주차장
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <p className="text-slate-800 font-medium mb-2">
                        본당 주차공간이 협소하여 교육관 주차장 이용을
                        권장합니다.
                      </p>
                      <p className="text-slate-500 text-sm mb-4">
                        본당과 주차장 사이 도보 약 12분 소요
                      </p>
                      <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-100 inline-block">
                        <span className="font-bold text-slate-700 text-sm mr-2">
                          주소
                        </span>
                        <span className="text-slate-600 text-sm">
                          경기 용인시 기흥구 서그내로53번길 30
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. 셔틀버스 */}
                  <div className="flex flex-col md:flex-row bg-white overflow-hidden border border-slate-100 shadow-sm">
                    <div className="bg-gray-50 p-6 md:w-48 flex flex-col items-center justify-center text-center shrink-0">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-600 mb-3 shadow-sm">
                        <Clock size={24} />
                      </div>
                      <span className="font-bold text-gray-700">
                        셔틀버스 운행
                      </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center">
                      <p className="text-slate-800 font-medium mb-3">
                        교육관 ↔ 본당 간 셔틀버스를 운행합니다.
                      </p>
                      <p className="text-slate-500 text-sm mb-4">
                        주일 예배 20분 전, 금요 예배 전 20:00시 부터
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-l text-sm font-bold">
                          주일 1부 (09:00)
                        </span>
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-l text-sm font-bold">
                          주일 2부 (11:00)
                        </span>
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-l text-sm font-bold">
                          주일 3부 (14:30)
                        </span>
                        <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-l text-sm font-bold">
                          금요예배 (21:00)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SermonPage = () => {
  const [selectedSermon, setSelectedSermon] = useState(null);

  // 설교 데이터 생성
  const sermons = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    title: `[히브리서${i + 1}] Keep going in shalom`,
    date: `2025.11.${30 - i}`,
    scripture: `히브리서 15:1-${7 + i}`,
    preacher: "고성준 목사",
    image: keep,
    videoUrl: "https://www.youtube.com/embed/UaeNkfFS8mE", // 예시 비디오 URL
  }));

  if (selectedSermon) {
    return (
      <div className="bg-white min-h-screen animate-fade-in">
        <HeroSub
          title="말씀뱅크"
          subtitle="Sermon Bank"
          image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        />
        <div className="max-w-5xl mx-auto px-6 py-12">
          <button
            onClick={() => setSelectedSermon(null)}
            className="flex items-center text-slate-500 hover:text-sky-600 mb-6 transition-colors font-medium"
          >
            <ChevronLeft size={20} className="mr-1" /> 목록으로 돌아가기
          </button>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 mb-8">
            <div className="aspect-video w-full bg-black">
              <iframe
                width="100%"
                height="100%"
                src={selectedSermon.videoUrl}
                title={selectedSermon.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-bold">
                  주일예배
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm">
                  히브리서
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {selectedSermon.title}
              </h2>
              <div className="flex flex-col md:flex-row md:items-center text-slate-500 gap-4 border-b border-slate-100 pb-6 mb-6">
                <span className="flex items-center">
                  <Calendar size={18} className="mr-2" /> {selectedSermon.date}
                </span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center">
                  <Users size={18} className="mr-2" /> {selectedSermon.preacher}
                </span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center">
                  <BookOpen size={18} className="mr-2" />{" "}
                  {selectedSermon.scripture}
                </span>
              </div>

              <div className="prose max-w-none text-slate-600 leading-relaxed">
                <p>
                  오늘 주시는 하나님의 말씀은 {selectedSermon.scripture} 입니다.
                  <br />
                  {selectedSermon.title}라는 제목으로 은혜를 나누고자 합니다.
                </p>
                <p className="mt-4">
                  (설교 본문 요약이나 상세 내용이 들어가는 공간입니다. 영상과
                  함께 설교의 핵심 내용을 텍스트로 제공하여 성도님들이 말씀을 더
                  깊이 묵상할 수 있도록 돕습니다.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen animate-fade-in">
      <HeroSub
        title="말씀뱅크"
        subtitle="Sermon Bank"
        image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="설교 제목, 본문 또는 내용을 검색하세요"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 transition-colors text-slate-800"
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
            </div>
            <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors shadow-md shadow-slate-200">
              검색
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-slate-900 mr-2 flex items-center">
              <Hash size={14} className="mr-1" /> 추천 태그:
            </span>
            {[
              "#주일예배",
              "#히브리서강해",
              "#특별새벽기도",
              "#청년부",
              "#가정",
              "#위로",
            ].map((tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all group border border-slate-100 cursor-pointer"
              onClick={() => setSelectedSermon(item)}
            >
              <div className="relative aspect-video bg-slate-200">
                <img
                  src={item.image}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <CustomPlayButton />
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded">
                    주일예배
                  </span>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
                    히브리서
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">
                  {item.scripture} | {item.preacher}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabMap = {
    light: "빛의 군대",
    joshua: "여호수아의 군대",
    moses: "모세의 군대",
    em: "EM",
  };

  // Helper to get slug from subtitle
  const getSlug = (subtitle) =>
    Object.keys(tabMap).find((key) => tabMap[key] === subtitle);

  const activeTabName = tabMap[tab] || "빛의 군대";

  // 현재 탭에 해당하는 그룹 데이터 찾기
  const currentGroupData =
    groups.find((g) => g.subtitle === activeTabName) || groups[0];

  // 선택된 소그룹 아이템 상태 관리
  const [selectedGroup, setSelectedGroup] = useState(currentGroupData.items[0]);

  // 사이드바 확장 상태 관리
  const [expandedGroups, setExpandedGroups] = useState([activeTabName]);

  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((n) => n !== groupName)
        : [...prev, groupName]
    );
  };

  // 탭이 변경될 때 선택된 그룹 초기화 및 확장 상태 업데이트
  useEffect(() => {
    if (currentGroupData && currentGroupData.items.length > 0) {
      if (location.state?.selectedId) {
        const item = currentGroupData.items.find(
          (i) => i.id === location.state.selectedId
        );
        if (item) setSelectedGroup(item);
        else setSelectedGroup(currentGroupData.items[0]);
      } else {
        setSelectedGroup(currentGroupData.items[0]);
      }

      setExpandedGroups((prev) => {
        if (!prev.includes(activeTabName)) return [...prev, activeTabName];
        return prev;
      });
    }
  }, [activeTabName, currentGroupData, location.state]);

  const handleGroupClick = (groupName) => {
    const slug = getSlug(groupName);
    if (slug) navigate(`/community/${slug}`);
  };

  const handleSubItemClick = (groupName, item) => {
    const slug = getSlug(groupName);
    if (activeTabName === groupName) {
      setSelectedGroup(item);
    } else {
      navigate(`/community/${slug}`, { state: { selectedId: item.id } });
    }
  };

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="공동체"
        subtitle="Community"
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row md:gap-12">
        {/* 사이드바 메뉴 */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-900 pb-4 mb-6 hidden md:block">
              공동체
            </h3>

            {/* Mobile Menu */}
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1">
              <div className="flex space-x-6">
                {groups.map((group) => (
                  <button
                    key={group.subtitle}
                    onClick={() => handleGroupClick(group.subtitle)}
                    className={`whitespace-nowrap pb-3 text-sm font-bold border-b-2 transition-colors ${
                      activeTabName === group.subtitle
                        ? "text-slate-900 border-slate-900"
                        : "text-slate-500 border-transparent"
                    }`}
                  >
                    {group.subtitle}
                  </button>
                ))}
              </div>
            </div>

            {/* 아코디언 메뉴 */}
            <div className="hidden md:block border-t border-slate-200 md:border-t-0">
              {groups.map((group) => {
                const isExpanded = expandedGroups.includes(group.subtitle);
                const isActive = activeTabName === group.subtitle;

                return (
                  <div
                    key={group.subtitle}
                    className="border-b border-slate-200"
                  >
                    <div
                      className={`flex items-center justify-between py-3 px-2 transition-colors ${
                        isActive ? "" : "hover:bg-slate-50"
                      }`}
                    >
                      <button
                        className={`flex-1 text-left font-bold text-sm ${
                          isActive ? "text-slate-900" : "text-slate-500"
                        }`}
                        onClick={() => handleGroupClick(group.subtitle)}
                      >
                        {group.subtitle}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGroup(group.subtitle);
                        }}
                        className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/50 transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* 서브 메뉴 리스트 */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded
                          ? "max-h-[500px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="py-2 px-4 space-y-1 border-t border-slate-100">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() =>
                              handleSubItemClick(group.subtitle, item)
                            }
                            className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all ${
                              isActive && selectedGroup?.id === item.id
                                ? "text-600 font-bold bg-white shadow-sm"
                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex-1 min-h-[500px]">
          <div className="animate-fade-in">
            {/* <h3 className="text-2xl font-bold text-slate-900 mb-8 pl-2">
              {currentGroupData.subtitle}
            </h3> */}

            {/* 소그룹 선택 버튼 그리드 */}
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1">
              <div className="flex space-x-6">
                {currentGroupData.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGroup(item)}
                    className={`whitespace-nowrap pb-3 text-sm font-bold border-b-2 transition-colors ${
                      selectedGroup.id === item.id
                        ? "text-slate-900 border-slate-900"
                        : "text-slate-500 border-transparent"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 상세 정보 뷰 */}
            {selectedGroup && (
              <div key={selectedGroup.id} className="animate-fade-in">
                <h4 className="text-4xl font-bold text-slate-900 mb-2">
                  {selectedGroup.name}
                </h4>
                <p className="text-sky-600 font-medium tracking-wide uppercase mb-6">
                  {selectedGroup.eng}
                </p>
                {/* Image Carousel */}
                <div className="mb-4 overflow-hidden shadow-lg border border-slate-100">
                  <SimpleCarousel
                    items={[
                      {
                        src: selectedGroup.img,
                        altText: selectedGroup.name,
                        key: 1,
                      },
                    ]}
                  />
                </div>
                {/* Text Content */}
                <div className="pt-6 pl-2">
                  {selectedGroup.sub && (
                    <div className="mb-6 text-slate-700 font-medium whitespace-pre-line">
                      {selectedGroup.sub}
                    </div>
                  )}

                  {selectedGroup.slogan && (
                    <div className="mb-4 italic text-slate-700 font-medium whitespace-pre-line">
                      "{selectedGroup.slogan}"
                    </div>
                  )}
                  <p className="text-md text-slate-600 leading-relaxed mb-4 whitespace-pre-line">
                    {selectedGroup.desc}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsPage = () => {
  const [selectedNews, setSelectedNews] = useState(null);

  const newsData = [
    {
      id: 1,
      title: "2025년도 전반기 제자훈련 신청 안내 및 학습세례 문답 일정",
      date: "2025.12.09",
      category: "공지사항",
      content: `
        <p>할렐루야! 성도님들의 가정에 주님의 평강이 가득하시기를 소망합니다.</p>
        <p>2025년 전반기 제자훈련 과정을 다음과 같이 모집하오니 성도님들의 많은 관심과 참여 바랍니다.</p>
        <br/>
        <h4 class="text-lg font-bold text-slate-900 mb-2">1. 모집 과정</h4>
        <ul class="list-disc pl-5 mb-4">
          <li>제자훈련 반 (32주) - 매주 수요일 저녁 8시</li>
          <li>사역훈련 반 (32주) - 매주 목요일 오전 10시</li>
        </ul>
        
        <h4 class="text-lg font-bold text-slate-900 mb-2">2. 신청 기간</h4>
        <p class="mb-4">2025년 12월 7일(주일) ~ 12월 28일(주일)</p>
        
        <h4 class="text-lg font-bold text-slate-900 mb-2">3. 신청 방법</h4>
        <p class="mb-4">본당 로비 필경대 신청서 작성 후 제출 또는 온라인 신청</p>
        
        <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
           <p class="text-sm text-slate-600">* 자세한 문의는 교역자실로 연락 바랍니다.</p>
        </div>
      `,
      image:
        "https://images.unsplash.com/photo-1542206395-9feb3edaa68d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "12월 금요성령집회 안내",
      date: "2025.12.08",
      category: "공지사항",
      content:
        "12월 금요성령집회는 특별 찬양 집회로 드려집니다. 온 가족이 함께 나와 기도의 불을 지피는 시간이 되길 바랍니다.",
      image:
        "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "성탄절 칸타타 및 축하발표회",
      date: "2025.12.07",
      category: "공지사항",
      content:
        "성탄의 기쁨을 함께 나누는 칸타타 및 주일학교 축하발표회가 12월 25일 오전 11시에 있습니다.",
      image:
        "https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];

  if (selectedNews) {
    return (
      <div className="bg-white min-h-screen animate-fade-in">
        <HeroSub
          title="교회소식"
          subtitle="News & Notice"
          image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        />
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="mb-8">
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center text-slate-500 hover:text-sky-600 mb-6 transition-colors font-medium"
            >
              <ChevronLeft size={20} className="mr-1" /> 목록으로 돌아가기
            </button>
            <div className="border-b border-slate-200 pb-6 mb-8">
              <span className="inline-block bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-bold mb-3">
                {selectedNews.category}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {selectedNews.title}
              </h2>
              <p className="text-slate-400 text-sm flex items-center">
                <Calendar size={14} className="mr-1" /> {selectedNews.date}
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500">관리자</span>
              </p>
            </div>

            <div className="prose prose-lg max-w-none text-slate-600">
              <div className="aspect-video w-full bg-slate-100 rounded-xl overflow-hidden mb-8">
                <img
                  src={selectedNews.image}
                  alt="detail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div dangerouslySetInnerHTML={{ __html: selectedNews.content }} />
            </div>
          </div>

          <div className="flex justify-center pt-10 border-t border-slate-200">
            <button
              onClick={() => setSelectedNews(null)}
              className="px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-sky-700 transition-colors"
            >
              목록으로
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="교회소식"
        subtitle="News & Notice"
        image="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="space-y-4">
          {newsData.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedNews(item);
                window.scrollTo(0, 0);
              }}
              className="flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-2xl bg-white hover:bg-slate-50 transition-colors cursor-pointer group shadow-sm hover:shadow-md"
            >
              <div className="w-full md:w-48 aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden shrink-0">
                <img
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  alt="news"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded text-xs font-bold">
                    {item.category}
                  </span>
                  <span className="text-slate-400 text-xs">{item.date}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2">
                  {item.content.replace(/<[^>]*>?/gm, "")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 훈련 페이지 (TrainingPage) ---
const TrainingPage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { id: "wednesday", name: "훈련" },
    { id: "dsm", name: "DSM" },
  ];

  const activeTab = tabs.find((t) => t.id === tab) || tabs[0];

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="훈련"
        subtitle="Discipleship"
        image="https://images.unsplash.com/photo-1510936111840-65e151ad71bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-20 flex flex-col md:flex-row gap-4 md:gap-12">
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-2xl font-bold text-slate-900 border-b-2 border-slate-900 pb-4 mb-6 hidden md:block">
              훈련
            </h3>
            {/* Mobile Menu */}
            <div className="md:hidden overflow-x-auto border-b border-slate-200 mb-8 pb-1">
              <div className="flex space-x-6">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => navigate(`/discipleship/${t.id}`)}
                    className={`whitespace-nowrap pb-3 text-sm font-bold border-b-2 transition-colors ${
                      activeTab.id === t.id
                        ? "text-slate-900 border-slate-900"
                        : "text-slate-500 border-transparent"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
            {/* Desktop Menu */}
            <ul className="hidden md:space-y-1 md:block">
              {tabs.map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => navigate(`/discipleship/${t.id}`)}
                    className={`w-full text-left py-3 px-4 rounded-lg text-sm font-bold transition-all ${
                      activeTab.id === t.id
                        ? "text-slate-900 bg-slate-50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex-1 min-h-[500px]">
          {activeTab.id === "wednesday" && (
            <div className="animate-fade-in space-y-8">
              <div className="border-b border-slate-200 pb-6 mb-8">
                <span className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-2 block">
                  Wednesday Training
                </span>
                <h2 className="text-3xl font-bold text-slate-900">훈련</h2>
              </div>

              <div className="prose max-w-none text-slate-600 leading-relaxed">
                <p className="text-lg mb-6">
                  수원하나교회 훈련은 성도님들이 말씀 안에서 깊이 뿌리 내리고,
                  예수 그리스도의 참된 제자로 성장하도록 돕는 훈련 과정입니다.
                </p>

                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 my-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">
                    훈련 안내
                  </h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Clock size={14} className="text-sky-600" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">
                          일시
                        </strong>
                        <span>매주 수요일 저녁 8시</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin size={14} className="text-sky-600" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">
                          장소
                        </strong>
                        <span>본당 2층 대예배실 및 소그룹실</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Users size={14} className="text-sky-600" />
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">
                          대상
                        </strong>
                        <span>등록교인 누구나</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  커리큘럼 소개
                </h3>
                <p className="mb-4">
                  체계적인 성경 공부와 나눔을 통해 신앙의 기초를 다지고, 삶의
                  현장에서 말씀을 적용하는 훈련을 진행합니다. 제자훈련, 사역훈련
                  등 단계별 과정을 통해 평신도 리더를 세우는 것을 목표로 합니다.
                </p>
              </div>
            </div>
          )}

          {activeTab.id === "dsm" && (
            <div className="animate-fade-in">
              <div className="border-b border-slate-200 pb-6 mb-8">
                <span className="text-sky-600 font-bold tracking-wide uppercase text-sm mb-2 block">
                  Daniel School of Ministry
                </span>
                <h2 className="text-3xl font-bold text-slate-900">DSM</h2>
              </div>
              <div className="bg-slate-50 rounded-2xl p-10 text-center border border-slate-100">
                <p className="text-slate-500 text-lg">준비중인 페이지입니다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    {
      name: "홈",
      id: "home",
      path: "/",
      sub: [],
    },
    {
      name: "말씀",
      id: "sermon",
      path: "/sermon",
      sub: [],
    },
    {
      name: "공동체",
      id: "community",
      path: "/community/light",
      sub: [
        { name: "빛의 군대", path: "/community/light" },
        { name: "여호수아의 군대", path: "/community/joshua" },
        { name: "모세의 군대", path: "/community/moses" },
        { name: "EM", path: "/community/em" },
      ],
    },
    {
      name: "훈련",
      id: "discipleship",
      path: "/discipleship/wednesday",
      sub: [
        { name: "훈련", path: "/discipleship/wednesday" },
        { name: "DSM", path: "/discipleship/dsm" },
      ],
    },
    {
      name: "교회소개",
      id: "intro",
      path: "/intro/pastor",
      sub: [
        { name: "비전", path: "/intro/vision" },
        { name: "핵심가치", path: "/intro/core-values" },
        { name: "교회연혁", path: "/intro/history" },
        { name: "담임목사 소개", path: "/intro/pastor" },
        { name: "섬기는 이들", path: "/intro/staff" },
        { name: "예배안내", path: "/intro/worship" },
        { name: "오시는 길", path: "/intro/location" },
      ],
    },
    {
      name: "교회소식",
      id: "news",
      path: "/news",
      sub: [], // 서브메뉴 삭제 요청 반영
    },
    {
      name: "부속기관",
      id: "appendages",
      path: "#",
      sub: [],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fadeIn 0.8s ease-out 0.2s forwards opacity: 0; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- Header --- */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-0 " : "bg-transparent py-2"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[70px]">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick("/")}
          >
            <div className="h-10 flex items-center">
              {/* 로고 이미지 적용 */}
              <img
                src={mainLogo}
                className={`h-full w-auto object-contain transition-all ${
                  isScrolled ? "" : "brightness-0 invert"
                }`}
                alt="logo"
              />
            </div>
          </div>

          <nav className="hidden md:flex h-full items-center">
            {navItems.map((item) => (
              <div
                key={item.name}
                className={`relative group cursor-pointer h-full flex items-center ${
                  item.name === "홈" ? "hidden" : ""
                }`}
              >
                <span
                  className={`text-base font-medium px-5 transition-colors ${
                    isScrolled
                      ? "text-slate-900 hover:text-sky-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.name}
                </span>
                {item.sub.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem.name}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleNavClick(subItem.path);
                        }}
                        href="#"
                        className="block px-4 py-2 text-base text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-slate-900" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl py-4 px-6 md:hidden flex flex-col space-y-4 max-h-[80vh] overflow-y-auto text-slate-900">
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-slate-100 pb-2">
                <span
                  className="block font-bold mb-2 cursor-pointer text-base"
                  onClick={() => handleNavClick(item.path)}
                >
                  {item.name}
                </span>
                {item.sub.length > 0 && (
                  <div className="flex flex-col space-y-2 pl-4">
                    {item.sub.map((sub) => (
                      <span
                        key={sub.name}
                        className="text-base text-slate-500 cursor-pointer py-1"
                        onClick={() => {
                          handleNavClick(sub.path);
                        }}
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/intro"
            element={<Navigate to="/intro/pastor" replace />}
          />
          <Route path="/intro/:tab" element={<IntroPage />} />
          <Route path="/sermon" element={<SermonPage />} />
          <Route
            path="/community"
            element={<Navigate to="/community/light" replace />}
          />
          <Route path="/community/:tab" element={<CommunityPage />} />
          <Route
            path="/discipleship"
            element={<Navigate to="/discipleship/wednesday" replace />}
          />
          <Route path="/discipleship/:tab" element={<TrainingPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <div
                className="mb-2 flex items-center cursor-pointer h-10"
                onClick={() => handleNavClick("/")}
              >
                {/* 푸터 로고 적용 (흰색 처리) */}
                <img
                  src={mainLogo}
                  className="h-full w-auto object-contain brightness-0 invert opacity-80"
                  alt="logo"
                />
              </div>
              <p className="ml-1 mb-6 leading-relaxed max-w-md text-sm">
                (17103) 경기도 용인시 기흥구 서그내로 16번길 11-6
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">예배안내</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-6">
                  <span className="text-slate-300 w-16">주일 1부</span>{" "}
                  <span>09:00</span>
                </li>
                <li className="flex items-center gap-6">
                  <span className="text-slate-300 w-16">주일 2부</span>{" "}
                  <span>11:00</span>
                </li>
                <li className="flex items-center gap-6">
                  <span className="text-slate-300 w-16">주일 3부</span>{" "}
                  <span>14:30</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-xs">
            <p>
              &copy; Copyright © 2025l 수원하나교회. Powered by 수원하나교회
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
