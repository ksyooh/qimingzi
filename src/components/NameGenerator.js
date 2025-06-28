import React, { useState } from "react";

/**
 * 名字生成区组件
 * 负责：输入英文名、调用AI接口、展示生成结果，并保存历史记录
 */
export default function NameGenerator() {
  // 用户输入的英文名
  const [englishName, setEnglishName] = useState("");
  // 生成的中文名结果
  const [results, setResults] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 错误提示
  const [error, setError] = useState("");

  // 处理输入变化
  const handleInputChange = (e) => {
    setEnglishName(e.target.value);
    setError("");
  };

  // 处理回车或按钮点击
  const handleGenerate = async () => {
    if (!englishName.trim()) {
      setError("Please enter your English name! 请输入英文名");
      return;
    }
    setLoading(true);
    setError("");
    setResults([]);
    try {
      // 调用AI接口生成中文名
      const resp = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer sk-61ba37c740fd4b86a0dcdce363ae05e2",
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content:
                `请根据英文名“${englishName}”，生成3个有趣的中文名，每个名字需附上中文寓意解释和英文解释，名字要富有诗意、带中国文化、幽默、可适当加入网络梗。返回格式为JSON数组，每个元素包含：name, meaning_cn, meaning_en。`
            },
          ],
        }),
      });
      const data = await resp.json();
      // 解析AI返回内容，确保格式正确
      let namesArr = [];
      try {
        // deepseek-chat 通常返回 {choices: [{message: {content: ...}}]}
        let raw = data.choices?.[0]?.message?.content || "";
        // 自动去除代码块符号和多余内容，只保留JSON数组
        // 1. 去除markdown代码块包裹（如```json ... ```）
        raw = raw.replace(/```[a-zA-Z]*([\s\S]*?)```/g, '$1').trim();
        // 2. 提取第一个[和最后一个]之间内容
        const start = raw.indexOf('[');
        const end = raw.lastIndexOf(']');
        if (start !== -1 && end !== -1 && end > start) {
          raw = raw.slice(start, end + 1);
        }
        namesArr = JSON.parse(raw);
      } catch {
        setError("AI返回内容解析失败，请稍后再试。");
        setLoading(false);
        return;
      }
      setResults(namesArr);
      // 保存到历史记录（只保留每个英文名最新一条）
      saveToHistory(englishName, namesArr);
    } catch (e) {
      setError("生成失败，请检查网络或稍后再试。");
    }
    setLoading(false);
  };

  // 回车快捷键
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleGenerate();
  };

  // 保存历史到localStorage
  function saveToHistory(englishName, namesArr) {
    let history = JSON.parse(localStorage.getItem("nameHistory") || "[]");
    // 只保留每个英文名一条，先去除已有的
    history = history.filter((item) => item.englishName !== englishName);
    // 新记录加到最前面
    history.unshift({ englishName, names: namesArr });
    // 最多保存20条
    if (history.length > 20) history = history.slice(0, 20);
    localStorage.setItem("nameHistory", JSON.stringify(history));
    // 通知历史组件刷新（用事件）
    window.dispatchEvent(new Event("nameHistoryUpdated"));
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-china-red/30 max-w-md mx-auto w-full"> // max-w-md和mx-auto让内容在手机和电脑都居中且不超屏
      <div className="mb-4">
        <label className="block text-lg font-semibold mb-2 text-china-red">
          Enter your English name
          <span className="ml-2 text-sm text-gray-500">输入你的英文名</span>
        </label>
        <div className="flex flex-col sm:flex-row gap-2"> 
          <input
            type="text"
            className="w-full sm:flex-1 px-4 py-3 border-2 border-china-red rounded-lg focus:outline-none focus:ring-2 focus:ring-china-red/50 text-base sm:text-lg mb-2 sm:mb-0"
            placeholder="e.g. Alice"
            value={englishName}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="w-full sm:w-auto bg-china-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold text-base sm:text-lg shadow transition-all duration-150"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </div>
      {/* 生成结果展示区 */}
      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-china-red mb-4">Chinese Names / 中文名</h2>
          <div className="space-y-4">
            {results.map((item, idx) => (
              <div
                key={idx}
                className="bg-china-red/10 border-l-4 border-china-red rounded-lg p-4 shadow-sm"
              >
                <div className="text-2xl font-bold text-china-red">{item.name}</div>
                <div className="mt-1 text-gray-700">{item.meaning_en}</div>
                <div className="mt-1 text-gray-600 text-sm">{item.meaning_cn}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
