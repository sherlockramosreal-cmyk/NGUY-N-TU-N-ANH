export const PEDAGOGY_TARGET_PROMPTS = {
  lop10: `[ĐẶC TẢ SƯ PHẠM: LỚP 10 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Ngôn từ rõ ràng, gần gũi, bám sát các chủ đề SGK Tiếng Anh 10 Global Success / Friends Global.
- Mục tiêu kiến thức: Giúp học sinh nắm chắc từ vựng nền tảng, nhận diện đúng từ loại (Noun, Verb, Adj, Adv), phiên âm IPA chuẩn xác và câu ví dụ quen thuộc trong đời sống.
- Thiết kế bài tập: Tập trung mức độ Nhận biết & Thông hiểu; các câu hỏi trắc nghiệm ngắn, có gợi ý rõ ràng và không đánh đố quá mức.`,
  lop11: `[ĐẶC TẢ SƯ PHẠM: LỚP 11 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Mở rộng sang các vấn đề xã hội, môi trường, di sản văn hóa và sức khỏe.
- Mục tiêu kiến thức: Chú trọng các cụm từ kết hợp (Collocations), phân từ hoàn thành (Having + V3), danh động từ và động từ khuyết thiếu.
- Thiết kế bài tập: Mức độ Thông hiểu & Vận dụng; yêu cầu học sinh giải thích ngữ cảnh sử dụng từ và thực hành ghép cấu trúc câu phức.`,
  lop12: `[ĐẶC TẢ SƯ PHẠM: LỚP 12 - CHƯƠNG TRÌNH GDPT 2018]
- Giọng văn & Độ khó: Học thuật chuyên sâu, định hướng nghề nghiệp, công nghệ và hội nhập.
- Mục tiêu kiến thức: Cung cấp từ vựng trừu tượng mức độ nâng cao (B2 - C1), các cấu trúc ngữ pháp khó như Đảo ngữ, Câu điều kiện hỗn hợp, Rút gọn mệnh đề quan hệ.
- Thiết kế bài tập: Mức độ Vận dụng cao; tích hợp các câu hỏi phân loại học sinh khá - giỏi và bài tập phân tích lỗi sai ngữ pháp tinh vi.`,
  thptqg: `[ĐẶC TẢ SƯ PHẠM: KỲ THI TỐT NGHIỆP THPT QUỐC GIA]
- Định dạng trọng tâm: 100% trắc nghiệm khách quan chuẩn cấu trúc Bộ GD&ĐT.
- Cơ chế giải thích: Mỗi câu hỏi trắc nghiệm BẮT BUỘC phải có mục "Phân tích bẫy sai kinh điển" (chỉ rõ vì sao phương án nhiễu lại dễ gây nhầm lẫn về thì, giới từ hoặc ngữ âm).
- Dạng bài bắt buộc: Kiểm tra cặp từ đồng nghĩa/trái nghĩa, câu hỏi giao tiếp tình huống, tìm lỗi sai ngữ pháp và nhận diện quy tắc trọng âm/phát âm đuôi -s/ed.`,
  vact: `[ĐẶC TẢ SƯ PHẠM: KỲ THI ĐÁNH GIÁ NĂNG LỰC ĐHQG TP.HCM (VACT)]
- Định hướng tư duy: Đánh giá năng lực ứng dụng ngôn ngữ và tư duy logic, KHÔNG kiểm tra mẹo ngữ pháp vụn vặt.
- Mục tiêu kiến thức: Kiểm tra khả năng đọc hiểu nhanh các đoạn văn khoa học/xã hội (150 - 250 từ), xác định nghĩa của từ trong ngữ cảnh cụ thể, phát hiện câu vi phạm tính mạch lạc logic.
- Thiết kế bài tập: Bài tập đọc hiểu suy luận ý chính, câu hỏi chọn từ điền vào chỗ trống dựa trên sự tương thích ngữ nghĩa và sắc thái biểu cảm.`,
  ielts: `[ĐẶC TẢ SƯ PHẠM: IELTS ACADEMIC]
- Mục tiêu kiến thức: Trích xuất từ vựng theo khung Academic Word List (AWL), cung cấp tối thiểu 2-3 Cụm Collocations học thuật nâng cao cho mỗi từ vựng.
- Kỹ thuật Paraphrasing: Với mỗi từ/câu, cung cấp thêm các cách diễn đạt đồng nghĩa tương đương ở các cấp độ Band điểm khác nhau (Band 5.5 vs Band 7.5+).
- Ứng dụng thực tế: Mọi câu ví dụ đều phải được viết theo chuẩn văn phong học thuật IELTS Writing Task 2 hoặc IELTS Reading.`,
  giaotiep: `[ĐẶC TẢ SƯ PHẠM: GIAO TIẾP & PHẢN XẠ THỰC TẾ]
- Mục tiêu kiến thức: Chú trọng các thành ngữ (Idioms), cụm động từ (Phrasal Verbs) và mẫu câu giao tiếp tự nhiên của người bản xứ.
- Âm thanh & Ngữ điệu: Ưu tiên kích hoạt Web Speech API để phát âm; có hướng dẫn nối âm (Connected speech) và ngữ điệu câu (Intonation).
- Mini-game phản xạ: Bắt buộc kích hoạt game Đúng/Sai 3 giây và Kéo thả nối câu để rèn luyện tốc độ xử lý thông tin.`
};

export const STUDY_MODE_PROMPTS = {
  flashcard3d: `- [Flashcard 3D & Audio]: Triển khai thẻ 3D, hỗ trợ xáo trộn và tích hợp phát âm chuẩn IPA (Web Speech API).`,
  active_recall: `- [Học & Nhớ (Active Recall)]: Tích hợp trắc nghiệm phản xạ, giải thích bẫy sai ngay khi người dùng chọn đáp án.`,
  exam_mode: `- [Bài kiểm tra tổng hợp]: Cấu trúc tính giờ, kết hợp trắc nghiệm và điền từ, cung cấp bảng điểm chi tiết sau khi hoàn thành.`,
  doc_extractor: `- [Form Nạp Bài Học & Bóc tách dấu ":" và "-"]: Tự động tách từ vựng, loại từ, nghĩa tiếng Việt và ví dụ bằng dấu hai chấm (:) và dấu gạch ngang (-), cập nhật real-time vào Flashcard và các game.`,
  export_pdf: `- [Xuất PDF]: Hỗ trợ định dạng in ấn tối ưu khổ A4 cho Flashcards hoặc tài liệu học offline.`
};
