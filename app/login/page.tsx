"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setError("이메일 또는 비밀번호가 일치하지 않습니다.");
      setIsLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-16">
      {/* Header Bar */}
      <div className="bg-gray-50 border-b border-gray-200 py-4 px-6 fixed top-0 w-full z-10 hidden sm:block">
        <h1 className="text-base font-bold text-gray-800">로그인/회원가입</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-[400px] space-y-8 mt-[10vh]">
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3 text-3xl font-black tracking-tighter">
              <span>HAOKAN</span>
              <span className="text-gray-300 font-light text-2xl">|</span>
              <span className="font-medium tracking-tight text-2xl mt-1">PREMIUM</span>
              <span className="text-gray-300 font-light text-2xl">|</span>
              <span className="font-serif italic lowercase tracking-wide text-2xl mt-1">exclusive_</span>
            </div>
            <p className="text-[15px] font-medium text-gray-800">
              하오칸, 프리미엄, 익스클루시브를 하나로 로그인하세요.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div>
                <input
                  type="email"
                  required
                  className="block w-full border border-gray-300 bg-white rounded-md px-4 py-[14px] text-[15px] placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                  placeholder="통합계정 또는 이메일"
                  value={data.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full border border-gray-300 bg-white rounded-md px-4 py-[14px] text-[15px] placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all pr-12"
                  placeholder="비밀번호"
                  value={data.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({ ...data, password: e.target.value })}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <i className={`ri-eye-${showPassword ? 'line' : 'off-line'} text-xl`}></i>
                </button>
              </div>
            </div>

            <div className="flex items-center pt-1 pb-3">
              <input
                id="auto-login"
                name="auto-login"
                type="checkbox"
                className="h-[18px] w-[18px] rounded-sm border-gray-300 text-black focus:ring-black cursor-pointer bg-white"
              />
              <label htmlFor="auto-login" className="ml-2.5 block text-[14px] text-gray-600 tracking-tight cursor-pointer">
                자동 로그인
              </label>
            </div>

            {error && <p className="text-sm text-red-600 font-bold px-1">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center bg-black py-[15px] px-4 text-[16px] font-bold text-white rounded hover:bg-gray-900 transition-colors cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "로그인 중..." : "로그인"}
            </button>
          </form>

          <div className="pt-6">
            <p className="text-center text-[14px] font-bold text-gray-800 mb-4 tracking-tight">
              지금 가입하면, 신규 할인 쿠폰 즉시 발급
            </p>
            <div className="space-y-2.5">
              <button 
                type="button"
                className="w-full flex items-center justify-center bg-[#FEE500] hover:bg-[#F4DC00] text-[#000000] py-[14px] px-4 rounded text-[15px] font-medium transition-colors cursor-pointer shadow-sm relative"
              >
                <i className="ri-chat-3-fill text-[20px] absolute left-4"></i>
                카카오로 시작하기
              </button>
              <button 
                type="button"
                className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-black py-[14px] px-4 rounded text-[15px] font-medium transition-colors cursor-pointer relative"
              >
                <i className="ri-apple-fill text-[20px] absolute left-4"></i>
                Apple로 시작하기
              </button>
              <Link 
                href="/register"
                className="w-full flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-50 text-black py-[14px] px-4 rounded text-[15px] font-medium transition-colors cursor-pointer relative"
              >
                이메일로 가입하기
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-3 pt-6 text-[13px] text-gray-500 font-medium">
            <button className="hover:text-black transition-colors cursor-pointer">아이디 찾기</button>
            <span className="text-gray-300 text-[10px]">|</span>
            <button className="hover:text-black transition-colors cursor-pointer">비밀번호 찾기</button>
          </div>

        </div>
      </div>
    </div>
  );
}
