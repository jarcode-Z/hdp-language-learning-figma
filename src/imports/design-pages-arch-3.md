# Figma 设计指导 — 页面架构与出图规范

> 需求真相源：[../requirements/prd-mvp.md](../requirements/prd-mvp.md)  
> 视觉令牌与组件语汇：[DESIGN.md](./DESIGN.md)  
> Figma Make 导出代码：[hdp-language-learning-figma](https://github.com/jarcode-Z/hdp-language-learning-figma)  
> 产品：HDP Language Learning（Tauri 桌面练习工具）

本文告诉设计师 / 设计 Agent：**要画哪些 Frame、布局硬约束是什么、如何映射 DESIGN.md**。不要把营销站 Hero 渐变铺满整个 App。

### 修订日志

| 日期 | 摘要 |
|------|------|
| 2026-07-26 | **已发布字幕重新编辑 Frame**：仅 local 且已有正式 Cue 的材料在 Library 行显示铅笔 IconButton；修订草稿存在时旧字幕仍可练习，行内显示「有未发布字幕修改」。新增修订编辑、无变化禁用与放弃确认态，作为 Figma Make 下一轮更新输入；正式 UI 实现须等待 Make 同步并重新对照。 |
| 2026-07-26 | **字幕校对确认 Frame**：Import 新增 `SubtitleReview`，Library 新增待确认恢复态。Make 当前无校对编辑器或待确认控件；复用 `Import.tsx` 向导、`TranscriptPanel.tsx` / `TranscriptLine.tsx` 单列高亮语法与 `Library.tsx` 行操作，标记「figma 待补」。 |
| 2026-07-26 | **本机词汇笔记 Frame**：新增 Desk 词条卡、当前视频词汇面板与统一 Vocabulary Review。Make 授权尚未可用，三个新增 Frame 标为「figma 待补」；实现前必须完成 Make 路径对照并把结论写入实施票。 |
| 2026-07-26 | **Practice Desk Phase 0 对照同步**：保留 Make `TranscriptPanel` / `TranscriptLine` 的全文列表、当前句左侧指示条、自动居中与黑白层级；按用户实测反馈增加右栏留白、行距和 Cue 间距，形成宽松剧本式阅读。Cue 点击仅定位句首并自然连续播放，不再单句自动回跳。 |
| 2026-07-19 | **三道硬门禁**：票面必含 Figma 块；`/implement` 先写对照结论；`/code-review` Spec 缺结论即 fail（issue-tracker Hard gates）。 |
| 2026-07-19 | **Library 删除入口**：我的材料行删除为次要**垃圾桶 IconButton**（非文字 Pill）；确认态仍为文案按钮。 |
| 2026-07-19 | **Import Local ASR UI**：`AttachSubtitle` 增加并列「生成字幕」；新增 Frame `Import / AsrProgress`（下载模型 / 转写中 + 可取消）；禁止未点击的 ASR 营销等待页；微文案与交付清单同步。详见 PRD I-7–I-8 / ADR-008。 |
| 2026-07-19 | **Library 删除 + Desk 空格**：`Library / Populated` 我的材料行含删除；新增 `Library / DeleteConfirm`；精选区无删除。Desk 交互说明：空格播放/暂停（PRD L-7、P-8）。 |

---

## 1. 文档关系

| 文档 / 产物 | 用途 |
|-------------|------|
| `prd-mvp.md` | 做什么、不做什么、状态机、验收 |
| `DESIGN.md` | 颜色、字体、按钮、圆角、焦点态 |
| **本文** | 画哪些页面变体、Practice Desk 结构、组件落点、标注规则 |
| [hdp-language-learning-figma](https://github.com/jarcode-Z/hdp-language-learning-figma) | Figma Make 已生成的页面 UI 代码（视觉参考 / 可移植组件来源） |

出图顺序建议：先 Practice Desk 核心态 → Import 就绪态 → Library 列表态。

### 1.1 设计产物边界

| 类型 | 位置 | 说明 |
|------|------|------|
| Frame 清单与硬约束 | 本文 | 需求侧：要交付哪些态、布局不可破 |
| 视觉令牌 | [DESIGN.md](./DESIGN.md) | 黑白铬、Pill、字重等 |
| Figma Make 导出代码 | https://github.com/jarcode-Z/hdp-language-learning-figma | **UI 参考与组件来源**，不是运行中的 Tauri 应用 |
| 正式桌面实现 | 架构约定的 `app/desktop` | 行为按 PRD 验收；像素与组件可从 Make 仓迁移 / 对齐 |

Make 仓与本文冲突时：**行为与信息架构以 PRD + 本文为准**；视觉细节以 Make 仓最新导出为准，并回写本文若 Frame/硬约束有变更。

当已确认的产品行为尚未进入 Make 时，本文可先作为下一轮 Figma Make 的设计输入，并明确标记 **figma 待补**；可见 UI 代码必须等 Make 同步后重新对照，不能直接依据本文散文实现。

### 1.2 实现硬规则（页面任务）

**凡交付可见页面（Library / Import / Practice Desk 及其中变体）的实现任务，必须以 [hdp-language-learning-figma](https://github.com/jarcode-Z/hdp-language-learning-figma) 为 UI 真相源。**

| 要求 | 说明 |
|------|------|
| 必须 | 实现前读取 Make 仓对应页面/组件源码，迁移布局、样式与组件结构到 `app/desktop` |
| 必须 | **变更触及本目录（`app/docs/ui-design/`）时**：先对照 Make/Figma，写出对照结论，再写可见 UI（见 `.cursor/rules/ui-figma-when-ui-design-docs-change.mdc`） |
| 必须 | **可见页任务正文**须含 `UI source` / Make paths / `figma-make` 与对照·同步 checklist（见 `docs/agents/issue-tracker.md`）；`/to-tickets` 不得省略 |
| 样式栈 | 正式实现用 **Tailwind CSS**；可复用控件优先 **shadcn/ui**（按需），主题对齐 DESIGN.md——见 [tech-architecture.md §8.0.1](../architecture/tech-architecture.md) |
| 禁止 | 仅按文字描述或本文 Frame 表从零 invent 整页视觉（可先做无 UI 的 API/脚手架 issue） |
| 允许 | 工程底座、纯 API、与页面无关的领域逻辑不依赖 Make 仓 |
| 落点 | 正式代码在本仓 `app/desktop`；接 FastAPI；**不要**把 Make 仓整仓替换成唯一运行时 |

验收页面类 issue 时：对照 Make 仓对应屏 + 本文 Frame 清单 + PRD 行为。

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
| `Library / Populated` | 有精选 + 导入 | 列表项：标题、时长、ReadyState badge；区分 builtin / local；**仅我的材料行**有次要删除（垃圾桶 IconButton，非文字） | L-1, L-2, L-7 |
| `Library / DeleteConfirm` | 删除确认 | 说明将移除本地媒体与进度；确认 / 取消；黑白，非彩色警告炫技 | L-7 |
| `Library / WithStats` | 有使用数据 | 顶栏：继续练习、今日句数、时长、连击 | L-3, L-4 |
| `Library / PendingSubtitleReview` | local 材料有未确认草稿 | ReadyState 保持 `PLAYABLE`；显示「字幕待确认」与「继续校对」，不得显示可开始练习的 CTA。**figma 待补** | L-8 |
| `Library / SubtitleRevision` | local `readable` / `shadowable` 材料可修订正式字幕 | ReadyState badge 与垃圾桶之间显示铅笔 IconButton；主练习 CTA 保持不变。builtin、`playable` 或无正式 Cue 的材料不显示铅笔。**figma 待补** | 待补 L-9 |
| `Library / SubtitleRevisionPending` | 已发布字幕有未发布修订 | 保留原 ReadyState 与「练习 / 继续练习」；副信息显示「有未发布字幕修改」；铅笔 IconButton 进入继续编辑，不使用长文本编辑按钮。**figma 待补** | 待补 L-9 |

**列表项组件要点：**

- 左侧小缩略图（可来自视频首帧，允许彩色）  
- 标题黑字；副信息用 weight 320–330  
- ReadyState 用 Mono 小标签：`PLAYABLE` / `READABLE` / `SHADOWABLE`  
- 整行可点；主按钮用 Black Pill「练习」或「继续」
- local 且已有正式 Cue 时，ReadyState 与垃圾桶之间增加次要**铅笔 IconButton**；`title` / `aria-label` 为「编辑字幕」
- 铅笔与垃圾桶使用同一 Glass Dark、`sm` 圆形规格；图标顺序固定为 `ReadyState → 编辑 → 删除 → 练习`
- 首次导入待确认与已发布字幕修订不得混淆：前者禁止练习，后者始终保留旧字幕练习入口

### 4.2 Import

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `Import / SelectVideo` | 步骤 1 | 选择本地视频；虚线/轻框投放区；黑 Pill「选择文件」 | I-1 |
| `Import / Playable` | 步骤 2 | 已 `playable`；可小预览；提示「下一步添加字幕」 | I-2, §7 |
| `Import / AttachSubtitle` | 步骤 3 | 选择 `.srt` / `.vtt`；并列「生成字幕」（手动 Local ASR）；格式说明 | I-3, I-7 |
| `Import / AsrProgress` | ASR 进行中 | 阶段文案：下载模型 / 转写中；可取消；非营销假进度 | I-8, I-9 |
| `Import / SubtitleReview` | 候选字幕待确认 | 左视频、右候选 Cue 单列；播放高亮、点击跳转、英文 textarea 原位编辑；保存态、原文对比、单条/全部恢复与「确认字幕并完成导入」。**figma 待补** | I-11–I-15 |
| `Import / ReadyProgress` | 进度 | 三级就绪可视化（见下）；失败态示例（字幕解析失败 / ASR 失败） | I-4, I-5 |
| `Import / Complete` | 完成 | CTA「开始练习」→ Practice Desk；次要「返回库」 | I-6 |

**三级就绪可视化（必须画出）：**

```
[●] playable  —— 媒体就绪
[●] readable  —— 字幕 / Cue 就绪
[○] shadowable —— 时间轴可跟读（未完成时为空心）
```

用黑白即可；当前步可用 Black Pill 或加粗 Mono Label，**不要用彩色进度条彩虹**。

**禁止：**未点击就出现的「AI 正在生成字幕…」营销等待页；静默自动转写。  
**允许：**用户点击「生成字幕」后的诚实阶段状态（下载模型 / 转写中）+ 取消（PRD I-7–I-8 / ADR-008）。

#### 2026-07-26 Make 对照结论：字幕校对

- **检查路径：** `src/components/Import.tsx`、`Library.tsx`、`TranscriptPanel.tsx`、`TranscriptLine.tsx`。
- **Make 现状：** Import 已有黑白向导、外挂/ASR 并列入口和完成 CTA，但无候选字幕编辑/确认步骤；Library 有 Material 行、ReadyState badge 与行尾操作，但无「字幕待确认」态；Transcript 组件已有单列全文、当前句左侧指示条、点击定位与安全区自动居中。
- **复用结论：** 校对页沿用 Import 顶栏/步骤指示与 Transcript 单列高亮语法，编辑态在当前行原位展开；Library 待确认入口沿用 Material 行和行尾次操作。新增控件均标记 **figma 待补**，不引入新颜色、卡片墙或与 Make 冲突的导航。

#### 已发布字幕修订（文档先行，供 Figma Make 更新）

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `SubtitleRevision / Editing` | 从 Library 编辑已有正式字幕 | 沿用 Subtitle Review 的左视频 / 右 Cue 双栏；页头返回 Library；仅英文 textarea 可编辑，时间轴与译文只读；自动保存、单条/全部恢复；主 CTA「发布字幕修改」，次操作「放弃修改」。**figma 待补** | 待补 L-9 |
| `SubtitleRevision / UnpublishedChanges` | 已有自动保存修改 | 明确显示「有未发布字幕修改」和每 Cue saving / saved / error；旧正式字幕仍用于 Practice，不出现阻断练习的提示。**figma 待补** | 待补 L-9 |
| `SubtitleRevision / NoChanges` | 草稿与当前正式字幕一致 | 「发布字幕修改」禁用；保留返回 Library 与放弃草稿操作，不制造成功假象。**figma 待补** | 待补 L-9 |
| `SubtitleRevision / DiscardConfirm` | 用户放弃全部未发布修改 | 黑白确认层；说明只删除未发布修改，不影响当前正式字幕、练习进度、收藏或录音；确认 / 取消。**figma 待补** | 待补 L-9 |

**修订交互硬约束：**

- 入口只来自 Library 铅笔 IconButton；不在 Practice Desk 增加编辑入口
- 仅 local 且已有正式 Cue 的 `readable` / `shadowable` Material 可进入；builtin 与 `playable` 不显示入口
- 编辑基线为本次进入时的最新正式英文 Cue；「恢复原文 / 全部恢复」回到该基线
- 修订期间旧正式字幕与 ReadyState 保持可用；发布成功后返回 Library
- 不提供时间轴、译文、Cue 拆分/合并、重新上传字幕或重新运行 ASR
- 不提供字幕版本历史；下一次编辑以最新已发布字幕为新基线
- 窄窗沿用 Subtitle Review 降级：视频在上、Cue 编辑列表在下

#### Figma Make 更新要求：字幕修订

- **文档输入路径：** 本节、`Library / SubtitleRevision`、`Library / SubtitleRevisionPending` 与组件清单。
- **Make 目标路径：** `src/components/Library.tsx`、`TranscriptPanel.tsx`、`TranscriptLine.tsx`，以及新增或复用的 Subtitle Review 页面组件。
- **必须同步：** Material 行铅笔 IconButton 插槽、未发布修改副文案、修订编辑页、无变化禁用态、放弃确认层。
- **实现门禁：** Make 更新完成后，实施票必须回写最新路径与对照结论，再开始 `app/desktop` 可见 UI；当前全部标记 **figma 待补**。

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
| `Desk / WordDetail` | 点词查义 | 锚定 Transcript 单词的轻量 Popover：词形、词性、中文释义、例句/译文、总收藏次数；显式「收藏」；pending 仅显示待补充与来源 Cue。查看不触发 Cue 播放。**figma 待补** | V-1, V-2 |
| `Desk / MaterialVocabulary` | 当前视频词汇 | 从 Desk 打开的轻层面板/抽屉；按词条聚合，显示本视频次数、释义状态、例句与回到 occurrence Cue；提供「查看全部」。**figma 待补** | V-3, V-4 |
| `Desk / PlayableOnly` | 能力降级 | 右栏空或占位；跟读/单句控件禁用 + 说明「添加字幕后可跟读」 | §7 |
| `Desk / ReadableOnly` | 能力降级 | 右栏可读可点；单句跟读弱化或警告「时间轴未就绪」 | §7 |

**键盘（便签即可，不必单独 Frame）：** Practice Desk 有视频时，空格切换播放/暂停；输入焦点在文本字段时不拦截；对照「我的声音」时不抢空格（P-8）。

#### Shadow Loop 原型连线（Figma Prototype）

在 `Desk / Default` 上连线说明主路径：

1. 听原句 →（可选）录音中 → 对照回放 → 再来 **或** 下一句；点击 Cue /「听」/「再来」从句首开始后自然连续播放，不在句尾自动回跳
2. 下一句后速度保持用户所选；**新材料首句默认 0.85**（可用便签注明）

#### 2026-07-26 Make 对照结论：宽松剧本式 Transcript

- **UI source：** `hdp-language-learning-figma/src/components/PracticeDesk.tsx`、`TranscriptPanel.tsx`、`TranscriptLine.tsx`（commit `3d43602`）。
- **Make 已有结构：** 右栏为单列全文 Cue；18px 正文；当前句使用较高字重与左侧 2px 指示条；超出 80px 安全区时平滑滚动到中部。
- **本轮同步结论：** 不改变双栏、单列 Cue、黑白层级、左指示条与自动居中的视觉语法；根据真实使用反馈，扩大右栏横向 padding、正文 line-height、Cue 垂直间距及当前句前后留白。禁止改成独立卡片墙，避免信息更加拥挤。
- **交互差异来源：** 取消句尾自动回跳是 PRD 行为修订，不是视觉偏离；Make 组件本身未定义循环行为。

#### 2026-07-26 Make 对照待补：词汇笔记

- **授权状态：** 本次文档更新时 Figma Make MCP 尚未完成授权，不能声明现有 Make 是否已有 `WordDetail`、`MaterialVocabulary` 或全局词汇页面。
- **实施硬门：** 进入可见 UI 实现前，必须检查 `PracticeDesk.tsx`、`TranscriptLine.tsx`、`BookmarksPanel.tsx` 与 `Library.tsx` 的 Make 路径，并将「现有控件 / 借用模式 / figma 待补」写入对应 issue 的 `## Comments`。
- **临时复用目标：** 若 Make 缺 Frame，词条卡借用 `Panel / Bookmarks` 的白底轻层与 `Transcript / Line` 的排版，词汇列表借用 `ListRow / Material`；不得据本文文字独自发明新页面语汇。

---

### 4.4 Vocabulary Review

| Frame | 状态 | 必须表现 | PRD |
|-------|------|----------|-----|
| `Vocabulary / Review` | 有已收藏词条 | 轻量列表：词形、释义状态、总收藏次数、最近收藏时间、例句；支持最近收藏/次数/字母排序与 curated/pending 过滤。入口来自 Library。**figma 待补** | V-5 |
| `Vocabulary / Detail` | 查看一个词条 | 显示释义/例句与全部 Material/Cue occurrence 上下文；每条上下文可返回对应练习位置。**figma 待补** | V-5 |
| `Vocabulary / Empty` | 尚未收藏 | 说明可从 Transcript 点击英文词并显式收藏；提供返回 Library 的轻量操作。**figma 待补** | V-1, V-5 |

坚持黑白列表/面板语法，不做词汇闪卡墙或间隔重复仪表盘；首期是回顾，不引入算法化学习计划。

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
| `ListRow / Material` | 缩略图 + 标题 + badge + 次要 IconButton + CTA；local 正式字幕态顺序为 `ReadyState → 编辑 → 删除 → 练习` | Library |
| `Button / EditSubtitle Icon` | Glass Dark、`sm` 圆形铅笔；含 tooltip / aria-label「编辑字幕」 | Library local 正式字幕 |
| `Transcript / Line Default` | 18–20px weight 330 | 右栏 |
| `Transcript / Line Active` | weight 540–700 + 左指示条 | 当前 Cue |
| `Transcript / Line Done` | 略降对比或前缀轻标记 | 已练过（可选） |
| `Transcript / Draft Edit` | Active 行语法 + 原位 textarea、保存态、恢复次操作 | 字幕校对；**figma 待补** |
| `Dialog / DiscardSubtitleRevision` | 白底黑字轻层；取消 / 放弃修改；清楚说明正式字幕不受影响 | 字幕修订；**figma 待补** |
| `Bar / PracticeControls` | 底栏整组 | Desk 复用 |
| `Panel / Bookmarks` | 8px radius 白底轻阴影 | 收藏 |
| `Panel / WordDetail` | 锚定文本的白底轻层、8px radius、关闭 IconButton、显式收藏 Pill | **figma 待补** |
| `ListRow / Vocabulary` | 词形 + 释义状态/例句 + 次数/最近收藏；不做卡片墙 | **figma 待补** |

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
| Library 删除 | 次要垃圾桶 icon → 确认「将移除本地媒体与进度」/ 取消 |
| Library 字幕编辑 | 铅笔 icon（tooltip / aria-label「编辑字幕」）/ 有未发布字幕修改 |
| Import 无字幕 | 添加 .srt / .vtt，或点击「生成字幕」后即可跟读 |
| Import ASR 进行中 | 正在下载模型… / 正在转写…（可取消） |
| Import 字幕校对 | 字幕待确认 / 正在保存… / 已保存 / 保存失败，重试 / 恢复原文 / 全部恢复 / 确认字幕并完成导入 |
| 已发布字幕修订 | 编辑字幕 / 有未发布字幕修改 / 发布字幕修改 / 放弃修改 / 恢复原文 / 全部恢复 |
| 放弃字幕修改确认 | 放弃全部修改？/ 将删除所有未发布修改，当前正式字幕和练习记录不会受影响 / 取消 / 放弃修改 |
| Desk 录音可选 | 录音（可选） |
| 对照 | 原音 / 我的声音 |
| 速度区 Label | SPEED |
| 右栏 Label | TRANSCRIPT |
| 词条卡 | 收藏 / 已收藏 / 待补充释义 / 来自当前句 |
| 当前视频词汇 | 当前视频词汇 / 查看全部 / 出现于第 {n} 句 |

---

## 7. 明确勿设计

| 勿出现 | 原因 |
|--------|------|
| 发音分数环、星级、音素热力图 | ADR-001 |
| 强制「必须录音才能下一句」 | PRD 非范围 |
| 原音/用户波形打分对比 | MVP 不做 |
| 独立「精读」Tab/页面 | 合并进右栏点句/点词 |
| Segment 多句练习集管理 | ADR-002 |
| 未点击就出现的 ASR「智能生成字幕」营销等待页 | ADR-005 / ADR-008 |
| 登录墙、头像账号体系 | ADR-006 |
| 全屏词典大弹窗 / 联网查词 | 词条卡必须轻量、锚定 Transcript；释义仅来自本机 provider/精选种子 |
| Library 行使用「编辑字幕」长文本按钮 | 编辑是次要行操作，必须使用铅笔 IconButton；主 Pill 保留给练习 |
| builtin 或无正式 Cue 的 local 材料显示字幕编辑入口 | 修订只适用于已有正式字幕的自定义上传视频 |
| 修订期间用草稿替换 Practice 正式字幕 | 未发布修改不得影响当前练习；必须明确发布后才生效 |
| 界面铬使用紫/粉/多色渐变 | 彩色只留给视频 |
| 完整 iOS/Android 套件 | 桌面优先 |

---

## 8. 交付检查清单（设计侧）

- [ ] 主画板 1440×900，三页均有关键态  
- [ ] Practice Desk 左视频 / 右全文 / 底控制条硬布局未被打破  
- [ ] 速度四档 Pill，默认态能看出 0.85  
- [ ] ReadyState 三态在 Library、Import、Desk 均有表达  
- [ ] `Import / SubtitleReview` 与 `Library / PendingSubtitleReview` 已与 Make 同步；未同步时明确标记「figma 待补」
- [ ] `Library / SubtitleRevision` 使用铅笔 IconButton 而非长文本按钮，位置为 ReadyState 与删除之间
- [ ] `Library / SubtitleRevisionPending` 保留练习 CTA，并显示「有未发布字幕修改」
- [ ] `SubtitleRevision / Editing`、`NoChanges`、`DiscardConfirm` 已与 Make 同步；未同步时明确标记「figma 待补」
- [ ] Shadow Loop 有原型或分镜连线  
- [ ] Components 页含 Primary Pill、Icon Circle、Transcript 行态、ReadyState badge  
- [ ] 界面铬为黑白；无评分、无登录、无静默 ASR 营销等待页；手动生成仅显示诚实阶段态  
- [ ] 每个关键 Frame 标注了 PRD 章节  
- [ ] `Desk / WordDetail`、`Desk / MaterialVocabulary`、`Vocabulary / Review` 与 Make 已同步；未同步时明确标记「figma 待补」

---

## 9. 信息架构速览

```
Library ──► Practice Desk
   │              ▲
   └──► Import ──► Subtitle Review ───┘
   │
   ├──► Subtitle Revision ──► Library
   │        └── 旧正式字幕仍供 Practice Desk 使用
   │
   └──► Vocabulary Review
```

详情与业务规则以 [prd-mvp.md](../requirements/prd-mvp.md) §5–§8 为准。
