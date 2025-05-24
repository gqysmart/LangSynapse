# LangSynapse - 情景式刷词系统设计文档

## 1. 功能定位

LangSynapse 的记单词系统采用「场景 + 等级」的学习模式，并结合“左右滑动”交互方式，实现高效、个性化的词汇记忆体验。

---

## 2. 词汇分类维度

- **场景维度**：
  - 日常生活（吃饭、购物、交通）
  - 职场沟通（会议、谈判、项目）
  - 文化娱乐（电影、艺术、旅行）
  - 学术学习（科技、医学、文学）
  - 自定义标签（用户可定义场景）

- **等级维度**（对标 CEFR）：
  - A1 ~ C2 六级难度
  - 每级词表可由 AI 适配用户当前水平动态调整

---

## 3. 学习方式：卡片刷词（简洁 + 展开）

### 简洁模式（初始展示）
- **单词**：grateful
- **音标**：/ˈɡreɪt.fəl/
- **词性**：adj.
- **场景标签**：日常生活 / 情感表达

#### 用户操作：
- ⬅️ 左滑：表示已掌握 / 跳过
- ➡️ 右滑：表示不熟 / 需要复习
- 点击卡片：进入详细模式

---

### 展开模式（点击卡片后）
- **中文释义**：感激的，感谢的
- **同义词**：thankful, appreciative
- **反义词**：ungrateful
- **常用搭配**：be grateful for, feel grateful to someone
- **词根词缀**：grat-（感谢）
- **例句**：I'm **grateful** for your help.

---

## 4. 数据结构（示例 JSON）

```json
{
  "word": "grateful",
  "level": "B1",
  "scene": ["日常生活", "情感表达"],
  "phonetic": "/ˈɡreɪt.fəl/",
  "pos": "adj.",
  "translation": "感激的",
  "synonyms": ["thankful", "appreciative"],
  "antonyms": ["ungrateful"],
  "phrases": ["be grateful for", "feel grateful to someone"],
  "root": "grat-（感谢）",
  "example": "I'm grateful for your help."
}
flowchart TD
    A[加载单词卡] --> B[简洁模式展示]
    B -->|左滑| C[标记为“已掌握”]
    B -->|右滑| D[标记为“需复习”]
    B -->|点击卡片| E[展开详细信息]
    E --> F[展示详细内容]
    F --> G[滑动或返回主流程]
    G --> A

7. 可扩展功能（未来开发）
	•	AI 生成例句 / 翻译 / 语境扩展
	•	词汇对比练习、默写测试、造句训练
	•	场景选择进入刷词模式（如“机场”）
	•	复习曲线（结合 SuperMemo 算法）
	•	多语言支持（如英语法语混合记忆）

