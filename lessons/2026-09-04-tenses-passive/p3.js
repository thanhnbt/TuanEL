window.TESTS = window.TESTS || [];
(function () {
  var P = "<div class='passage-title'>📜 The Great Wall of China</div>" +
    "<p>The Great Wall of China is one of the most remarkable architectural feats in history. " +
    "It <b>(41. originally/build)</b> _____ over 2,000 years ago by Emperor Qin Shi Huang to protect " +
    "the Chinese Empire from invasions. Throughout centuries, the wall <b>(42. reconstruct)</b> _____ " +
    "and expanded by subsequent dynasties, especially during the Ming Dynasty.</p>" +
    "<p>By the time the Ming Dynasty collapsed in 1644, the Wall <b>(43. become)</b> _____ the largest " +
    "military structure in the world. However, over the past few centuries, many sections of the wall " +
    "<b>(44. damage)</b> _____ by natural disasters and human activities. It is estimated that nearly " +
    "one-third of the wall <b>(45. already/disappear)</b> _____ without a trace.</p>" +
    "<p>Nowadays, strict preservation laws <b>(46. enforce)</b> _____ by the government. Currently, " +
    "restoration projects <b>(47. carry)</b> _____ out in various parts of the structure. Millions of " +
    "tourists from all over the world <b>(48. visit)</b> _____ this site every year. Experts predict " +
    "that if these conservation efforts are successful, this magnificent landmark <b>(49. preserve)</b> " +
    "_____ for future generations to admire. Hopefully, the spirit of the Great Wall " +
    "<b>(50. never/forget)</b> _____.</p>";

  window.TESTS.push({
    name: "3 · Đoạn văn (10 chỗ trống)",
    noShuffle: true,
    badge: "📖 Gap fill · The Great Wall of China",
    part: "BÀI TẬP NÂNG CAO — THÌ CỦA ĐỘNG TỪ & THỂ BỊ ĐỘNG",
    title: "PHẦN III. Chia động từ trong đoạn văn (10 chỗ trống)",
    intro: "Đọc đoạn văn sau. Chia các động từ trong ngoặc ở thì và thể (chủ động / bị động) phù hợp nhất.",
    howto: "<b>Cách làm:</b> đọc <b>cả đoạn văn</b> một lượt trước để hiểu nội dung, rồi mới điền. Mỗi chỗ trống có số thứ tự <b>(41)…(50)</b> in đậm trong đoạn văn — điền câu trả lời vào ô cùng số ở dưới. Chú ý các mốc thời gian trong bài: <i>over 2,000 years ago</i> (quá khứ), <i>By the time… 1644</i> (quá khứ hoàn thành), <i>over the past few centuries</i> (hiện tại hoàn thành), <i>Nowadays / Currently</i> (hiện tại), <i>Experts predict</i> (tương lai). Và nhớ: <b>disappear, become</b> không có dạng bị động!",
    questions: [
      { type: "fill", q: "41. (originally / build)", passage: P, ans: ["was originally built"], exp: "'over 2,000 years ago' → Past Simple passive. Put 'originally' between 'was' and the V3." },
      { type: "fill", q: "42. (reconstruct)", ans: ["was reconstructed"], exp: "Parallel with 'and expanded by subsequent dynasties' → Past Simple passive: was reconstructed." },
      { type: "fill", q: "43. (become)", ans: ["had become"], exp: "'By the time the Ming Dynasty collapsed in 1644' → Past Perfect. 'Become' has no passive here → had become." },
      { type: "fill", q: "44. (damage)", ans: ["have been damaged"], exp: "'over the past few centuries' → Present Perfect passive: have been + V3 (subject: many sections)." },
      { type: "fill", q: "45. (already / disappear)", ans: ["has already disappeared"], exp: "'Disappear' is intransitive — no passive form. Subject 'one-third' is singular → has already disappeared." },
      { type: "fill", q: "46. (enforce)", ans: ["are enforced"], exp: "'Nowadays' + a general rule → Present Simple passive. Plural subject 'laws' → are enforced." },
      { type: "fill", q: "47. (carry)", ans: ["are being carried"], exp: "'Currently' → Present Continuous passive: are being carried out. Keep the particle 'out'." },
      { type: "fill", q: "48. (visit)", ans: ["visit"], exp: "'every year' → Present Simple. The tourists DO the visiting → active, plural subject → visit." },
      { type: "fill", q: "49. (preserve)", ans: ["will be preserved"], exp: "First Conditional ('if … are successful') → will. The landmark receives the action → will be preserved." },
      { type: "fill", q: "50. (never / forget)", ans: ["will never be forgotten"], exp: "Future passive with 'never': will never be + V3 → will never be forgotten." }
    ]
  });
})();
