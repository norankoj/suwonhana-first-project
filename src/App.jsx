import React, { useState, useEffect } from "react";
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
  Play,
  Monitor,
  ChevronLeft,
  Car,
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

// --- 메인 페이지 컴포넌트 ---
const MainPage = ({ handleNavClick }) => {
  const slides = [background02, background03];

  return (
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
            onClick={() => handleNavClick("intro")}
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
              <span className="font-semibold text-slate-800">연합(Unity)</span>
              하여 하나가 되어간다는 의미입니다.
            </p>
            <p className="text-sm text-slate-400 pt-4">
              수원하나교회는 기독교 한국 침례회 교단 소속 입니다.
            </p>
          </div>

          <button
            onClick={() => handleNavClick("intro")}
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
              수원하나교회에 오신 것을 환영합니다. 등록 절차를 안내해 드립니다.
              새가족 담당자 (신상철 목사 :010-2484-0776)
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
                  <h4 className="font-bold text-xl text-slate-900">셀 배정</h4>
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
              onClick={() => handleNavClick("sermon")}
            >
              메세지 더보기 <ArrowRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              className="lg:col-span-2 relative group cursor-pointer rounded-2xl overflow-hidden shadow-xl aspect-video"
              onClick={() => handleNavClick("sermon")}
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
                    onClick={() => handleNavClick("sermon")}
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
                onClick={() => handleNavClick("sermon")}
                className="w-full py-4 mt-auto bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-200 transition-all flex items-center justify-center"
              >
                설교 더보기 <ChevronRight size={18} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- 서브 페이지 (IntroPage) ---
const IntroPage = ({ activeIntroTab, setActiveIntroTab }) => {
  const tabs = [
    "비전",
    "핵심가치",
    "교회연혁",
    "담임목사 소개",
    "섬기는 이들",
    "예배안내",
    "오시는 길",
  ];
  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="교회소개"
        subtitle="About Us"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-12">
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
                <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
                  수원하나교회는 이 땅에 하나님의 나라를 세우며, 복음의 능력을
                  경험하는 믿음의 공동체입니다.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* 1. 하나님을 즐거워 함 */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-600 mb-6 text-xl font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    01
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    하나님을 즐거워 함
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    수원하나교회의 비전은 첫째, 하나님을 즐거워하는 것입니다. 참
                    신앙은 하나님을 즐거워하는 것입니다. 하나님을 즐거워하지
                    않는 신앙생활은 종교고 행위일 뿐, 진짜 믿음이 아닙니다.
                    그리스도인의 삶은 하나님의 사랑 안에서 그 분을 즐거워하는
                    것으로 시작되고, 또한 그것이 최종적인 목표입니다.(시편 9:2,
                    16:11, 27:4)
                  </p>
                </div>

                {/* 2. 그 분의 목적 */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-600 mb-6 text-xl font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    02
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    그 분의 목적
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    둘째, 예수님을 사랑하기 때문에 그 분의 목적이 우리의 목적이
                    됩니다. 그 분의 목적은 열방 가운데 주님의 몸된 교회를
                    개척하는 것입니다. 주님께서는 모든 민족이 주님의 몸된 교회
                    안으로 들어오기를 원하시기에 우리는 그 목적(열방 가운데
                    교회를 개척하는 일)에 우리의 삶을 기쁨으로, 또 열정적으로
                    드리기 원합니다. 이것이 우리의 비전입니다. (마태복음 24:14,
                    마태복음28:18~20)
                  </p>
                </div>

                {/* 3. 공동체 */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-600 mb-6 text-xl font-bold group-hover:bg-sky-600 group-hover:text-white transition-colors">
                    03
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    공동체
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    셋째, 교회는 공동체입니다. 그리스도인의 삶은 혼자 외롭게
                    걸어가는 “외로운 나그네 길”이 아닙니다. 그것은 예수 안에서
                    한가족 된 공동체가 서로 사랑하고 섬기며 함께 걸어가는
                    길입니다. 수원하나교회는 하나님의 가족입니다.(에베소서 2:19)
                  </p>
                </div>
              </div>

              <div className="aspect-[21/9] rounded-3xl bg-slate-100 overflow-hidden shadow-lg mx-auto relative">
                <img
                  src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Vision"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-8 md:p-12"></div>
              </div>
            </div>
          )}

          {activeIntroTab === "핵심가치" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {[
                {
                  title: "예배 (Worship)",
                  desc: "영과 진리로 드리는 예배의 감격",
                  icon: Heart,
                },
                {
                  title: "훈련 (Training)",
                  desc: "예수 그리스도의 제자로 성장",
                  icon: Users,
                },
                {
                  title: "선교 (Mission)",
                  desc: "땅 끝까지 이르러 증인 되는 삶",
                  icon: MapPin,
                },
              ].map((v, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl text-center hover:-translate-y-2 transition-transform duration-300 border border-slate-100 shadow-sm hover:shadow-md"
                >
                  <div className="w-14 h-14 mx-auto bg-sky-50 rounded-full shadow-sm flex items-center justify-center text-sky-600 mb-6">
                    <v.icon size={24} />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeIntroTab === "교회연혁" && (
            <div className="border-l-2 border-slate-200 pl-8 space-y-12 animate-fade-in ml-4">
              {[
                {
                  year: "2025",
                  title: "비전 선포",
                  desc: "새 성전 입당 및 2025 비전 선포",
                },
                {
                  year: "2020",
                  title: "창립 10주년",
                  desc: "해외 선교사 파송 및 지역 섬김 사역 확대",
                },
                {
                  year: "2015",
                  title: "교회 설립",
                  desc: "수원 영통구에서 첫 예배 시작 (개척 멤버 12명)",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-sky-600 border-4 border-white shadow-sm"></div>
                  <span className="text-sky-600 font-bold text-lg block mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeIntroTab === "담임목사 소개" && (
            <div className="animate-fade-in-up">
              <div className="flex flex-col md:flex-row gap-10 items-start">
                <div className="w-full md:w-[320px] shrink-0">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-slate-50">
                    <img
                      src={spastor_ko}
                      alt="고성준 담임목사"
                      className="w-full h-auto object-cover aspect-[4/5]"
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
                <div className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-sky-50 border border-sky-100 rounded-3xl p-8 md:p-10 shadow-sm">
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-sky-100 rounded-full blur-3xl opacity-60"></div>

                  <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
                    <div className="shrink-0">
                      <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-sky-500 shadow-md ring-4 ring-sky-50">
                        <Heart
                          size={36}
                          fill="currentColor"
                          className="text-sky-500"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 text-xs font-bold rounded-full mb-3">
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

                      <div className="flex flex-col md:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
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
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Main Worship (메인 워십) - Redesigned */}
              <section>
                <div className="flex items-end gap-3 mb-8 px-2">
                  <h3 className="font-bold text-3xl text-slate-900">
                    예배 시간 안내
                  </h3>
                  <span className="text-slate-400 font-medium text-sm pb-1 mb-1 hidden md:block">
                    Main Worship Service
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {/* 2-1. Sunday Morning */}
                  <div className="group bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold tracking-wide uppercase">
                            Seeker’s Service
                          </span>
                          <h4 className="text-3xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            자녀와 함께 드리는 열린예배
                          </h4>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-sky-500" />
                            <span className="font-bold text-slate-800">
                              주일 오전 9시, 11시
                            </span>
                          </div>
                          <span className="hidden sm:block w-px h-4 bg-slate-300"></span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              본당 2층 대예배실
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed max-w-2xl">
                          자녀들과 함께 드리는 예배로{" "}
                          <span className="text-slate-900 font-semibold bg-yellow-100/50 px-1">
                            복음과 구원
                          </span>
                          에 초점을 맞추어 드려지는 예배입니다. “열린 예배”는
                          믿는 분들, 믿지 않는 분들 누구에게나 열려 있습니다.
                          이웃들과 함께 오십시오.
                        </p>
                      </div>

                      <div className="lg:w-72 shrink-0 flex flex-col justify-center space-y-3">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                            Target Audience
                          </p>
                          <p className="text-slate-700 font-medium text-sm">
                            복음을 알기 원하는 분<br />
                            복음을 전하기 원하는 분
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-medium">
                            #복음과구원
                          </span>
                          <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-medium">
                            #치유와중보
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2-2. Young Adult */}
                  <div className="group bg-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row justify-between gap-8">
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold tracking-wide uppercase">
                            Young Adult
                          </span>
                          <h4 className="text-3xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            젊은이 열린예배
                          </h4>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-2xl w-fit">
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-indigo-500" />
                            <span className="font-bold text-slate-800">
                              주일 오후 2시 30분
                            </span>
                          </div>
                          <span className="hidden sm:block w-px h-4 bg-slate-300"></span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              본당 2층 대예배실
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed max-w-2xl">
                          중고등학생, 대학생, 청년들이 함께 드리는 예배로 복음과
                          구원에 초점을 맞추어 드려지는 예배입니다. 젊음의
                          열정으로 하나님을 예배하는 자리에 초대합니다.
                        </p>
                      </div>

                      <div className="lg:w-72 shrink-0 flex flex-col justify-center space-y-3">
                        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                          <p className="text-xs text-slate-400 font-bold uppercase mb-2">
                            Target Audience
                          </p>
                          <p className="text-slate-700 font-medium text-sm">
                            복음을 알기 원하는 청년
                            <br />
                            하나님을 깊이 만나고 싶은 청년
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-medium">
                            #다음세대
                          </span>
                          <span className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs font-medium">
                            #열정
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2-3. Friday Night (Dark Theme Enhanced) */}
                  <div className="group relative overflow-hidden bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Subtle Gradient background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>

                    <div className="relative flex flex-col lg:flex-row justify-between gap-8 z-10">
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800 text-sky-400 text-xs font-bold tracking-wide uppercase border border-slate-700">
                            Members Worship
                          </span>
                          <h4 className="text-3xl font-bold text-white">
                            금요예배
                          </h4>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-slate-300 bg-slate-800/50 p-4 rounded-2xl w-fit border border-slate-700/50">
                          <div className="flex items-center gap-2">
                            <Clock size={18} className="text-sky-400" />
                            <span className="font-bold text-slate-100">
                              금요일 저녁 9시
                            </span>
                          </div>
                          <span className="hidden sm:block w-px h-4 bg-slate-600"></span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              본당 2층 대예배실
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-400 leading-relaxed max-w-2xl">
                          하나교회 가족들이 참가하는 예배이며,{" "}
                          <span className="text-slate-200 font-medium">
                            믿는 자들의 영적 성숙
                          </span>
                          에 초점을 맞추고 있습니다. 깊이 있는 말씀과 기도로 한
                          주를 마무리하며 은혜를 나눕니다.
                        </p>
                      </div>

                      <div className="lg:w-72 shrink-0 flex flex-col justify-center space-y-3">
                        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700">
                          <p className="text-xs text-slate-500 font-bold uppercase mb-2">
                            Target Audience
                          </p>
                          <p className="text-slate-200 font-medium text-sm">
                            하나교회 등록 교인
                            <br />
                            영적 성숙을 사모하는 성도
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-medium">
                            #영적성숙
                          </span>
                          <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-medium">
                            #비전
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 3. Next Gen (다음세대) - Existing Design Preserved */}
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
                  <div className="bg-white p-6 border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center">
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
                  <div className="bg-white p-6 border border-slate-200 shadow-sm">
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
                  <div className="bg-white p-6 border border-slate-200 shadow-sm">
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
                  <div className="bg-white p-6  border border-slate-200 shadow-sm">
                    <h4 className="font-bold text-lg text-slate-900 mb-2 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                      YCM (중고등부)
                    </h4>
                    <p className="text-slate-600 text-sm mb-4">
                      예배 후 모임(스탠딩 투게더)이 있습니다.
                    </p>
                    <div className="bg-slate-50 p-4  text-sm space-y-2">
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
  const communities = [
    {
      id: "joybaby",
      name: "조이베이비",
      eng: "JOY BABY",
      age: "0-4세",
      desc: "하나님의 사랑으로 자라나는 영유아부 공동체입니다.",
      img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "joycorner",
      name: "조이코너",
      eng: "JOY CORNER",
      age: "5-7세",
      desc: "말씀 먹고 자라나는 유치부 공동체입니다.",
      img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "joyland",
      name: "조이랜드",
      eng: "JOY LAND",
      age: "초등부",
      desc: "예수님의 성품을 닮아가는 초등부 어린이들입니다.",
      img: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "ycm",
      name: "YCM",
      eng: "Youth",
      age: "청소년",
      desc: "세상의 빛이 되는 청소년 공동체 YCM입니다.",
      img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "ucm",
      name: "UCM",
      eng: "University",
      age: "대학부",
      desc: "캠퍼스의 복음화를 꿈꾸는 대학 청년 공동체입니다.",
      img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "1jin",
      name: "1진",
      eng: "Young Adult",
      age: "청년부",
      desc: "청년의 때에 창조주를 기억하며 헌신하는 청년 공동체입니다.",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "2jin",
      name: "2진",
      eng: "Adult Community",
      age: "장년",
      desc: "믿음의 뿌리를 내리고 가정을 세워가는 장년 공동체입니다.",
      img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "3jin",
      name: "3진",
      eng: "Senior Community",
      age: "장년",
      desc: "지혜와 경륜으로 교회를 든든히 받치는 시니어 공동체입니다.",
      img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "em",
      name: "EM",
      eng: "English Ministry",
      age: "All",
      desc: "Worshipping God in English, connecting across cultures.",
      img: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
  ];
  const [selectedGroup, setSelectedGroup] = useState(communities[0]);

  return (
    <div className="bg-white min-h-screen animate-fade-in">
      <HeroSub
        title="공동체"
        subtitle="Community"
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
      />
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {communities.map((group) => (
            <button
              key={group.id}
              onClick={() => setSelectedGroup(group)}
              className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center h-28 ${
                selectedGroup.id === group.id
                  ? "bg-sky-600 text-white border-sky-600 shadow-lg scale-105"
                  : "bg-white text-slate-600 border-slate-200 hover:border-sky-300 hover:bg-sky-50"
              }`}
            >
              <span
                className={`text-lg font-bold mb-1 ${
                  selectedGroup.id === group.id
                    ? "text-white"
                    : "text-slate-800"
                }`}
              >
                {group.name}
              </span>
              <span
                className={`text-xs ${
                  selectedGroup.id === group.id
                    ? "text-sky-100"
                    : "text-slate-400"
                }`}
              >
                {group.eng}
              </span>
            </button>
          ))}
        </div>
        <div className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm border border-slate-100 flex flex-col md:flex-row animate-fade-in key={selectedGroup.id}">
          <div className="w-full md:w-1/2 aspect-video md:aspect-auto relative overflow-hidden">
            <img
              src={selectedGroup.img}
              alt={selectedGroup.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h4 className="text-4xl font-bold text-slate-900 mb-2">
              {selectedGroup.name}
            </h4>
            <p className="text-sky-600 font-medium tracking-wide uppercase mb-6">
              {selectedGroup.eng}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {selectedGroup.desc}
            </p>
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

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 페이지 네비게이션 상태 관리
  const [currentPage, setCurrentPage] = useState("main");
  const [activeIntroTab, setActiveIntroTab] = useState("담임목사 소개");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (page, tab = null) => {
    setCurrentPage(page);
    if (tab) setActiveIntroTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const navItems = [
    {
      name: "교회소개",
      id: "intro",
      sub: [
        "비전",
        "핵심가치",
        "교회연혁",
        "담임목사 소개",
        "섬기는 이들",
        "예배안내",
        "오시는 길",
      ],
    },
    {
      name: "말씀뱅크",
      id: "sermon",
      sub: [],
    },
    {
      name: "공동체",
      id: "community",
      sub: [],
    },
    {
      name: "교회소식",
      id: "news",
      sub: [], // 서브메뉴 삭제 요청 반영
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fadeIn 0.8s ease-out 0.2s forwards opacity: 0; }
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
            onClick={() => handleNavClick("main")}
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
                className="relative group cursor-pointer h-full flex items-center"
              >
                <span
                  className={`text-sm font-medium px-5 transition-colors ${
                    isScrolled
                      ? "text-slate-900 hover:text-sky-600"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.name}
                </span>
                {item.sub.length > 0 && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    {item.sub.map((subItem) => (
                      <a
                        key={subItem}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (item.id === "intro")
                            handleNavClick("intro", subItem);
                          else handleNavClick(item.id);
                        }}
                        href="#"
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                      >
                        {subItem}
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
                  className="block font-bold mb-2 cursor-pointer"
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.name}
                </span>
                {item.sub.length > 0 && (
                  <div className="flex flex-col space-y-2 pl-4">
                    {item.sub.map((sub) => (
                      <span
                        key={sub}
                        className="text-sm text-slate-500 cursor-pointer py-1"
                        onClick={() => {
                          if (item.id === "intro") handleNavClick("intro", sub);
                          else handleNavClick(item.id);
                        }}
                      >
                        {sub}
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
        {currentPage === "main" && <MainPage handleNavClick={handleNavClick} />}
        {currentPage === "intro" && (
          <IntroPage
            activeIntroTab={activeIntroTab}
            setActiveIntroTab={setActiveIntroTab}
          />
        )}
        {currentPage === "sermon" && <SermonPage />}
        {currentPage === "community" && <CommunityPage />}
        {currentPage === "news" && <NewsPage />}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div
                className="mb-2 flex items-center cursor-pointer h-10"
                onClick={() => handleNavClick("main")}
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
                <li className="flex justify-between">
                  <span>주일 1부</span> <span>09:00</span>
                </li>
                <li className="flex justify-between">
                  <span>주일 2부</span> <span>11:00</span>
                </li>
                <li className="flex justify-between">
                  <span>주일 3부</span> <span>14:30</span>
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

export default App;
