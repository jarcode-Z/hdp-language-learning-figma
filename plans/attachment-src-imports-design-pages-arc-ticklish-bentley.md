# Plan: Import Local ASR — design-pages-arch-2.md 变更实现

## Context

`design-pages-arch-2.md` 相比 v1 做了一次聚焦更新，核心是 **Import 流程新增 Local ASR（本地语音识别生成字幕）**入口，同时补充了 GitHub 代码仓库链接作为 UI 真相源约定。需要将这些变更落实到现有 `src/components/Import.tsx` 中。

---

## v1 → v2 差异分析

### 新增内容

| 位置 | 变更 | 说明 |
|------|------|------|
| 文档头 | 新增 GitHub 仓库链接 | `https://github.com/jarcode-Z/hdp-language-learning-figma` 作为 UI 真相源 |
| §1 文档关系 | 新增 `§1.1 设计产物边界` + `§1.2 实现硬规则` | 明确 Make 仓与正式实现的分工关系 |
| §4.2 Import Frame 清单 | `AttachSubtitle` 步骤描述变更 | 原：仅选 `.srt/.vtt`；新：**并列「生成字幕」（手动 Local ASR）** |
| §4.2 Import Frame 清单 | **新增 Frame `Import / AsrProgress`** | 阶段文案：下载模型 / 转写中；可取消；非营销假进度 |
| §4.2 禁止/允许说明 | ASR 规则细化 | 原：禁止所有 ASR 营销等待页；新：**用户主动点击后允许显示诚实阶段态** |
| §6.1 微文案 | Import 无字幕文案变更 | 原：`添加 .srt 或 .vtt 字幕后即可跟读`；新：`添加 .srt / .vtt，或点击「生成字幕」后即可跟读` |
| §6.1 微文案 | **新增 ASR 进行中文案** | `正在下载模型… / 正在转写…（可取消）` |
| §7 勿设计 | ASR 禁止条件收窄 | 原：禁止所有 ASR 等待页；新：仅禁止**未点击就出现**的营销等待页 |
| §8 交付检查清单 | ASR 检查项更新 | 加入「手动生成仅显示诚实阶段态」 |

### 不变内容

- Library、Practice Desk 所有页面和组件 **无变更**
- 设计令牌、字体、布局硬约束 **无变更**
- 响应式、i18n **无变更**

---

## 需要修改的文件

只需修改一个文件：**`src/components/Import.tsx`**

### 变更 1：`AttachSubtitle` 步骤新增「生成字幕」并列入口

当前步骤 3 只有选择 `.srt/.vtt` 的投放区。需改为两列并排：

```
┌──────────────────────┐  ┌──────────────────────┐
│  上传字幕文件         │  │  生成字幕             │
│  .srt / .vtt         │  │  本地 ASR 识别        │
│  [选择字幕文件]       │  │  [生成字幕]           │
└──────────────────────┘  └──────────────────────┘
```

- 左侧：现有虚线投放区（保留）
- 右侧：新增 Ghost/白底黑边虚线区，点击触发 ASR 流程（进入新 `asr-progress` 步骤）

### 变更 2：新增步骤 `asr-progress`（`Import / AsrProgress`）

在 `STEPS` 数组中插入新步骤，位于 `attach-subtitle` 之后、`progress` 之前：

```
select-video → playable → attach-subtitle → asr-progress（新）→ progress → complete
```

`asr-progress` 页面内容：
- 阶段文案切换：`正在下载模型…` / `正在转写…`（用本地 state mock 两阶段）
- 可取消按钮（返回 `attach-subtitle`）
- 诚实进度：无假进度条彩虹；用 Mono Label + 动态文案表达阶段
- 完成后自动进入 `progress` 步骤

### 变更 3：`progress` 步骤失败态补充 ASR 失败文案

`ReadyProgress` 的失败态目前只有「字幕解析失败」，需新增 ASR 失败示例（通过 `progressState` 扩展为三态：`success | subtitle-failure | asr-failure`）。

### 变更 4：i18n 字符串补充

在 `src/i18n.tsx` 的 `zh` 和 `en` 两套字符串中新增：

| key | zh | en |
|-----|----|----|
| `generateSubtitle` | 生成字幕 | Generate Subtitles |
| `localAsr` | 本地 ASR 识别 | Local ASR |
| `asrDownloadingModel` | 正在下载模型… | Downloading model… |
| `asrTranscribing` | 正在转写… | Transcribing… |
| `asrCancel` | 取消 | Cancel |
| `asrFailure` | ASR 转写失败，请重试或手动上传字幕文件。 | ASR failed. Please retry or upload a subtitle file manually. |
| `step_asrProgress` | ASR 转写 | ASR |

---

## 不需要改动的文件

- `src/App.tsx` — 导航逻辑不变
- `src/components/Library.tsx` — 无变更
- `src/components/PracticeDesk.tsx` — 无变更
- 所有原子组件（`PillButton`、`IconButton` 等）— 无变更

---

## 验证方式

1. 进入 Import 流程 → 步骤 3 `AttachSubtitle` 应看到两列并排入口
2. 点击「生成字幕」→ 进入 `AsrProgress` 页，显示「正在下载模型…」
3. mock 阶段切换到「正在转写…」后点击完成 → 进入 `ReadyProgress`
4. 「取消」按钮 → 回到 `AttachSubtitle`
5. 切换语言至 EN → 所有新文案同步切换
6. `progress` 失败态 → 可切换 ASR 失败 / 字幕解析失败两种文案
