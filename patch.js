const fs = require('fs');
let content = fs.readFileSync('src/data/promptTemplates.ts', 'utf8');

const targetContent = `  + NỘI DUNG PROMPT CẦN RENDER RA ĐỂ COPY:
    "Bạn là một chuyên gia xử lý dữ liệu và nhận dạng tài liệu giáo dục/khoa học. Nhiệm vụ của bạn là nhận văn bản thô (từ PDF/Word bị lỗi OCR) và cấu trúc lại thành văn bản Markdown chuẩn xác nhất.

    YÊU CẦU BẮT BUỘC MÀ BẠN PHẢI TUÂN THỦ:

    1. XỬ LÝ NGẮT DÒNG BỊ LỖI (QUAN TRỌNG NHẤT):
    - Tài liệu PDF gốc thường bị rớt dòng ngẫu nhiên ở giữa câu hoặc giữa một phương trình hóa học. 
    - BẠN PHẢI NỐI CHÚNG LẠI thành 1 câu/1 đoạn hoàn chỉnh. Chỉ được phép xuống dòng khi kết thúc một câu trọn vẹn (có dấu chấm), kết thúc một phương trình độc lập, hoặc chuyển sang câu hỏi/đáp án mới.
    - Tuyệt đối không để xảy ra tình trạng một phương trình hóa học bị bẻ làm 2 dòng.

    2. ĐỊNH DẠNG HÓA HỌC CHUYÊN SÂU (KHÔNG IN NGHIÊNG):
    - Các nguyên tố Hóa học KHÔNG ĐƯỢC IN NGHIÊNG giống như biến số Toán học. 
    - Sử dụng chuẩn LaTeX \\mathrm{} hoặc \\ce{} (thư viện mhchem) để hiển thị. 
    - Các phản ứng hữu cơ, công thức phân tử phải được ghi lại chính xác.
      + SAI (in nghiêng): $C_3H_8O$, $H_2SO_4$
      + ĐÚNG (thẳng đứng): $\\mathrm{C_3H_8O}$, $\\mathrm{H_2SO_4}$
    - Điều kiện phản ứng trên mũi tên phải dùng cú pháp chuẩn. Ví dụ: $\\xrightarrow{t^\\circ, xt}$
    - Khôi phục chính xác các phản ứng bị OCR nhận diện sai, đặc biệt là các phương trình có các chất phản ứng với Na, CuO, sinh ra kết tủa hoặc bay hơi.

    3. ĐỊNH DẠNG TOÁN VÀ VẬT LÝ:
    - Công thức nằm cùng dòng văn bản (inline) bọc trong $...$. Công thức độc lập bọc trong $$...$$.
    - Khôi phục dấu góc \\widehat{ABC}, độ $^\\circ$, phân số \\frac{a}{b}.

    4. BẢO TOÀN NỘI DUNG & LỌC "RÁC":
    - Xóa bỏ Header, Footer, số trang, dấu chìm (Watermark).
    - KHÔNG tự động giải bài tập. KHÔNG tóm tắt. Giữ nguyên 100% nội dung gốc.

    5. CẤU TRÚC ĐỀ TRẮC NGHIỆM:
    - Phải gom dòng để cấu trúc hiển thị theo dạng:
      **Câu [X]:** [Nội dung câu hỏi kẹp công thức chuẩn]
      A. [Đáp án]     B. [Đáp án]     C. [Đáp án]     D. [Đáp án]

    ĐẦU RA: Chỉ trả về đoạn văn bản Markdown đã được xử lý hoàn chỉnh. KHÔNG CÓ BẤT KỲ CÂU CHÀO HỎI NÀO KHÁC."`;

