import { track } from '@vercel/analytics';

/**
 * An toàn bọc hàm track từ @vercel/analytics để không làm gián đoạn UI nếu xảy ra lỗi
 */
export function safeTrack(eventName: string, data?: Record<string, any>) {
  try {
    track(eventName, data);
  } catch (err) {
    console.debug('[Analytics Error]:', err);
  }
}

// 1. Nhóm Mục tiêu (Track_Target)
export function trackSelectTarget(level: string, extra?: Record<string, any>) {
  safeTrack('Select_Target', { level, ...extra });
}

// 2. Nhóm Thẩm mỹ & Làm chủ (Track_UI_Custom)
export function trackChangeUI(type: 'theme' | 'font' | 'color' | 'style', value: string, extra?: Record<string, any>) {
  safeTrack('Change_UI', { type, value, ...extra });
}

// Debounce tracker cho màu sắc (tránh spam API khi kéo color picker)
const colorDebounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export function trackColorChangeDebounced(colorType: 'primary' | 'accent', value: string) {
  if (colorDebounceTimers[colorType]) {
    clearTimeout(colorDebounceTimers[colorType]);
  }
  colorDebounceTimers[colorType] = setTimeout(() => {
    safeTrack('Change_UI', { type: 'color', colorType, value });
  }, 600);
}

// 3. Nhóm Tâm lý Trò chơi (Track_Gamification)
export function trackToggleGame(gameName: string, isChecked: boolean, type: 'mini_game' | 'study_mode' = 'mini_game') {
  safeTrack('Toggle_Game', {
    gameName,
    type,
    status: isChecked ? 'enabled' : 'disabled'
  });
}

// 4. Nhóm Chuyển đổi (Track_Conversion)
export function trackExportAction(format: 'copy_prompt' | 'download_txt' | 'download_md' | 'open_simulator' | 'open_aistudio', extra?: Record<string, any>) {
  safeTrack('Export_Action', { format, ...extra });
}
