/**
 * English Daily - Main page logic
 * Reads LESSONS from inline <script> in index.html, renders list with search.
 */
(function () {
  var listEl = document.getElementById('lesson-list');
  var searchEl = document.getElementById('search');
  var countEl = document.getElementById('lesson-count');
  if (!listEl || typeof LESSONS === 'undefined') return;

  var TAG_MAP = {
    vocab:    { label: 'Vocabulary', cls: 'tag-vocab' },
    video:    { label: 'Video',      cls: 'tag-video' },
    homework: { label: 'Homework',   cls: 'tag-homework' },
    grammar:  { label: 'Grammar',    cls: 'tag-grammar' },
    reading:  { label: 'Reading',    cls: 'tag-reading' },
  };

  // Sort ascending (chronological)
  var lessons = LESSONS.sort(function (a, b) {
    return a.date.localeCompare(b.date);
  });

  function renderList(filter) {
    var q = (filter || '').toLowerCase();
    var filtered = lessons.filter(function (l) {
      return !q ||
        l.title.toLowerCase().indexOf(q) !== -1 ||
        l.date.indexOf(q) !== -1 ||
        (l.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) !== -1; });
    });

    if (countEl) countEl.textContent = filtered.length;

    if (filtered.length === 0) {
      listEl.innerHTML = '<div class="empty-state">Không tìm thấy bài học nào.</div>';
      return;
    }

    listEl.innerHTML = filtered.map(function (l, i) {
      var dayNum = i + 1;
      var tags = (l.tags || []).map(function (t) {
        var cfg = TAG_MAP[t] || { label: t, cls: '' };
        return '<span class="tag ' + cfg.cls + '">' + cfg.label + '</span>';
      }).join('');

      return '<a href="' + l.path + '" class="lesson-card">' +
        '<div class="lesson-card-header">' +
          '<span class="lesson-day">Day ' + dayNum + '</span>' +
          '<span class="lesson-date">' + l.date + '</span>' +
          '<span class="lesson-title">' + l.title + '</span>' +
        '</div>' +
        (tags ? '<div class="lesson-tags">' + tags + '</div>' : '') +
      '</a>';
    }).join('');
  }

  renderList('');

  if (searchEl) {
    searchEl.addEventListener('input', function (e) {
      renderList(e.target.value);
    });
  }
})();
