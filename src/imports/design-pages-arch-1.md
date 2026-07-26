# Figma 设计指导 — 页面架构与出图规范

> 需求真相源：[../requirements/prd-mvp.md](../requirements/prd-mvp.md)  
> 视觉令牌与组件语汇：[DESIGN.md](./DESIGN.md)  
> 产品：HDP Language Learning（Tauri 桌面练习工具）

本文告诉设计师 / 设计 Agent：**要画哪些 Frame、布局硬约束是什么、如何映射 DESIGN.md**。不要把营销站 Hero 渐变铺满整个 App。

---

## 1. 文档关系

| 文档 | 用途 |
|------|------|
| `prd-mvp.md` | 做什么、不做什么、状态机、验收 |
| `DESIGN.md` | 颜色、字体、按钮、圆角、焦点态 |
| **本文** | 画哪些页面变体、Practice Desk 结构、组件落点、标注规则 |

出图顺序建议：先 Practice Desk 核心态 → Import 就绪态 → Library 列表态。

---

## 2. 设计系统适配（相对 DESIGN.md）

`DESIGN.md` 原偏 Figma 营销站。本产品是 **桌面练习工具**，按下表适配：

| DESIGN 原则 | App 中的用法 |
|-------------|--------------|
| 界面铬黑白（`#000` / `#fff`） | 所有导航、控制条、右栏文稿、按钮、边框 |
| 彩色来自「作品」 | **仅视频画面**出彩；界面不加品牌紫/粉等 |
| Hero 多色渐变 | **营销落地页可用**；Practice Desk / Library / Import **禁止**铺满渐变底 |
| Pill 50px / Circle 50% | 主 CTA、速度档、图标按钮 |
| dashed 2px focus | 所有可聚焦控件 |
| figmaSans 字重阶梯 | 有则用；无则 `SF Pro Display` / `Inter`，并在标注里写目标字重 320/330/340/450/480/540/700 |
| figmaMono 大写标签 | ReadyState、区域标签（如 `TRANSCRIPT`、`SPEED`） |
| 卡片阴影 | 少用；主工作区靠分区与留白，不用厚重 elevation |

### 2.1 令牌速查（出图时直接用）

- Pure Black `#000000` — 正文、实心按钮、边框  
- Pure White `#ffffff` — 页面底、按钮字（在黑底上）  
- Glass Dark `rgba(0,0,0,0.08)` — 次级圆钮、轻分隔底  
- Glass Light `rgba(255,255,255,0.16)` — 仅当叠在深色媒体控件上  
- 间距基准 8px；容器圆角 6–8px；Pill 50px；Icon 按钮正圆  

### 2.2 字体角色（App）

| 角色 | 建议规格 | 用途 |
|------|----------|------|
| App 标题 | 24px / weight 700 或 540 | 窗口标题、库名 |
| 区域 Mono Label | 12–18px mono，uppercase，letter-spacing +0.54~0.6px | `LIBRARY` / `READY` / `SHADOW` |
| 正文 | 16–20px，weight 330–450，负 tracking | 说明、列表副文案 |
| Transcript 正文 | 18–20px，weight 330–400 | 右栏全文 |
| Transcript 当前句 | 同字号，weight 540–700，或左侧 2px 黑条 | 当前 Cue |
| 按钮 | 16px，weight 400 | Pill CTA |

---

## 3. 画板规格

| 画板 | 尺寸 | 是否必须 |
|------|------|----------|
| **Desktop Primary** | **1440 × 900** | 必须（主交付） |
| Desktop Compact | 1280 × 800 | 建议（验证紧凑） |
| Desktop Wide | 1920 × 1080 | 可选 |
| Narrow fallback | 900 × 800 | 可选 1 帧：视频上、文稿下的降级示意 |

不要求完整移动端套件。

**Figma 页面命名建议：**

```
01 Library
02 Import
03 Practice Desk
04 Components
05 Cover / Flow
```

---

## 4. 必须交付的 Frame 清单

每个 Frame 名称建议：`页面/状态`。Frame 描述或便签注明对应 PRD 章节。