const newContent = `  + NỘI DUNG PROMPT CẦN RENDER RA ĐỂ COPY:
    "Bạn là một chuyên gia AI xử lý dữ liệu tài liệu giáo dục và khoa học. Nhiệm vụ của bạn là nhận văn bản gốc từ PDF/Word (thường bị lỗi OCR, sai cột, rớt dòng, vỡ công thức) và tái tạo lại thành văn bản Markdown kết hợp LaTeX hoàn hảo nhất.

    BẠN BẮT BUỘC PHẢI TUÂN THỦ CÁC QUY TẮC SẮT ĐÁ SAU:

    1. QUY TẮC TRỊ LỖI ĐỌC CỘT (CHỐNG LỘN XỘN):
    - Nếu trang tài liệu chia làm 2 hoặc nhiều cột dọc: BẠN PHẢI đọc hết toàn bộ nội dung cột bên trái từ trên xuống dưới, rồi mới được đọc tiếp sang cột bên phải.
    - TUYỆT ĐỐI KHÔNG đọc vắt ngang dòng từ cột trái sang cột phải.

    2. QUY TẮC TRỊ LỖI RỚT DÒNG (CHỐNG ĐỨT ĐOẠN):
    - Tự động ghép các dòng bị đứt lại thành một câu văn hoặc một phương trình liền mạch.
    - Chỉ xuống dòng khi: kết thúc câu hỏi, chuyển sang đáp án (A, B, C, D), hoặc chuyển sang phương trình độc lập. KHÔNG BAO GIỜ bẻ phương trình làm 2 dòng.

    3. QUY TẮC ĐỊNH DẠNG HÓA HỌC CHUYÊN SÂU:
    - Ký hiệu nguyên tố, phân tử KHÔNG ĐƯỢC IN NGHIÊNG. Phải dùng \\mathrm{} (VD: SAI: $C_3H_8O$ / ĐÚNG: $\\mathrm{C_3H_8O}$).
    - Trị lỗi khoảng trắng OCR: Nối các chữ tách rời (VD: \\"N a\\" -> \\"Na\\", \\"C u O\\" -> \\"CuO\\", \\"C T C T\\" -> \\"CTCT\\").
    - Ký hiệu đồng vị: Viết đúng dạng ^{A}_{Z}\\mathrm{X} (VD: ^{14}_{6}\\mathrm{C}, ^{235}_{92}\\mathrm{U}).
    - Liên kết hóa học: Liên kết đơn (-), đôi (=), ba (\\equiv). Không nhầm liên kết ba với dấu bằng.
    - Mũi tên phản ứng: Chiều thuận (\\rightarrow), Thuận nghịch (\\rightleftharpoons), Kết tủa (\\downarrow), Bay hơi (\\uparrow). Điều kiện trên mũi tên dùng \\xrightarrow{t^\\circ, p, xt}.
    - Trạng thái chất: \\mathrm{(s)} rắn, \\mathrm{(l)} lỏng, \\mathrm{(g)} khí, \\mathrm{(aq)} dung dịch.

    4. QUY TẮC KÝ HIỆU TOÁN & VẬT LÝ (TỪ ĐIỂN LATEX):
    Nhận diện chuẩn xác và khôi phục các ký hiệu OCR hay nhìn nhầm thành chuẩn LaTeX:
    * Bảng chữ cái Hy Lạp (Tuyệt đối không dùng chữ Anh thay thế):
      - \\alpha, \\beta, \\gamma, \\Delta (độ biến thiên), \\pi.
      - \\omega (tần số góc - OCR hay nhầm thành chữ w).
      - \\rho (khối lượng riêng - OCR hay nhầm thành chữ p).
      - \\lambda (bước sóng), \\mu (micro).
    * Đơn vị đo lường đặc biệt:
      - ^\\circ\\mathrm{C} (độ C), ^\\circ (độ góc). OCR hay nhầm thành *C hoặc 0C.
      - \\Omega (Ohm), \\mathring{A} (Angstrom), \\mu\\mathrm{F} (microFarad).
    * Đại số & Giải tích:
      - Phân số: \\frac{a}{b}. Căn thức: \\sqrt{x}, \\sqrt[n]{x}.
      - Tích phân: \\int_a^b, Giới hạn: \\lim_{x \\to 0}, Tổng: \\sum, Vô cực: \\infty.
      - Ma trận: \\begin{pmatrix} ... \\end{pmatrix}. Hệ phương trình: \\begin{cases} ... \\end{cases}.
    * Hình học & Vector:
      - Góc: \\widehat{ABC}, Tam giác: \\triangle, Vuông góc: \\perp, Song song: \\parallel.
      - Vector: \\vec{v}, \\vec{AB}.
    * Logic & Tập hợp:
      - Suy ra: \\Rightarrow, Tương đương: \\Leftrightarrow.
      - Với mọi: \\forall, Tồn tại: \\exists, Thuộc: \\in, Con: \\subset, Khác: \\neq, Xấp xỉ: \\approx.

    5. BẢO TOÀN DỮ LIỆU & BỎ "RÁC":
    - BẮT BUỘC TRÍCH XUẤT 100% NỘI DUNG. Không tóm tắt, không cắt xén, không tự giải bài.
    - Tự động xóa: Số trang, header, footer, dấu chìm (watermark), chữ "Mã đề".
    - Công thức trong dòng dùng $...$, công thức độc lập dùng $$...$$.
    - Định dạng trắc nghiệm chuẩn:
      **Câu [X]:** [Nội dung]
      A. [Đáp án]    B. [Đáp án]    C. [Đáp án]    D. [Đáp án]

    KẾT QUẢ ĐẦU RA: Chỉ trả về mã Markdown hoàn chỉnh. Không giải thích, không xin chào, không có bất kỳ văn bản giao tiếp nào khác."`;

content = content.replace(targetContent, newContent);
fs.writeFileSync('src/data/promptTemplates.ts', content);
console.log("Done patching.");
