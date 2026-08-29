const fs = require('fs');
let content = fs.readFileSync('src/data/promptTemplates.ts', 'utf8');

const anchor = "===================================================================\n9. YÊU CẦU ĐẦU RA MÃ NGUỒN & QUY TẮC BỘ NHỚ (OUTPUT DELIVERABLES):";

const insertContent = `===================================================================
[BẮT BUỘC] TỐI ƯU HÓA RESPONSIVE & TRẢI NGHIỆM ĐA MÀN HÌNH (MOBILE-FIRST):
===================================================================
Yêu cầu hệ thống hiển thị hoàn hảo trên mọi kích thước màn hình (từ 320px đến 4K) bằng Tailwind CSS. KHÔNG ĐƯỢC để xảy ra tình trạng vỡ layout, tràn chữ hay nút bấm bị che khuất.

1. BỐ CỤC LƯỚI (GRID & LAYOUT TỔNG THỂ):
   - Bọc toàn bộ nội dung app trong: \`w-full max-w-7xl mx-auto px-4 md:px-8\`.
   - Lưới danh sách thẻ bài học: Sử dụng Responsive Grid: \`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6\`. Không bao giờ để các thẻ bị bóp méo hình dạng.
   - Header & Thanh Điều Hướng: Các thanh Tabs (Danh mục, Thể loại) trên mobile phải cuộn ngang mượt mà (\`overflow-x-auto no-scrollbar whitespace-nowrap\`), không được rớt dòng làm đẩy các thành phần khác xuống.

2. TỐI ƯU CANVAS CHO MINI-GAMES:
   - Các game có Canvas (Dino, Block Puzzle) không được fix cứng width/height theo pixel trên thẻ container.
   - Bọc Canvas bằng thẻ \`<div className="w-full aspect-video md:aspect-[16/5] overflow-hidden relative">\`.
   - Cảm ứng chống trượt (Anti-scroll): Vùng chơi game BẮT BUỘC thêm CSS \`touch-action: none; user-select: none;\` để khi người dùng vuốt/chạm chơi game trên điện thoại sẽ không bị vô tình cuộn trang web lên xuống.

3. CƠ CHẾ MODAL & KHUNG NHẬP LIỆU (BÓC TÁCH DỮ LIỆU):
   - Trải nghiệm di động (\`< md\` breakpoint): Toàn bộ các Popup, Modal (cứu nạn, thêm bài học, bóc tách AI) phải hiển thị dạng Full-screen chiếm trọn màn hình (\`fixed inset-0 w-full h-[100dvh] m-0 rounded-none z-50 bg-white/dark\`).
   - Trải nghiệm Desktop (\`md\` trở lên): Modal quay về dạng hộp thoại căn giữa màn hình, có lớp phủ mờ bên ngoài (\`max-w-2xl rounded-2xl\`).

4. CHỐNG TRÀN NỘI DUNG TOÁN / HÓA (KATEX & BẢNG):
   - Các công thức KaTeX hoặc từ vựng quá dài khi hiển thị trên thẻ Flashcard di động BẮT BUỘC phải được bọc trong container có \`overflow-x-auto no-scrollbar\` để người dùng có thể vuốt ngang xem hết công thức thay vì làm vỡ thẻ (card) ra ngoài viền màn hình.

`;

content = content.replace(anchor, insertContent + anchor);

fs.writeFileSync('src/data/promptTemplates.ts', content);
console.log("Patched prompt rules.");
