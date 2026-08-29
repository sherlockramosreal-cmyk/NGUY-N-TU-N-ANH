const fs = require('fs');
let lines = fs.readFileSync('src/data/promptTemplates.ts', 'utf8').split('\n');

// 1. Line 594: + Bên phải: Nút Giao diện Sáng/Tối (Sun/Moon icon), Nút 'Hướng dẫn & Trợ giúp', và Avatar người dùng.
const targetLine1 = "  + Bên phải: Nút Giao diện Sáng/Tối (Sun/Moon icon), Nút 'Hướng dẫn & Trợ giúp', và Avatar người dùng.";
const replaceLine1 = "  + Bên phải: Nút Giao diện Sáng/Tối (Sun/Moon icon) và Avatar người dùng.";

// 2. Line 598: + Cụm 3 nút CTA: '[+] Tạo thẻ học thủ công' (Outline), '[⚡] Bóc Tách Tài Liệu' (Primary Solid, màu #06b6d4), '[▶] Hướng dẫn & Video' (Ghost).
const targetLine2 = "  + Cụm 3 nút CTA: '[+] Tạo thẻ học thủ công' (Outline), '[⚡] Bóc Tách Tài Liệu' (Primary Solid, màu #06b6d4), '[▶] Hướng dẫn & Video' (Ghost).";
const replaceLine2 = "  + Cụm 2 nút CTA: '[+] Tạo thẻ học thủ công' (Outline), '[⚡] Bóc Tách Tài Liệu' (Primary Solid, màu #06b6d4).";

// 3. Navigation flow section
const targetFlowStart = "- Luồng Chuyển Trạng Thái (Navigation Flow):";

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === targetLine1) lines[i] = replaceLine1;
  if (lines[i] === targetLine2) lines[i] = replaceLine2;
}

let flowIdx = lines.findIndex(l => l.includes(targetFlowStart));
if (flowIdx !== -1) {
  // Let's replace the block starting at flowIdx + 1
  // + Click '[⚡] Bóc Tách Tài Liệu' -> ...
  // + Click vào 1 Thẻ Card bất kỳ -> ...
  // + Góc trên cùng của màn hình Học tập -> ...
  
  lines[flowIdx + 1] = "  + Click '[+] Tạo thẻ học thủ công' -> HIỂN THỊ Modal tạo học phần thủ công (có Form nhập Tên học phần, Phân loại, và một danh sách input để tự điền từng Thẻ từ vựng). Bấm Lưu -> Cập nhật LocalStorage -> Đóng Modal & Render ở Trang chủ.";
  lines.splice(flowIdx + 2, 0, "  + Click '[⚡] Bóc Tách Tài Liệu' -> HIỂN THỊ Modal nhập liệu siêu tốc (nhập văn bản thô, dùng regex sinh thẻ). Bấm Lưu -> Cập nhật LocalStorage -> Đóng Modal & Render ở Trang chủ.");
}

fs.writeFileSync('src/data/promptTemplates.ts', lines.join('\n'));
console.log("Patched CTAs and Modal logic.");
