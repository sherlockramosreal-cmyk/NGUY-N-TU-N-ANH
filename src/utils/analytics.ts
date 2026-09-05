import ReactGA from 'react-ga4';

export const GA_MEASUREMENT_ID = 'G-4YKWJZ9G6Q';

let isInitialized = false;

/**
 * Khởi tạo Google Analytics 4 và tự động gửi sự kiện Pageview ban đầu
 */
export function initGA() {
  if (typeof window === 'undefined' || isInitialized) return;
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    isInitialized = true;
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname + window.location.search,
      title: document.title || 'EngiPrompt Studio'
    });
  } catch (err) {
    console.debug('[GA4 Init Error]:', err);
  }
}

/**
 * An toàn bọc hàm ReactGA.event để không bao giờ làm gián đoạn UI nếu xảy ra lỗi
 */
export function safeTrackGA(eventData: {
  category: string;
  action: string;
  label?: string;
  value?: number;
  [key: string]: any;
}) {
  try {
    if (!isInitialized) {
      initGA();
    }
    ReactGA.event(eventData);
  } catch (err) {
    console.debug('[GA4 Event Error]:', err);
  }
}

// 1. Nhóm Mục tiêu (Track_Target)
export function trackSelectTarget(levelOrTarget: string, extra?: { type?: string; status?: string; label?: string }) {
  safeTrackGA({
    category: 'Track_Target',
    action: 'Select_Target',
    label: extra?.label ? `${extra.label} (${levelOrTarget})` : levelOrTarget,
    target_type: extra?.type || 'grade_or_exam',
    target_status: extra?.status || 'selected'
  });
}

// 2. Nhóm Thẩm mỹ & Làm chủ (Track_UI_Custom)
export function trackChangeUI(type: 'theme' | 'font' | 'color' | 'style', value: string, extra?: Record<string, any>) {
  let action = 'Change_Theme';
  if (type === 'font') action = 'Change_Font';
  else if (type === 'color') action = 'Change_Color';
  else if (type === 'style') action = 'Change_Style';

  safeTrackGA({
    category: 'Track_UI_Custom',
    action,
    label: value,
    ui_type: type,
    ...extra
  });
}

// Debounce tracker cho màu sắc (tránh spam API khi kéo color picker)
const colorDebounceTimers: Record<string, ReturnType<typeof setTimeout>> = {};

export function trackColorChangeDebounced(colorType: 'primary' | 'accent', value: string) {
  if (colorDebounceTimers[colorType]) {
    clearTimeout(colorDebounceTimers[colorType]);
  }
  colorDebounceTimers[colorType] = setTimeout(() => {
    safeTrackGA({
      category: 'Track_UI_Custom',
      action: 'Change_Color',
      label: `${colorType}: ${value}`,
      color_type: colorType,
      color_hex: value
    });
  }, 600);
}

// 3. Nhóm Tâm lý Trò chơi (Track_Gamification)
export function trackToggleGame(gameName: string, isChecked: boolean, type: 'mini_game' | 'study_mode' = 'mini_game') {
  safeTrackGA({
    category: 'Track_Gamification',
    action: 'Toggle_Game',
    label: gameName,
    value: isChecked ? 1 : 0,
    game_type: type,
    status: isChecked ? 'enabled' : 'disabled'
  });
}

// 4. Nhóm Chuyển đổi (Track_Conversion)
export function trackExportAction(format: 'copy_prompt' | 'download_txt' | 'download_md' | 'open_simulator' | 'open_aistudio', extra?: Record<string, any>) {
  safeTrackGA({
    category: 'Track_Conversion',
    action: 'Export_Action',
    label: format,
    ...extra
  });
}

// 5. Nhóm Trải nghiệm & Hướng dẫn (Track_Onboarding)
export function trackTourAction(
  action: 'start_tour' | 'complete_tour' | 'skip_tour' | 'step_view' | 'step_next' | 'open_youtube',
  label?: string
) {
  safeTrackGA({
    category: 'Track_Onboarding',
    action,
    label: label || action
  });
}

// 6. Nhóm Video Hướng dẫn (Track_Video_Tutorial)
export function trackVideoAction(action: 'open_video_modal' | 'click_youtube_link', extra?: Record<string, any>) {
  safeTrackGA({
    category: 'Track_Video_Tutorial',
    action,
    label: 'https://youtu.be/cfU-Ez0-Nec?si=UXpFTHvfWw70dpWD',
    ...extra
  });
}
