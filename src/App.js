import React from "react";
import NameGenerator from "./components/NameGenerator";
import HistoryList from "./components/HistoryList";

// 主页面组件，负责整体布局和风格
export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans">
      {/* 顶部标题区 */}
      <header className="w-full py-8 bg-china-red text-white shadow-md text-center">
        <h1 className="text-4xl font-bold tracking-wide">Fun Chinese Name Generator</h1>
        <p className="mt-2 text-lg opacity-90">为你量身定制有趣中文名</p>
      </header>

      {/* 名字生成区 */}
      <main className="flex-1 w-full max-w-xl px-4 py-8">
        <NameGenerator />
      </main>

      {/* 历史记录区 */}
      <section className="w-full max-w-2xl px-4 pb-12">
        <HistoryList />
      </section>

      {/* 页脚 */}
      <footer className="w-full py-4 bg-gray-100 text-center text-xs text-gray-500">
        © 2025 Fun Chinese Name Generator | Designed with <span className="text-china-red">♥</span> for culture & fun
      </footer>
    </div>
  );
}
