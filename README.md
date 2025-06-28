# Fun Chinese Name Generator for Foreigners

## 项目简介 (Project Introduction)
这是一个帮助外国人生成有趣中文名字的网页应用。用户只需输入英文名，点击生成，即可获得3个富有中国文化、诗意和幽默感的中文名，并附有中英文寓意解释。页面采用苹果风设计，主色调为中国红，兼顾美观与易用性。

## 核心功能 (Core Features)
1. **英文名输入**：用户输入英文名
2. **一键生成**：点击按钮或回车即可生成
3. **AI生成中文名**：调用 deepseek-chat API，生成3个有趣中文名
4. **中英文解释**：每个名字配有中英双语寓意说明，内容富有诗意、幽默，并结合网络梗
5. **历史记录**：页面下方展示历史生成记录，每个英文名只保留一条，支持点击展开详细解释
6. **美观设计**：整体风格简洁大气，主色调中国红，英文为主，中文为辅

## 使用方法 (Usage)
1. 在首页输入你的英文名
2. 点击“Generate”按钮或按回车
3. 稍等片刻，页面会展示3个中文名及其详细解释
4. 下方“历史记录”区块可查看最近生成的有趣名字，点击可展开详细解释

## API 参数说明 (API Parameters)
- **API地址**：`https://api.deepseek.com/chat/completions`
- **API Key**：`sk-61ba37c740fd4b86a0dcdce363ae05e2`
- **请求方式**：POST
- **主要参数**：
  - `model`: 使用 deepseek-chat
  - `messages`: 包含用户输入的英文名及生成要求

## 技术栈 (Tech Stack)
- 前端：React
- 样式：Tailwind CSS
- 状态管理：React Hooks
- 历史记录存储：localStorage
- AI接口：deepseek-chat

## 返回值说明 (Response)
- **中文名列表**：每个包含
  - 中文名
  - 中文寓意解释
  - 英文寓意解释

## 未来可扩展建议 (Future Improvements)
- 支持更多语言界面切换
- 用户自定义风格或文化元素
- 增加分享功能（如分享到社交媒体）
- 后端存储历史记录，实现多端同步

---

如需开发或使用帮助，请联系产品经理。

---

# English Summary
This project helps foreigners generate fun, poetic, and culturally rich Chinese names based on their English names. The site is beautifully designed with a Chinese red theme, and all instructions are primarily in English with Chinese support. The AI generates 3 names, each with detailed explanations in both languages, and keeps a history of generated names for easy reference.