### 4.1 Library

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `Library / Empty` | 无导入材料 | 精选区至少 1 条演示材料；空导入区文案 +「导入」Pill CTA | §5.1, §6.1 |
| `Library / Populated` | 有精选 + 导入 | 列表项：标题、时长、ReadyState badge；区分 builtin / local | L-1, L-2 |
| `Library / WithStats` | 有使用数据 | 顶栏：继续练习、今日句数、时长、连击 | L-3, L-4 |

**列表项组件要点：**

- 左侧小缩略图（可来自视频首帧，允许彩色）  
- 标题黑字；副信息用 weight 320–330  
- ReadyState 用 Mono 小标签：`PLAYABLE` / `READABLE` / `SHADOWABLE`  
- 整行可点；主按钮用 Black Pill「练习」或「继续」

### 4.2 Import

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `Import / SelectVideo` | 步骤 1 | 选择本地视频；虚线/轻框投放区；黑 Pill「选择文件」 | I-1 |
| `Import / Playable` | 步骤 2 | 已 `playable`；可小预览；提示「下一步添加字幕」 | I-2, §7 |
| `Import / AttachSubtitle` | 步骤 3 | 选择 `.srt` / `.vtt`；格式说明 | I-3 |
| `Import / ReadyProgress` | 进度 | 三级就绪可视化（见下）；失败态示例（字幕解析失败） | I-4, I-5 |
| `Import / Complete` | 完成 | CTA「开始练习」→ Practice Desk；次要「返回库」 | I-6 |

**三级就绪可视化（必须画出）：**

```
[●] playable  —— 媒体就绪
[●] readable  —— 字幕 / Cue 就绪
[○] shadowable —— 时间轴可跟读（未完成时为空心）
```

用黑白即可；当前步可用 Black Pill 或加粗 Mono Label，**不要用彩色进度条彩虹**。

**禁止：**「AI 正在生成字幕…」类 ASR 营销等待页（PRD 明确不做首发 ASR）。

### 4.3 Practice Desk（核心，变体最多）

#### 布局硬约束（所有 Desk Frame 遵守）

```
┌─────────────────────────────────────────────────────────────┐
│  Top bar: 材料名 · ReadyState · 返回库                        │
├────────────────────────────┬────────────────────────────────┤
│                            │  TRANSCRIPT                    │
│       VIDEO (彩色源)        │  全文逐句列表                   │
│                            │  · 当前句高亮 + 自动滚动锚点      │
│                            │  · 可点句跳转                   │
├────────────────────────────┴────────────────────────────────┤
│  Bottom bar: 听原句 | 录音(可选) | 原音/我的 | 再来 | 下一句 | SPEED pills │
└─────────────────────────────────────────────────────────────┘
```

比例建议（1440 宽）：左媒体约 **52–58%**，右文稿 **42–48%**；底栏高约 **72–88px**。

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `Desk / Default` | `shadowable` 默认 | 左视频播放中；右栏多句可见；当前句高亮；底栏完整 | §6.3 |
| `Desk / CueHighlight` | 滚动高亮 | 右栏中部为当前句；上下句降低对比（仍可读） | P + 布局 |
| `Desk / SpeedPresets` | 变速 | Pill 组：`0.7` `0.85` `1.0` `1.15`；当前档 Black Solid，其余 Ghost/白底黑字 | S-1–S-4 |
| `Desk / Recording` | 录音中 | 录音圆钮激活态（黑实心或粗环）；文案「录音中」；不出现分数 | P-4 |
| `Desk / ComparePlayback` | 对照 | 切换「原音 / 我的声音」；二者互斥高亮 | P-5 |
| `Desk / SentenceTranslation` | 点句译文 | 当前句下或侧旁显示译文（轻量，不遮视频） | R-1 |
| `Desk / WordBookmarked` | 点词收藏 | 词被选中后的轻反馈 +「已收藏」；无词典释义大卡片 | R-2 |
| `Desk / BookmarksPanel` | 收藏列表 | 从 Desk 打开的轻层面板/抽屉，列出词 + 上下文句 | R-3 |
| `Desk / PlayableOnly` | 能力降级 | 右栏空或占位；跟读/单句控件禁用 + 说明「添加字幕后可跟读」 | §7 |
| `Desk / ReadableOnly` | 能力降级 | 右栏可读可点；单句跟读弱化或警告「时间轴未就绪」 | §7 |

#### Shadow Loop 原型连线（Figma Prototype）

在 `Desk / Default` 上连线说明主路径：

