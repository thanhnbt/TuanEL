/* Shared quiz engine — supports MCQ (opts/ans) and fill-in-the-blank (type:'fill', ans:string|string[]) */
(function () {
  var currentTest = 0, tests = [], answers = [], phase = 'test';

  function norm(s) {
    return String(s).trim().toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/\.\s*$/, '')
      .replace(/[‘’]/g, "'");
  }

  /* Accepts "a/b" token alternatives, e.g. "learned/learnt English" */
  function matchOne(user, correct) {
    var u = norm(user); if (!u) return false;
    var tokens = String(correct).split(' '), combos = [[]];
    for (var i = 0; i < tokens.length; i++) {
      var alts = tokens[i].split('/'), nc = [];
      for (var c = 0; c < combos.length; c++)
        for (var a = 0; a < alts.length; a++) nc.push(combos[c].concat(alts[a]));
      combos = nc;
      if (combos.length > 4096) break;
    }
    for (var v = 0; v < combos.length; v++) if (u === norm(combos[v].join(' '))) return true;
    return false;
  }

  function isFillCorrect(user, ans) {
    var list = Array.isArray(ans) ? ans : [ans];
    for (var i = 0; i < list.length; i++) if (matchOne(user, list[i])) return true;
    return false;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function isFill(q) { return q.type === 'fill'; }

  function answered(q, val) {
    return isFill(q) ? (val !== null && norm(val) !== '') : (val !== null);
  }

  function graded(q, val) {
    return isFill(q) ? isFillCorrect(val || '', q.ans) : (val === q.ans);
  }

  function firstAns(q) { return Array.isArray(q.ans) ? q.ans[0] : q.ans; }

  function renderTabs() {
    var box = document.getElementById('testTabs');
    box.innerHTML = '';
    tests.forEach(function (t, i) {
      var b = document.createElement('div');
      b.className = 'test-tab' + (i === currentTest ? ' active' : '');
      b.textContent = t.name;
      b.onclick = function () {
        currentTest = i; phase = 'test';
        renderTabs(); renderTest(); updateScore();
      };
      box.appendChild(b);
    });
    var badge = document.querySelector('.grammar-badge');
    if (badge && tests[currentTest] && tests[currentTest].badge) {
      badge.textContent = tests[currentTest].badge;
    }
  }

  /* Tiêu đề + hướng dẫn của từng mục (giống đề gốc) */
  function renderSectionHead(c) {
    var test = tests[currentTest];
    if (!test.title && !test.intro) return;
    var h = document.createElement('div');
    h.className = 'section-head';
    var html = '';
    if (test.part) html += '<div class="section-part">' + test.part + '</div>';
    if (test.title) html += '<h2 class="section-title">' + test.title + '</h2>';
    if (test.intro) html += '<p class="section-intro">' + test.intro + '</p>';
    if (test.howto) html += '<div class="section-howto">' + test.howto + '</div>';
    h.innerHTML = html;
    c.appendChild(h);
  }

  function renderTest() {
    var test = tests[currentTest]; if (!test) return;
    var c = document.getElementById('testContent');
    c.innerHTML = '';
    var lastPassage = null;
    renderSectionHead(c);

    test.questions.forEach(function (q, qi) {
      if (q.passage && q.passage !== lastPassage) {
        var p = document.createElement('div');
        p.className = 'passage-block';
        p.innerHTML = q.passage;
        c.appendChild(p);
        lastPassage = q.passage;
      }
      var card = document.createElement('div');
      card.className = 'q-card';
      var val = answers[currentTest][qi];
      var html = '<div class="q-title">' + q.q + '</div>';

      var done = answered(q, val);

      if (isFill(q)) {
        var cls = 'fill-input';
        if (phase === 'answer') {
          cls += ' locked';
          if (done) cls += graded(q, val) ? ' ok' : ' bad';
        }
        if (q.lead) html += '<div class="fill-lead">' + q.lead + '</div>';
        html += '<input type="text" class="' + cls + '" data-qi="' + qi + '" value="' +
          esc(val || '') + '" placeholder="Viết câu trả lời…" autocomplete="off"' +
          (phase === 'answer' ? ' readonly' : '') + '>';
      } else {
        html += '<div class="opts' + (phase === 'answer' ? ' locked' : '') + '">';
        q.opts.forEach(function (opt, oi) {
          var sel = val === oi, k = 'opt';
          if (phase === 'answer') {
            /* Câu chưa làm: không chấm, không hé đáp án */
            if (done) {
              if (oi === q.ans) k += ' correct';
              else if (sel) k += ' wrong';
            }
          } else if (sel) k += ' selected';
          html += '<label class="' + k + '"><input type="radio" name="q_' + qi +
            '" value="' + oi + '"' + (sel ? ' checked' : '') +
            (phase === 'answer' ? ' disabled' : '') + '> ' +
            String.fromCharCode(65 + oi) + '. ' + opt + '</label>';
        });
        html += '</div>';
      }

      if (phase === 'answer' && done) {
        var head = isFill(q) ? '<div class="ans-key">✅ ' + esc(firstAns(q)) + '</div>' : '';
        html += '<div class="hint-box">' + head + q.exp + '</div>';
      }
      card.innerHTML = html;
      c.appendChild(card);
    });

    if (phase === 'test') {
      c.querySelectorAll('.opt input').forEach(function (inp) {
        inp.addEventListener('change', function (e) {
          answers[currentTest][parseInt(e.target.name.split('_')[1], 10)] = parseInt(e.target.value, 10);
          renderTest();
        });
      });
      c.querySelectorAll('.fill-input').forEach(function (inp) {
        inp.addEventListener('input', function (e) {
          answers[currentTest][parseInt(e.target.dataset.qi, 10)] = e.target.value;
          updateProgress();
        });
      });
    }
    updateProgress();
  }

  function countAnswered() {
    var qs = tests[currentTest].questions, n = 0;
    for (var i = 0; i < qs.length; i++) if (answered(qs[i], answers[currentTest][i])) n++;
    return n;
  }

  function updateProgress() {
    var el = document.getElementById('progressNote'); if (!el) return;
    var total = tests[currentTest].questions.length;
    el.textContent = phase === 'test' ? 'Đã làm ' + countAnswered() + '/' + total + ' câu' : '';
  }

  function updateScore() {
    var el = document.getElementById('scoreDisplay'); if (!el) return;
    if (phase === 'test') { el.style.display = 'none'; return; }
    var qs = tests[currentTest].questions, correct = 0, done = countAnswered();
    for (var i = 0; i < qs.length; i++) {
      if (answered(qs[i], answers[currentTest][i]) && graded(qs[i], answers[currentTest][i])) correct++;
    }
    el.style.display = 'block';
    /* Điểm = số đúng / số câu ĐÃ LÀM, kèm (đã làm N/tổng) */
    el.innerHTML = done === 0
      ? '📝 Em chưa làm câu nào — ấn <b>Làm lại</b> rồi thử nhé!'
      : '🎉 Đúng <strong>' + correct + '/' + done + '</strong> &nbsp;(đã làm ' + done + '/' + qs.length + ')';
  }

  function init() {
    tests = window.TESTS || [];
    answers = tests.map(function (t) { return new Array(t.questions.length).fill(null); });
    renderTabs(); renderTest(); updateScore();

    document.getElementById('shuffleBtn').onclick = function () {
      if (phase !== 'test') return;
      if (tests[currentTest].noShuffle) {
        alert('Phần này đọc theo đoạn văn nên không trộn câu được nhé!');
        return;
      }
      if (!confirm('Trộn câu sẽ xoá kết quả hiện tại. Bạn có chắc không?')) return;
      var q = tests[currentTest].questions;
      for (var i = q.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)), t = q[i]; q[i] = q[j]; q[j] = t;
      }
      answers[currentTest] = new Array(q.length).fill(null);
      renderTest();
    };
    document.getElementById('resetBtn').onclick = function () {
      if (!confirm('Bạn muốn làm lại từ đầu?')) return;
      answers[currentTest] = new Array(tests[currentTest].questions.length).fill(null);
      phase = 'test'; renderTest(); updateScore();
    };
    document.getElementById('submitBtn').onclick = function () {
      if (phase === 'answer') return;
      phase = 'answer'; renderTest(); updateScore();
    };
  }

  window.addEventListener('load', init);
})();
