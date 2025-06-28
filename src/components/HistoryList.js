import React, { useEffect, useState } from "react";

/**
 * 历史记录区组件
 * 展示最近生成过的有趣名字，每个英文名只显示一条，点击可展开详细解释
 */
export default function HistoryList() {
  // 历史记录
  const [history, setHistory] = useState([]);
  // 展开状态
  const [expanded, setExpanded] = useState({});

  // 监听localStorage变化，刷新历史
  useEffect(() => {
    function load() {
      const his = JSON.parse(localStorage.getItem("nameHistory") || "[]");
      setHistory(his);
    }
    load();
    // 监听自定义事件，跨组件刷新
    window.addEventListener("nameHistoryUpdated", load);
    return () => window.removeEventListener("nameHistoryUpdated", load);
  }, []);

  // 切换展开/收起
  const toggleExpand = (idx) => {
    setExpanded((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (history.length === 0) return (
    <div className="mt-8 text-center text-gray-400">No history yet. 暂无历史记录</div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-china-red/20 mt-8">
      <h2 className="text-xl font-bold text-china-red mb-4">History / 历史生成记录</h2>
      <ul className="flex flex-wrap gap-2 mt-2">
        {history.map((item, idx) => (
          <li key={item.englishName}>
            <div
              className="flex items-center justify-between cursor-pointer hover:bg-china-red/10 rounded px-2 py-2"
              onClick={() => toggleExpand(idx)}
            >
              <div className="font-semibold text-lg text-china-red">
                {item.englishName}
              </div>
              <div className="flex gap-2">
                {item.names.map((n, i) => (
                  <span
                    key={i}
                    className="bg-china-red/20 text-china-red font-bold px-3 py-1 rounded-full text-sm sm:text-base break-words"
                    style={{ minWidth: '56px', textAlign: 'center' }} // 保证标签最小宽度，移动端也不挤
                  >
                    {n.name}
                  </span>
                ))}
                <span className="ml-4 text-gray-500 text-sm">
                  {expanded[idx] ? "▲" : "▼"}
                </span>
              </div>
            </div>
            {/* 展开详细解释 */}
            {expanded[idx] && (
              <div className="bg-gray-50 border-l-4 border-china-red rounded-lg p-4 mt-2">
                {item.names.map((n, i) => (
                  <div key={i} className="mb-2">
                    <div className="text-china-red font-bold text-lg">{n.name}</div>
                    <div className="text-gray-700 mt-1">{n.meaning_en}</div>
                    <div className="text-gray-600 text-sm">{n.meaning_cn}</div>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
