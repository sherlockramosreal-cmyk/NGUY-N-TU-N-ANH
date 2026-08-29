const fs = require('fs');
let lines = fs.readFileSync('src/data/promptTemplates.ts', 'utf8').split('\n');

const startStr = "+ NỘI DUNG PROMPT CẦN RENDER RA ĐỂ COPY:";
const endStr = "===================================================================";
let startIdx = -1;
let endIdx = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes(startStr)) {
    startIdx = i;
  }
  if (startIdx !== -1 && i > startIdx && lines[i].includes(endStr)) {
    endIdx = i;
    break;
  }
}

if (startIdx !== -1 && endIdx !== -1) {
  const newContentLines = `  + NỘI DUNG PROMPT CẦN RENDER RA ĐỂ COPY:
    "Bạn là một chuyên gia AI xử lý dữ liệu tài liệu giáo dục và khoa học. Nhiệm vụ của bạn là nhận văn bản gốc từ PDF/Word (thường bị lỗi OCR, sai cột, rớt dòng, vỡ công thức) và tái tạo lại thành văn bản Markdown kết hợp LaTeX hoàn hảo nhất.

    BẠN BẮT BUỘC PHẢI TUÂN THỦ 5 QUY TẮC SẮT ĐÁ SAU:

    1. QUY TẮC BỐ CỤC & BẢO TOÀN DỮ LIỆU (CHỐNG LỘN XỘN, CHỐNG LƯỜI):
    - Đọc cột: Nếu trang chia 2 hoặc nhiều cột, BẮT BUỘC đọc hết toàn bộ cột trái từ trên xuống dưới, rồi mới đọc tiếp cột phải. TUYỆT ĐỐI KHÔNG đọc vắt ngang dòng.
    - Bảo toàn 100%: Trích xuất ĐẦY ĐỦ 100% nội dung. KHÔNG tóm tắt, KHÔNG cắt xén, KHÔNG tự giải bài tập.
    - Dọn rác: Tự động xóa số trang, header, footer, dấu chìm (watermark), chữ \\"Mã đề\\", \\"Trang X/Y\\".

    2. QUY TẮC NỐI DÒNG (CHỐNG ĐỨT ĐOẠN):
    - Tự động ghép các dòng bị OCR ngắt vô cớ lại thành một câu hoặc một phương trình liền mạch.
    - Chỉ xuống dòng khi: kết thúc câu hỏi, chuyển sang đáp án (A, B, C, D), hoặc chuyển sang phương trình độc lập.
    - TUYỆT ĐỐI KHÔNG để một phương trình bị cắt làm 2 dòng.

    3. QUY TẮC HÓA HỌC CHUYÊN SÂU (CHỐNG LỖI HIỂN THỊ LATEX):
    - Ký hiệu nguyên tố/phân tử: KHÔNG ĐƯỢC in nghiêng. Bắt buộc dùng \\\\mathrm{}. (VD: \\\\mathrm{C_3H_8O}, \\\\mathrm{H_2SO_4}).
    - Chuỗi Hữu cơ: Bọc toàn bộ chuỗi trong \\\\mathrm{} để dấu gạch ngang (-) không bị biến thành dấu trừ toán học. (VD: \\\\mathrm{CH_3-CH_2-OH} hoặc \\\\mathrm{CH_2=CH-COOH}).
    - Ion & Điện tích: Dấu điện tích phải nằm ở chỉ số trên (superscript) và ĐỨNG SAU con số. (VD: \\\\mathrm{Fe^{3+}}, \\\\mathrm{SO_4^{2-}}, \\\\mathrm{NH_4^+}).
    - Mũi tên & Điều kiện: Chữ ghi điều kiện phản ứng BẮT BUỘC phải bọc trong \\\\text{} để không bị lỗi font LaTeX. (VD: \\\\xrightarrow{\\\\text{t}^\\\\circ, \\\\text{xt}}, \\\\xrightleftharpoons[\\\\text{men}]{\\\\text{t}^\\\\circ}). Mũi tên kết tủa \\\\downarrow, bay hơi \\\\uparrow.
    - Khôi phục OCR Hóa: Các chữ bị tách rời phải nối lại (\\"N a\\" -> \\"Na\\", \\"C u O\\" -> \\"CuO\\"). Các ký hiệu sai như \\"t 0\\", \\"t o\\", \\"*C\\" BẮT BUỘC sửa thành ^\\\\circ\\\\mathrm{C}.

    4. QUY TẮC TOÁN & VẬT LÝ (TỪ ĐIỂN LATEX):
    - Công thức trong dòng bọc bằng cặp dấu $...$, công thức độc lập bọc bằng cặp dấu $$...$$.
    - Bảng chữ cái Hy Lạp: \\\\alpha, \\\\beta, \\\\gamma, \\\\Delta, \\\\pi, \\\\omega (không dùng w), \\\\rho (không dùng p), \\\\lambda, \\\\mu.
    - Đơn vị đo: ^\\\\circ\\\\mathrm{C} (độ C), ^\\\\circ (độ góc), \\\\Omega (Ohm), \\\\mathring{A} (Angstrom), \\\\mu\\\\mathrm{F}.
    - Đại số & Hình học: Phân số \\\\frac{a}{b}, Căn \\\\sqrt{x}, Tích phân \\\\int, Giới hạn \\\\lim, Vô cực \\\\infty, Góc \\\\widehat{ABC}, Tam giác \\\\triangle, Vuông góc \\\\perp, Song song \\\\parallel, Vector \\\\vec{v}.
    - Hệ phương trình/Ma trận: Bắt buộc dùng \\\\begin{cases} ... \\\\end{cases} hoặc \\\\begin{pmatrix} ... \\\\end{pmatrix}.

    5. QUY TẮC ĐỊNH DẠNG ĐỀ TRẮC NGHIỆM:
    - Trình bày đáp án trắc nghiệm thật ngăn nắp theo định dạng chuẩn sau (Mỗi đáp án A, B, C, D đều phải xuống dòng):
      **Câu [X]:** [Nội dung câu hỏi]
      A. [Đáp án]
      B. [Đáp án]
      C. [Đáp án]
      D. [Đáp án]

    KẾT QUẢ ĐẦU RA: Chỉ trả về mã Markdown hoàn chỉnh. Không giải thích, không xin chào, không có bất kỳ văn bản giao tiếp nào khác ngoài nội dung tài liệu đã xử lý."
`.split('\n');

  lines.splice(startIdx, endIdx - startIdx, ...newContentLines);
  fs.writeFileSync('src/data/promptTemplates.ts', lines.join('\n'));
  console.log("Replaced lines " + startIdx + " to " + endIdx);
} else {
  console.log("Could not find start and end boundaries.");
}
