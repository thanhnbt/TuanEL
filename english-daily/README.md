# 📘 English Daily

Website ghi lại nội dung học tiếng Anh hàng ngày. Deploy trên GitHub Pages.

## Cấu trúc project

```
english-daily/
├── index.html              ← Trang chủ (tự render từ lessons.json)
├── lessons.json            ← ⭐ Registry bài học (chỉ cần sửa file này)
├── css/style.css           ← Style chung
├── js/app.js               ← Logic trang chủ (search, render list)
├── template/
│   └── lesson-template.html ← Template copy cho bài mới
└── lessons/
    ├── 2026-07-10-greetings/
    │   └── index.html
    └── 2026-07-11-daily-routine/
        └── index.html
```

## Thêm bài học mới (3 bước)

### Bước 1: Tạo folder + copy template
```bash
# Format: YYYY-MM-DD-slug
mkdir -p lessons/2026-07-15-food-and-drinks
cp template/lesson-template.html lessons/2026-07-15-food-and-drinks/index.html
```

### Bước 2: Sửa nội dung
Mở file `index.html` vừa copy, tìm và thay các placeholder `__...__`:
- `__DATE__` → ngày học (2026-07-15)
- `__TITLE__` → tiêu đề (Food & Drinks)
- `__VIDEO_ID__` → YouTube video ID
- Điền vocabulary, grammar, homework, notes

### Bước 3: Đăng ký vào lessons.json
Thêm 1 entry vào `lessons.json`:
```json
{
  "date": "2026-07-15",
  "title": "Food & Drinks",
  "path": "lessons/2026-07-15-food-and-drinks/index.html",
  "tags": ["vocab", "video", "homework"]
}
```

Tags hỗ trợ: `vocab`, `video`, `homework`, `grammar`, `reading`

## Deploy lên GitHub Pages

1. Tạo repo trên GitHub (vd: `english-daily`)
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin https://github.com/<username>/english-daily.git
   git push -u origin main
   ```
3. Vào **Settings → Pages → Source: Deploy from branch → main / root**
4. Truy cập: `https://<username>.github.io/english-daily/`

## Sections có sẵn trong template

| Section    | Icon | Mô tả                         |
|------------|------|-------------------------------|
| Vocabulary | 📗   | Bảng từ vựng (word, IPA, nghĩa, ví dụ) |
| Grammar    | 📐   | Điểm ngữ pháp + ví dụ         |
| Video      | 🎬   | Embed YouTube                  |
| Homework   | 📝   | Checkbox bài tập               |
| Notes      | 💡   | Ghi chú tùy ý                 |

Mỗi section đều optional — xóa block HTML nếu buổi học không cần.
