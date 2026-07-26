import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "zh" | "en";

export const strings = {
  zh: {
    appName: "HDP Language Learning",
    // Library
    curatedMaterials: "精选材料",
    myMaterials: "我的材料",
    importMaterial: "导入材料",
    practice: "练习",
    resume: "继续",
    noMaterialHint: "还没有导入材料。导入本地视频和字幕后即可开始跟读练习。",
    todaySentences: "今日句数",
    practiceTime: "练习时长",
    streak: "连击",
    // Import
    importTitle: "导入材料",
    backToLibrary: "LIBRARY",
    step_selectVideo: "选择视频",
    step_playable: "视频就绪",
    step_attachSubtitle: "添加字幕",
    step_progress: "处理中",
    step_complete: "完成",
    selectVideoTitle: "选择视频文件",
    selectVideoHint: "支持 MP4、MOV、MKV 等常见格式",
    dropOrSelect: "拖放文件，或",
    selectFile: "选择文件",
    videoReadyTitle: "视频已就绪",
    videoReadyHint: "添加字幕后可开始跟读练习",
    nextAttachSubtitle: "下一步：添加字幕",
    skipPractice: "跳过，直接练习",
    attachSubtitleTitle: "添加字幕文件",
    attachSubtitleHint: "支持 .srt 和 .vtt 格式",
    selectSubtitleFile: "选择字幕文件",
    generateSubtitle: "生成字幕",
    localAsr: "本地 ASR 识别",
    step_asrProgress: "ASR 转写",
    asrDownloadingModel: "正在下载模型…",
    asrTranscribing: "正在转写…",
    asrCancel: "取消",
    asrFailure: "ASR 转写失败，请重试或手动上传字幕文件。",
    processingTitle: "处理中",
    processingFailure: "字幕解析失败：文件编码不受支持，请转换为 UTF-8 后重试。",
    viewResult: "查看结果",
    retry: "重新尝试",
    completeTitle: "导入完成",
    completeHint: "材料已就绪，可以开始跟读练习",
    startPractice: "开始练习",
    backToLib: "返回库",
    // Practice Desk
    listen: "听原句",
    record: "录音（可选）",
    stopRecord: "停止录音",
    recording: "录音中",
    original: "原音",
    myVoice: "我的声音",
    myVoiceMobile: "我的",
    again: "再来",
    next: "下一句",
    speed: "SPEED",
    transcript: "TRANSCRIPT",
    addSubtitleHint: "添加字幕后可跟读",
    timelineNotReady: "时间轴未就绪",
    // ReadyState
    playable: "PLAYABLE",
    readable: "READABLE",
    shadowable: "SHADOWABLE",
    // TopBar
    backLib: "← 返回库",
    // state labels
    state: "STATE",
    stateDefault: "Default",
    stateCueHighlight: "Cue Highlight",
    stateSpeed: "Speed",
    stateRecording: "Recording",
    stateCompare: "Compare",
    statePlayableOnly: "Playable Only",
    stateReadableOnly: "Readable Only",
    // Library actions
    editSubtitle: "编辑字幕",
    deleteItem: "删除",
    deleteConfirmTitle: "删除材料",
    deleteConfirmBody: "确认删除吗？此操作无法撤销。",
    deleteConfirmAction: "删除",
    cancelAction: "取消",
    // simulate
    simulate: "模拟",
  },
  en: {
    appName: "HDP Language Learning",
    // Library
    curatedMaterials: "Curated",
    myMaterials: "My Materials",
    importMaterial: "Import",
    practice: "Practice",
    resume: "Resume",
    noMaterialHint: "No materials yet. Import a local video with subtitles to start shadowing.",
    todaySentences: "Today",
    practiceTime: "Time",
    streak: "Streak",
    // Import
    importTitle: "Import Material",
    backToLibrary: "LIBRARY",
    step_selectVideo: "Select Video",
    step_playable: "Playable",
    step_attachSubtitle: "Add Subtitle",
    step_progress: "Processing",
    step_complete: "Done",
    selectVideoTitle: "Select a Video File",
    selectVideoHint: "Supports MP4, MOV, MKV and more",
    dropOrSelect: "Drop a file, or",
    selectFile: "Select File",
    videoReadyTitle: "Video Ready",
    videoReadyHint: "Add subtitles to enable shadowing",
    nextAttachSubtitle: "Next: Add Subtitle",
    skipPractice: "Skip, start practice",
    attachSubtitleTitle: "Add Subtitle File",
    attachSubtitleHint: "Supports .srt and .vtt",
    selectSubtitleFile: "Select Subtitle File",
    generateSubtitle: "Generate Subtitles",
    localAsr: "Local ASR",
    step_asrProgress: "ASR",
    asrDownloadingModel: "Downloading model…",
    asrTranscribing: "Transcribing…",
    asrCancel: "Cancel",
    asrFailure: "ASR failed. Please retry or upload a subtitle file manually.",
    processingTitle: "Processing",
    processingFailure: "Subtitle parse failed: unsupported encoding. Please convert to UTF-8 and retry.",
    viewResult: "View Result",
    retry: "Retry",
    completeTitle: "Import Complete",
    completeHint: "Material is ready. Start your shadowing practice.",
    startPractice: "Start Practice",
    backToLib: "Back to Library",
    // Practice Desk
    listen: "Listen",
    record: "Record (optional)",
    stopRecord: "Stop",
    recording: "REC",
    original: "Original",
    myVoice: "My Voice",
    myVoiceMobile: "Mine",
    again: "Again",
    next: "Next",
    speed: "SPEED",
    transcript: "TRANSCRIPT",
    addSubtitleHint: "Add subtitles to enable shadowing",
    timelineNotReady: "Timeline not ready",
    // ReadyState
    playable: "PLAYABLE",
    readable: "READABLE",
    shadowable: "SHADOWABLE",
    // TopBar
    backLib: "← Library",
    // state labels
    state: "STATE",
    stateDefault: "Default",
    stateCueHighlight: "Cue Highlight",
    stateSpeed: "Speed",
    stateRecording: "Recording",
    stateCompare: "Compare",
    statePlayableOnly: "Playable Only",
    stateReadableOnly: "Readable Only",
    // Library actions
    editSubtitle: "Edit Subtitle",
    deleteItem: "Delete",
    deleteConfirmTitle: "Delete Material",
    deleteConfirmBody: "Are you sure? This action cannot be undone.",
    deleteConfirmAction: "Delete",
    cancelAction: "Cancel",
    // simulate
    simulate: "Simulate",
  },
} as const;

export type Strings = typeof strings[Lang];

interface I18nContextValue {
  lang: Lang;
  t: Strings;
  setLang: (l: Lang) => void;
}

const I18nContext = createContext<I18nContextValue>({
  lang: "zh",
  t: strings.zh,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");
  return (
    <I18nContext.Provider value={{ lang, t: strings[lang], setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
