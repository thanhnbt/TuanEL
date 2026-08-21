# TuanEL: Quy Tắc Xây Dựng Bài Tập Ngữ Âm & Trọng Âm

Khi thực hiện tạo bài tập Ngữ Âm (Pronunciation) hoặc Trọng Âm (Stress) cho dự án TuanEL, AI phải tuân thủ nghiêm ngặt các quy tắc sau về cấu trúc HTML, Dữ liệu (JS), và Lý thuyết (Theory).

## 1. Yêu Cầu Về Dữ Liệu Gợi Ý (JS Data)
Mỗi câu hỏi Ngữ Âm/Trọng Âm trong file JS (`t1.js`, `t2.js`...) cần có một block `exp` (explanation) cực kỳ chi tiết, được cấu trúc bằng HTML.

**Chi tiết cho từng từ (Option) trong 4 đáp án:**
Bắt buộc phải phân tích từng từ theo cấu trúc nội tuyến (inline), bao gồm:
1. **Từ gốc (Lower case)**
2. **Từ loại (POS)** (ví dụ: *noun*, *verb*, *adj*)
3. **Số âm tiết** (ví dụ: *2 âm tiết*)
4. **Phiên âm IPA chuẩn** (ví dụ: `/rɪˈlæks/`)
5. **Phiên âm nôm na (Sound It Out)**: Cách đọc tách vần tiếng Việt-hóa dễ hiểu, in mờ màu xám nhạt (ví dụ: `<span style="color:#a8a29e; font-size:0.75rem;">/re-LAX/</span>`)
6. **Icon Loa (🔊)**: Tích hợp sự kiện `onclick="speak('word'); return false;"`
7. **Lý do/Quy tắc cụ thể**: Giải thích ngắn gọn tại sao từ đó lại có phiên âm/trọng âm như vậy.

**Ví dụ một dòng phân tích từ:**
```html
<div style='display:flex; align-items:center; gap:5px; font-weight:700; color:var(--blue);'>
  <span style='width:20px; font-weight:600;'>A.</span>
  <span><b>relax</b> <i>(verb - 2 âm tiết)</i>:</span>
  <span class="phon" style="color:var(--ipa-color); font-family:monospace; margin:0 3px;">
    /rɪˈlæks/ <span style="color:#a8a29e; font-size:0.75rem;">/re-LAX/</span>
  </span>
  <a href="#" onclick="speak('relax');return false" style="text-decoration:none; margin-left:3px;" title="Nghe: relax">🔊</a>
  <span style="color:var(--muted); font-size:0.85rem; margin-left:5px;">&rarr; Động từ 2 âm tiết -> Nhấn âm 2</span>
</div>
```

## 2. Thanh Quy Tắc Cuộn (Scroll Anchor Rule)
Ở trên cùng của bảng Gợi ý (`exp`), LUÔN có một thanh tóm tắt quy tắc chung (dùng thẻ `<a>` thay vì text tĩnh).
- Khi người dùng bấm vào thanh quy tắc này, giao diện phải **scroll mượt mà** lên phần Lý Thuyết tương ứng ở đầu trang `practice.html`.
- Cấu trúc:
```html
<div class='hint-rule' style='margin-bottom: 8px;'>
  <a href='#theory-vowels' onclick="document.getElementById('theory-vowels').scrollIntoView({behavior:'smooth', block:'start'}); return false;" style='color: var(--teal); font-weight: 700; font-size: 0.9rem; text-decoration: none; padding: 4px 8px; background: #f0fdfa; border-radius: 6px; display: inline-block; border: 1px solid #ccfbf1;'>
    📚 Quy tắc phát âm: âm 'ea'. &uarr;
  </a>
</div>
```

## 3. Cấu Trúc File Luyện Tập (practice.html)
Để chức năng Scroll Anchor hoạt động, file `practice.html` phải được nhúng **Toàn bộ bảng Lý Thuyết** ở vị trí trên cùng (trước `test-tabs`).
- Phải có các khối Card Lý Thuyết với `id` rõ ràng để scroll tới:
  - Khối Trọng Âm: `id="theory-stress"`
  - Khối S/ES & ED: `id="theory-s-ed"`
  - Khối Nguyên Âm: `id="theory-vowels"`

## 4. Audio Playback (TTS & API)
Trang `practice.html` phải luôn có hàm `speak(word)` được tiêm vào (inject), xử lý:
1. Giao diện tải (loading state) trên các từ.
2. Gọi Merriam-Webster API lấy audio mp3.
3. Fallback sang `window.speechSynthesis` (Google US English) nếu API lỗi hoặc không tìm thấy từ.

> **Lưu ý:** Mục đích của cấu trúc này là để học sinh tiểu học (8-9 tuổi, ESL) có thể đọc giải thích một cách trực quan nhất, vừa có âm thanh, vừa có phiên âm nôm na, và có thể tra ngược lên lý thuyết bất cứ lúc nào.