1. 听原句 →（可选）录音中 → 对照回放 → 再来 **或** 下一句  
2. 下一句后速度保持用户所选；**新材料首句默认 0.85**（可用便签注明）

---

## 5. 组件清单（Components 页）

在 `04 Components` 建立组件，并与 DESIGN.md 对齐：

| 组件名 | 规格映射 | 用途 |
|--------|----------|------|
| `Button / Primary Black Pill` | 黑底白字，radius 50px | 练习、开始、选择文件 |
| `Button / Secondary White Pill` | 白底黑字，radius 50px | 次要操作 |
| `Button / Icon Circle` | 50% 圆；Glass Dark 或黑/白 | 录音、播放、关闭 |
| `Button / Speed Pill` | 小 Pill；Active = 黑底白字 | 0.7 / 0.85 / 1.0 / 1.15 |
| `Label / Mono` | figmaMono uppercase | 区域与状态标签 |
| `Badge / ReadyState` | Mono Small；三态 | Library / Import / Desk 顶栏 |
| `ListRow / Material` | 缩略图 + 标题 + badge + CTA | Library |
| `Transcript / Line Default` | 18–20px weight 330 | 右栏 |
| `Transcript / Line Active` | weight 540–700 + 左指示条 | 当前 Cue |
| `Transcript / Line Done` | 略降对比或前缀轻标记 | 已练过（可选） |
| `Bar / PracticeControls` | 底栏整组 | Desk 复用 |
| `Panel / Bookmarks` | 8px radius 白底轻阴影 | 收藏 |

**Focus：** 所有交互组件展示 1 个 `Focus / Dashed 2px` 示例。

---

## 6. 文案与标注规范

1. **每个 Frame 旁便签**写：`PRD §x` + 一句话用户目标。  
2. **禁用态**必须画出（灰不是彩色），并写清解锁条件。  
3. **尺寸标注**：主画板关键分区宽度、底栏高度、速度 Pill 间距（8 的倍数）。  
4. **交互说明**用 Prototype 或箭头，不把长流程画进静态营销插画。  
5. 中文 UI 为主；Mono Label 可用英文大写（`SHADOWABLE`）以符合 DESIGN 技术标签气质。  
6. 产品名暂用 **HDP Language Learning**；不确定处用中性「练习」「导入」。

### 6.1 推荐界面微文案

| 位置 | 文案 |
|------|------|
| Library CTA | 开始练习 / 继续练习 / 导入材料 |
| Import 无字幕 | 添加 .srt 或 .vtt 字幕后即可跟读 |
| Desk 录音可选 | 录音（可选） |
| 对照 | 原音 / 我的声音 |
| 速度区 Label | SPEED |
| 右栏 Label | TRANSCRIPT |

---

## 7. 明确勿设计

| 勿出现 | 原因 |
|--------|------|
| 发音分数环、星级、音素热力图 | ADR-001 |
| 强制「必须录音才能下一句」 | PRD 非范围 |
| 原音/用户波形打分对比 | MVP 不做 |
| 独立「精读」Tab/页面 | 合并进右栏点句/点词 |
| Segment 多句练习集管理 | ADR-002 |
| ASR「智能生成字幕」等待营销页 | ADR-005 |
| 登录墙、头像账号体系 | ADR-006 |
| 词典释义大弹窗 / 联网查词 | R-2 仅收藏 |
| 界面铬使用紫/粉/多色渐变 | 彩色只留给视频 |
| 完整 iOS/Android 套件 | 桌面优先 |

---

## 8. 交付检查清单（设计侧）

- [ ] 主画板 1440×900，三页均有关键态  
- [ ] Practice Desk 左视频 / 右全文 / 底控制条硬布局未被打破  
- [ ] 速度四档 Pill，默认态能看出 0.85  
- [ ] ReadyState 三态在 Library、Import、Desk 均有表达  
- [ ] Shadow Loop 有原型或分镜连线  
- [ ] Components 页含 Primary Pill、Icon Circle、Transcript 行态、ReadyState badge  
- [ ] 界面铬为黑白；无评分、无登录、无 ASR 等待页  
- [ ] 每个关键 Frame 标注了 PRD 章节  

---

## 9. 信息架构速览

```
Library ──► Practice Desk
   │              ▲
   └──► Import ───┘
```

详情与业务规则以 [prd-mvp.md](../requirements/prd-mvp.md) §5–§8 为准。

---

## 10. 已实现代码映射

> 本章记录当前 React 实现与设计规范的对应关系，供后续 AI Agent 读取后直接定位或扩展功能。
> 技术栈：React 19 + Vite 8 + Tailwind CSS v4，入口 `src/main.tsx`。

### 10.1 页面导航结构

```
src/App.tsx          # 路由状态机（useState），管理三页切换
  ├── Library        # 默认落地页
  ├── Import         # 由 Library「导入材料」按钮进入
  └── PracticeDesk   # 由 Library「练习/继续」或 Import「开始练习」进入
```

导航逻辑全部集中在 `src/App.tsx`，通过 `Page` 联合类型（`library | import | practice`）驱动，无路由库依赖。

### 10.2 页面组件文件

| 设计页面 | 组件文件 | 说明 |
|----------|----------|------|
| Library | `src/components/Library.tsx` | 含三种状态切换：Empty / Populated / With Stats |
| Import | `src/components/Import.tsx` | 五步流程：SelectVideo → Playable → AttachSubtitle → Progress → Complete |
| Practice Desk | `src/components/PracticeDesk.tsx` | 含七种状态切换：Default / CueHighlight / Speed / Recording / Compare / PlayableOnly / ReadableOnly |

### 10.3 原子组件清单

| 组件 | 文件 | 对应规范 §5 |
|------|------|------------|
| `TopBar` | `src/components/TopBar.tsx` | 顶栏：材料名 · ReadyState · 返回库 · 语言切换 |
| `VideoPanel` | `src/components/VideoPanel.tsx` | 左栏视频占位（彩色渐变 mock） |
| `TranscriptPanel` | `src/components/TranscriptPanel.tsx` | 右栏逐句列表，含自动滚动锚点 |
| `BottomBar` | `src/components/BottomBar.tsx` | 底部控制栏：听原句 / 录音 / 原音·我的声音 / 再来 / 下一句 / SPEED |
| `MonoLabel` | `src/components/MonoLabel.tsx` | figmaMono uppercase 区域标签 |
| `ReadyStateBadge` | `src/components/ReadyStateBadge.tsx` | PLAYABLE / READABLE / SHADOWABLE 三态 badge |
| `TranscriptLine` | `src/components/TranscriptLine.tsx` | 单句行：default / active / done 三态 |
| `PillButton` | `src/components/PillButton.tsx` | Black / White / Ghost Pill CTA，radius 50px |
| `IconButton` | `src/components/IconButton.tsx` | 50% 圆钮：glass / black / white 三变体 |
| `SpeedPill` | `src/components/SpeedPill.tsx` | 速度档小 Pill：0.7 / 0.85 / 1.0 / 1.15 |
| `LangToggle` | `src/components/LangToggle.tsx` | 中 / EN 语言切换，放置于各页顶栏 |

### 10.4 国际化（i18n）

- 文件：`src/i18n.tsx`
- 实现：React Context（`I18nProvider` + `useI18n()` hook），无第三方库
- 语言：`zh`（中文）/ `en`（英文），全部字符串集中在 `strings` 对象
- 切换：`LangToggle` 组件，全局即时生效
- 扩展语言：在 `strings` 对象中新增语言键，并在 `Lang` 类型中追加即可

### 10.5 响应式断点

| 断点 | 宽度 | Practice Desk 布局变化 |
|------|------|----------------------|
| 移动（默认） | < 768px | 视频(16:9)上 + 文稿下；底栏拆为两行 |
| 桌面（`md:`） | ≥ 768px | 视频左(55%) + 文稿右(45%)；底栏单行 |

参考规范 §3「Narrow fallback」方案，使用 Tailwind `md:` 前缀实现，无 JS 断点检测。

### 10.6 设计令牌落地

设计令牌通过 CSS 自定义属性定义在 `src/index.css`：

```css
--font-sans   /* figmaSans → Inter variable 降级 */
--font-mono   /* figmaMono → JetBrains Mono / SF Mono 降级 */
```

颜色直接使用 `#000000` / `#ffffff` / `rgba(0,0,0,0.08)` / `rgba(255,255,255,0.16)`，
与规范 §2.1 令牌速查完全对应，未引入额外品牌色。
