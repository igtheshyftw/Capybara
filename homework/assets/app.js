/* Michael 写作课 · 课后作业提交系统
   引导 → 收集 → 确认 → 汇总成一份可保存为 PDF 的报告。
   这里没有任何评分、批改或答案校验逻辑：学生写什么，报告里就原样出现什么。 */

(function () {
  'use strict';

  var COURSE = window.COURSE;
  var ONLY = window.LESSON_ONLY || null;          // 单课页面用
  var LESSONS = ONLY ? COURSE.lessons.filter(function (l) { return l.id === ONLY; }) : COURSE.lessons;
  var KEY = 'michael-writing-hw/v1';

  /* ------------------------------ state ------------------------------ */

  var state = { student: { name: '', date: '' }, v: {}, c: {}, p: {} };

  try {
    var raw = localStorage.getItem(KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      state.student = parsed.student || state.student;
      state.v = parsed.v || {};
      state.c = parsed.c || {};
      state.p = parsed.p || {};
    }
  } catch (e) { /* 隐私模式或存储被禁用：继续，只是不持久化 */ }

  var saveTimer = null, photosInMemory = false;

  function writeNow() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      stamp('已自动保存 ' + timeNow());
    } catch (e) {
      stamp('浏览器存储已满，照片仅保留在本次页面中，请尽快生成报告');
      photosInMemory = true;
    }
  }

  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(writeNow, 250);
  }

  function flush() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; writeNow(); }
  }

  window.addEventListener('beforeunload', flush);
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') flush();
  });

  function stamp(msg) {
    var n = document.getElementById('saved');
    if (n) n.textContent = msg;
  }

  function timeNow() {
    var d = new Date();
    return pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function nowISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) +
           ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
  }
  function todayISO() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function val(name) { return state.v[name] || ''; }
  function has(name) { return String(val(name)).trim() !== ''; }

  /* ------------------------------ sections ------------------------------ */

  function sectionsOf(lesson) {
    var out = [];
    if (lesson.mock) out.push({ key: 'mock', label: lesson.mock.title });
    out.push({ key: 'dict', label: lesson.dictation.title });
    lesson.homework.forEach(function (hw) {
      out.push({ key: 'hw' + hw.n, label: '作业 ' + hw.n });
    });
    return out;
  }
  function ckey(lesson, sec) { return 'L' + lesson.id + '.' + sec; }

  /* ------------------------------ field rendering ------------------------------ */

  function fieldHTML(f, base) {
    var name = base + '.' + f.key;
    var h = '<div class="field">';
    if (f.label) h += '<label class="head">' + esc(f.label) + '</label>';

    if (f.kind === 'line') {
      h += input(name, f.placeholder);
    } else if (f.kind === 'para') {
      h += textarea(name, f.rows || 4, f.placeholder);
    } else if (f.kind === 'lines') {
      for (var i = 0; i < f.count; i++) {
        var lab = f.itemLabels ? f.itemLabels[i] : (i + 1);
        h += '<div class="rowlab"><span class="' + (f.itemLabels ? 'tag' : 'idx') + '">' +
             esc(lab) + '</span>' + input(name + '.' + i, f.placeholder) + '</div>';
      }
    } else if (f.kind === 'paras') {
      for (var j = 0; j < f.count; j++) {
        h += '<div class="rowlab"><span class="idx">' + (j + 1) + '</span>' +
             textarea(name + '.' + j, f.rows || 2, f.placeholder) + '</div>';
      }
    } else if (f.kind === 'pairs') {
      for (var k = 0; k < f.count; k++) {
        h += '<div class="pair">' +
             input(name + '.' + k + '.a', f.aPlaceholder || f.aLabel) +
             textarea(name + '.' + k + '.b', 2, f.bPlaceholder || f.bLabel) +
             '</div>';
      }
    } else if (f.kind === 'choice') {
      h += select(name, f.options);
    } else if (f.kind === 'checks') {
      h += '<div class="checks">';
      f.options.forEach(function (opt, oi) {
        var n2 = name + '.' + oi;
        h += '<label><input type="checkbox" data-name="' + esc(n2) + '"' +
             (val(n2) ? ' checked' : '') + '><span>' + esc(opt) + '</span></label>';
      });
      h += '</div>';
    } else if (f.kind === 'group') {
      f.items.forEach(function (item, ii) {
        h += '<div class="item' + (f.compact ? ' compact' : '') + '">';
        h += '<div class="heading">' + esc(item.heading) + '</div>';
        var pairable = f.compact && f.sub.length === 2 &&
                       f.sub.every(function (s) { return s.kind === 'line' || s.kind === 'choice'; });
        if (pairable) h += '<div class="grid2">';
        f.sub.forEach(function (s) {
          var n3 = name + '.' + ii + '.' + s.key;
          h += '<div class="sub-f"><label>' + esc(s.label) + '</label>';
          h += s.kind === 'para' ? textarea(n3, s.rows || 2, s.placeholder)
             : s.kind === 'choice' ? select(n3, s.options)
             : input(n3, s.placeholder);
          h += '</div>';
        });
        if (pairable) h += '</div>';
        h += '</div>';
      });
    }
    return h + '</div>';
  }

  function input(name, ph) {
    return '<input type="text" data-name="' + esc(name) + '" value="' + esc(val(name)) +
           '" placeholder="' + esc(ph || '') + '">';
  }
  function textarea(name, rows, ph) {
    return '<textarea rows="' + rows + '" data-name="' + esc(name) + '" placeholder="' +
           esc(ph || '') + '">' + esc(val(name)) + '</textarea>';
  }
  function select(name, options) {
    var h = '<select data-name="' + esc(name) + '"><option value="">— 请选择 —</option>';
    options.forEach(function (o) {
      h += '<option value="' + esc(o) + '"' + (val(name) === o ? ' selected' : '') + '>' + esc(o) + '</option>';
    });
    return h + '</select>';
  }

  /* ------------------------------ lesson rendering ------------------------------ */

  function confirmBar(lesson, sec, label) {
    var key = ckey(lesson, sec);
    var t = state.c[key];
    return '<div class="confirm">' +
      '<button class="btn" data-confirm="' + esc(key) + '">' +
        (t ? '重新确认提交' : '确认提交' + (label ? '：' + esc(label) : '')) + '</button>' +
      '<span class="receipt' + (t ? '' : ' none') + '" data-receipt="' + esc(key) + '">' +
        (t ? '✓ 已收到 · ' + esc(t) : '尚未提交') + '</span>' +
      '</div>';
  }

  function mockHTML(lesson, stepNo) {
    var m = lesson.mock, base = 'L' + lesson.id + '.mock';
    var h = '<section class="card" id="sec-mock">';
    h += '<h3><span class="step-tag">Step ' + stepNo + '</span>' + esc(m.title) + '</h3>';
    h += '<p class="lead">' + esc(m.format) + '</p>';

    if (m.rules) {
      h += '<div class="chips">' + m.rules.map(function (r) { return '<span>' + esc(r) + '</span>'; }).join('') + '</div>';
    }

    h += '<h4 class="sub">流程</h4>';
    m.steps.forEach(function (s) {
      h += '<div style="margin-top:10px"><div style="font-size:13.5px;font-weight:600">' + esc(s.title) + '</div>';
      if (s.text) h += '<div class="muted" style="margin-top:3px">' + esc(s.text) + '</div>';
      if (s.quote) h += '<div class="script">“' + esc(s.quote) + '”</div>';
      h += '</div>';
    });

    h += '<h4 class="sub">选题（任选 1 题，并在下方勾选）</h4>';
    m.prompts.forEach(function (p, i) {
      var on = val(base + '.prompt') === p.label;
      h += '<label class="prompt' + (on ? ' on' : '') + '" data-prompt-wrap>' +
        '<input type="radio" name="' + esc(base) + '.prompt" data-name="' + esc(base) + '.prompt" value="' +
          esc(p.label) + '"' + (on ? ' checked' : '') + '>' +
        '<span class="lbl">' + esc(p.label) + '</span><span class="src">' + esc(p.source) + '</span>' +
        '<div class="q">' + esc(p.text) + '</div></label>';
    });

    h += '<h4 class="sub">' + esc(m.focusTitle) + '</h4><dl class="focus">';
    m.focus.forEach(function (f) {
      h += '<dt>' + esc(f.k) + '</dt><dd>' + esc(f.v) + '</dd>';
    });
    h += '</dl>';

    h += '<h4 class="sub">我的模考记录</h4>';
    h += '<p class="muted">按实际情况填写。这里只是你的提交记录，不做任何评分。</p>';
    h += '<div class="pair">' +
      '<div><label class="head" style="font-size:12px;color:var(--ink-3)">完成用时</label>' +
      input(base + '.time', m.task1 ? '例：19 分 40 秒' : '例：38 分 20 秒') + '</div>' +
      '<div><label class="head" style="font-size:12px;color:var(--ink-3)">总字数（' +
      (m.task1 ? '要求 ≥150 词' : '要求 ≥250 词') + '）</label>' +
      input(base + '.words', '例：272') + '</div></div>';

    h += fieldHTML({ key: 'essay', kind: 'para', rows: 14,
      label: '作文誊写（手写稿请誊写到这里，报告中会原样呈现）',
      placeholder: '把你手写的这篇作文誊写进来……' }, base);

    h += photoHTML(base + '.photo', '手写稿照片（可选，可多张）');

    h += fieldHTML({ key: 'note', kind: 'para', rows: 3,
      label: '想让助教留意的地方（可选）',
      placeholder: '例：这次第二段的 Example 我不确定够不够具体。' }, base);

    h += confirmBar(lesson, 'mock', '模考');
    return h + '</section>';
  }

  function photoHTML(name, label) {
    var list = state.p[name] || [];
    var h = '<div class="field photos"><label class="head">' + esc(label) + '</label>';
    h += '<input type="file" accept="image/*" multiple data-photo="' + esc(name) + '">';
    h += '<div class="thumbs" data-thumbs="' + esc(name) + '">' + thumbsHTML(name, list) + '</div>';
    return h + '</div>';
  }
  function thumbsHTML(name, list) {
    return list.map(function (src, i) {
      return '<figure><img src="' + src + '" alt="手写稿 ' + (i + 1) + '">' +
             '<button type="button" data-rmphoto="' + esc(name) + '" data-i="' + i + '" title="移除">×</button></figure>';
    }).join('');
  }

  function dictHTML(lesson, stepNo) {
    var d = lesson.dictation, base = 'L' + lesson.id + '.dict';
    var h = '<section class="card" id="sec-dict">';
    h += '<h3><span class="step-tag">Step ' + stepNo + '</span>' + esc(d.title) + '　<span class="muted">' + esc(d.total) + '</span></h3>';
    h += '<p class="lead">' + esc(d.note) + '</p>';
    d.rounds.forEach(function (r, ri) {
      h += '<details class="round"' + (ri === 0 ? ' open' : '') + '><summary>' + esc(r.name) +
           '　<span class="muted" style="font-weight:400">' + r.items.length + ' 项</span></summary><table class="words"><tbody>';
      r.items.forEach(function (it, i) {
        h += '<tr><td class="n">' + (i + 1) + '</td><td class="en">' + esc(it[0]) + '</td><td class="zh">' + esc(it[1]) + '</td></tr>';
      });
      h += '</tbody></table></details>';
    });
    h += '<h4 class="sub">我的听写成绩（自己填，供助教存档）</h4><div class="scores">';
    d.rounds.forEach(function (r, ri) {
      h += '<span class="f">Round ' + (ri + 1) + '　' +
           input(base + '.r' + ri, '') + ' / ' + r.max + '</span>';
    });
    h += '</div>';
    h += fieldHTML({ key: 'hard', kind: 'para', rows: 3, label: '写错／没记住的词（可选，方便自己复盘）',
      placeholder: '把这次错的词抄在这里' }, base);
    h += confirmBar(lesson, 'dict', d.title);
    return h + '</section>';
  }

  function hwHTML(lesson, hw, stepNo) {
    var base = 'L' + lesson.id + '.hw' + hw.n;
    var h = '<section class="card" id="sec-hw' + hw.n + '">';
    h += '<h3><span class="step-tag">Step ' + stepNo + '</span>作业 ' + hw.n + '：' + esc(hw.title) + '</h3>';
    h += '<p class="brief">' + esc(hw.brief) + '</p>';
    if (hw.bullets) h += '<ul class="plain">' + hw.bullets.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>';
    if (hw.quote) h += '<div class="script">' + esc(hw.quote) + '</div>';
    if (hw.list) h += '<div class="script plain">' + hw.list.map(function (b) { return esc(b); }).join('<br>') + '</div>';
    if (hw.table) {
      h += '<table class="data"><thead><tr>' + hw.table.head.map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr></thead><tbody>';
      hw.table.rows.forEach(function (r) {
        h += '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
      });
      h += '</tbody></table>';
    }
    if (hw.note) h += '<p class="muted" style="margin-top:8px">' + esc(hw.note) + '</p>';
    h += '<div class="submit-line">需提交：<b>' + esc(hw.submit) + '</b></div>';
    hw.fields.forEach(function (f) { h += fieldHTML(f, base); });
    h += confirmBar(lesson, 'hw' + hw.n, '作业 ' + hw.n);
    return h + '</section>';
  }

  function progressHTML(lesson) {
    var secs = sectionsOf(lesson);
    var done = secs.filter(function (s) { return state.c[ckey(lesson, s.key)]; }).length;
    var pct = Math.round(done / secs.length * 100);
    var h = '<div class="progress"><div class="top"><span><b>' + esc(lesson.name) + '</b> 提交进度</span>' +
            '<span class="muted">' + done + ' / ' + secs.length + ' 项已确认</span></div>' +
            '<div class="bar"><span style="width:' + pct + '%"></span></div><div class="steps">';
    secs.forEach(function (s, i) {
      var isDone = !!state.c[ckey(lesson, s.key)];
      h += '<a href="#sec-' + s.key + '" class="' + (isDone ? 'done' : '') + '">' +
           (isDone ? '✓ ' : (i + 1) + '. ') + esc(s.label) + '</a>';
    });
    return h + '</div></div>';
  }

  function lessonHTML(lesson) {
    var h = '<div class="lesson-head"><div class="eyebrow">' + esc(lesson.name) + '</div>' +
            '<h2>' + esc(lesson.theme) + '</h2>' +
            '<div class="en">' + esc(lesson.themeEn) + '</div></div>';
    h += progressHTML(lesson);
    var step = 1;
    if (lesson.mock) { h += mockHTML(lesson, step++); }
    else if (lesson.mockNote) {
      h += '<section class="card"><h3>写作模考</h3><p class="lead">' + esc(lesson.mockNote) + '</p></section>';
    }
    h += dictHTML(lesson, step++);
    lesson.homework.forEach(function (hw) { h += hwHTML(lesson, hw, step++); });
    return h;
  }

  /* ------------------------------ shell ------------------------------ */

  var current = LESSONS[0].id;
  try {
    var last = localStorage.getItem(KEY + '/last');
    if (!ONLY && last && LESSONS.some(function (l) { return l.id === +last; })) current = +last;
  } catch (e) {}

  function lessonById(id) {
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return LESSONS[i];
    return LESSONS[0];
  }

  function renderTabs() {
    if (ONLY) return '';
    var h = '<nav class="lessons" aria-label="选择课次">';
    LESSONS.forEach(function (l) {
      var secs = sectionsOf(l);
      var done = secs.filter(function (s) { return state.c[ckey(l, s.key)]; }).length;
      h += '<button data-lesson="' + l.id + '" aria-current="' + (l.id === current) + '">' + esc(l.name) +
           (done ? '<span class="dot" title="' + done + ' / ' + secs.length + ' 已确认"></span>' : '') + '</button>';
    });
    return h + '</nav>';
  }

  function renderHeader() {
    var h = '<div class="brand"><h1>' + esc(COURSE.title) + '</h1><span class="sub">' + esc(COURSE.subtitle) +
            (ONLY ? '　·　' + esc(lessonById(ONLY).name) : '') + '</span></div>';
    h += '<div class="disclaimer">' + esc(COURSE.note) + '</div>';
    h += renderTabs();
    return h;
  }

  function renderStudent() {
    return '<div class="student">' +
      '<div class="f"><label for="s-name">学生姓名</label>' +
        '<input id="s-name" type="text" data-student="name" value="' + esc(state.student.name) + '" placeholder="请填写你的姓名"></div>' +
      '<div class="f"><label for="s-date">日期</label>' +
        '<input id="s-date" type="date" data-student="date" value="' + esc(state.student.date || todayISO()) + '"></div>' +
      '</div>';
  }

  function render() {
    document.getElementById('site-head').innerHTML = renderHeader();
    var lesson = lessonById(current);
    document.getElementById('app-body').innerHTML = renderStudent() + lessonHTML(lesson);
    renderFoot();
    try { if (!ONLY) localStorage.setItem(KEY + '/last', String(current)); } catch (e) {}
  }

  function renderFoot() {
    var lesson = lessonById(current);
    var secs = sectionsOf(lesson);
    var done = secs.filter(function (s) { return state.c[ckey(lesson, s.key)]; }).length;
    var next = null;
    for (var i = 0; i < secs.length; i++) {
      if (!state.c[ckey(lesson, secs[i].key)]) { next = secs[i]; break; }
    }
    var msg = next
      ? '下一步：' + next.label + '（' + done + ' / ' + secs.length + ' 已确认）'
      : lesson.name + ' 的 ' + secs.length + ' 项全部确认完成，可以生成报告了。';
    var h = '<div class="inner"><div class="status">' + esc(msg) + '</div>';
    if (next) h += '<button class="btn ghost" data-goto="sec-' + next.key + '">跳到下一步</button>';
    h += '<button class="btn" data-report="one">生成本课报告</button>';
    if (!ONLY) h += '<button class="btn ghost" data-report="all">全部课次报告</button>';
    h += '<span class="saved" id="saved"></span></div>';
    document.getElementById('footbar').innerHTML = h;
  }

  /* ------------------------------ events ------------------------------ */

  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset && t.dataset.name !== undefined) {
      state.v[t.dataset.name] = t.value;
      save();
    } else if (t.dataset && t.dataset.student) {
      state.student[t.dataset.student] = t.value;
      save();
    }
  });

  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.type === 'checkbox' && t.dataset.name !== undefined) {
      state.v[t.dataset.name] = t.checked ? '1' : '';
      save();
    } else if (t.type === 'radio' && t.dataset.name !== undefined) {
      state.v[t.dataset.name] = t.value;
      [].forEach.call(document.querySelectorAll('[data-prompt-wrap]'), function (w) {
        var r = w.querySelector('input[type=radio]');
        w.classList.toggle('on', !!(r && r.checked));
      });
      save();
    } else if (t.dataset.photo !== undefined) {
      handlePhotos(t);
    } else if (t.tagName === 'SELECT' && t.dataset.name !== undefined) {
      state.v[t.dataset.name] = t.value;
      save();
    }
  });

  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('button') : null;
    if (!b) return;

    if (b.dataset.lesson) {
      current = +b.dataset.lesson;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (b.dataset.confirm) {
      var key = b.dataset.confirm;
      state.c[key] = nowISO();
      save();
      var r = document.querySelector('[data-receipt="' + key + '"]');
      if (r) { r.textContent = '✓ 已收到 · ' + state.c[key]; r.classList.remove('none'); }
      b.textContent = '重新确认提交';
      refreshProgress();
      if (!ONLY) document.getElementById('site-head').innerHTML = renderHeader();
      renderFoot();
      stamp('已记录提交时间 ' + state.c[key]);
    } else if (b.dataset.goto) {
      var el = document.getElementById(b.dataset.goto);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (b.dataset.report) {
      openReport(b.dataset.report === 'all');
    } else if (b.dataset.rmphoto !== undefined) {
      var nm = b.dataset.rmphoto;
      (state.p[nm] || []).splice(+b.dataset.i, 1);
      var box = document.querySelector('[data-thumbs="' + nm + '"]');
      if (box) box.innerHTML = thumbsHTML(nm, state.p[nm] || []);
      save();
    } else if (b.id === 'report-close') {
      document.body.classList.remove('report-open');
      window.scrollTo(0, 0);
    } else if (b.id === 'report-print') {
      window.print();
    }
  });

  function refreshProgress() {
    var old = document.querySelector('.progress');
    if (!old) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = progressHTML(lessonById(current));
    old.replaceWith(tmp.firstChild);
  }

  /* ------------------------------ photos ------------------------------ */

  function handlePhotos(inputEl) {
    var name = inputEl.dataset.photo;
    var files = [].slice.call(inputEl.files || []);
    if (!files.length) return;
    state.p[name] = state.p[name] || [];
    var pending = files.length;
    files.forEach(function (file) {
      if (!/^image\//.test(file.type)) { if (!--pending) done(); return; }
      var reader = new FileReader();
      reader.onload = function () {
        shrink(reader.result, function (small) {
          state.p[name].push(small);
          if (!--pending) done();
        });
      };
      reader.onerror = function () { if (!--pending) done(); };
      reader.readAsDataURL(file);
    });
    function done() {
      var box = document.querySelector('[data-thumbs="' + name + '"]');
      if (box) box.innerHTML = thumbsHTML(name, state.p[name]);
      inputEl.value = '';
      save();
    }
  }

  function shrink(dataURL, cb) {
    var img = new Image();
    img.onload = function () {
      var max = 1400;
      var scale = Math.min(1, max / Math.max(img.width, img.height));
      var c = document.createElement('canvas');
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      try { cb(c.toDataURL('image/jpeg', 0.72)); } catch (e) { cb(dataURL); }
    };
    img.onerror = function () { cb(dataURL); };
    img.src = dataURL;
  }

  /* ------------------------------ report ------------------------------ */

  function ans(name) {
    var v = String(val(name)).trim();
    return v ? '<div class="a">' + esc(v) + '</div>' : '<div class="a empty">（未填写）</div>';
  }
  function qa(q, name) {
    return '<div class="block"><div class="q">' + esc(q) + '</div>' + ans(name) + '</div>';
  }

  function reportField(f, base) {
    var name = base + '.' + f.key, h = '';
    var title = f.label ? '<h3>' + esc(f.label) + '</h3>' : '';

    if (f.kind === 'line' || f.kind === 'para') {
      h += '<div class="block">' + title + ans(name) + '</div>';
    } else if (f.kind === 'lines' || f.kind === 'paras') {
      h += '<div class="block">' + title + '<ol class="answers">';
      for (var i = 0; i < f.count; i++) {
        var lab = f.itemLabels ? esc(f.itemLabels[i]) + '：' : '';
        h += '<li>' + lab + (has(name + '.' + i) ? esc(val(name + '.' + i)) : '<i>（未填写）</i>') + '</li>';
      }
      h += '</ol></div>';
    } else if (f.kind === 'pairs') {
      h += '<div class="block">' + title + '<ol class="answers">';
      for (var k = 0; k < f.count; k++) {
        var a = val(name + '.' + k + '.a'), b = val(name + '.' + k + '.b');
        h += '<li>' + (a || b ? '<b>' + esc(a) + '</b>' + (b ? ' — ' + esc(b) : '') : '<i>（未填写）</i>') + '</li>';
      }
      h += '</ol></div>';
    } else if (f.kind === 'choice') {
      h += '<div class="block">' + title + ans(name) + '</div>';
    } else if (f.kind === 'checks') {
      h += '<div class="block">' + title + '<ol class="answers">';
      f.options.forEach(function (opt, oi) {
        h += '<li>' + (val(name + '.' + oi) ? '☑' : '☐') + ' ' + esc(opt) + '</li>';
      });
      h += '</ol></div>';
    } else if (f.kind === 'group') {
      h += title;
      f.items.forEach(function (item, ii) {
        h += '<div class="block"><div class="q">' + esc(item.heading) + '</div>';
        f.sub.forEach(function (s) {
          var n3 = name + '.' + ii + '.' + s.key;
          h += '<div class="kv"><b>' + esc(s.label) + '：</b>' +
               (has(n3) ? esc(val(n3)) : '<i>（未填写）</i>') + '</div>';
        });
        h += '</div>';
      });
    }
    return h;
  }

  function reportLesson(lesson) {
    var h = '<h2>' + esc(lesson.name) + '　' + esc(lesson.theme) + '</h2>';

    if (lesson.mock) {
      var mb = 'L' + lesson.id + '.mock';
      var ck = state.c[ckey(lesson, 'mock')];
      h += '<h3>' + esc(lesson.mock.title) + '</h3>';
      h += '<div class="stamp">' + (ck ? '已确认提交 · ' + esc(ck) : '未确认提交') + '</div>';
      var chosen = val(mb + '.prompt');
      var pText = '';
      lesson.mock.prompts.forEach(function (p) { if (p.label === chosen) pText = p.text; });
      h += '<div class="block"><div class="kv"><b>选用题目：</b>' + (chosen ? esc(chosen) : '<i>（未选择）</i>') + '</div>';
      if (pText) h += '<div class="a">' + esc(pText) + '</div>';
      h += '<div class="kv"><b>完成用时：</b>' + (has(mb + '.time') ? esc(val(mb + '.time')) : '<i>（未填写）</i>') + '</div>';
      h += '<div class="kv"><b>总字数：</b>' + (has(mb + '.words') ? esc(val(mb + '.words')) : '<i>（未填写）</i>') + '</div></div>';
      h += '<div class="block"><div class="q">作文誊写</div>' + ans(mb + '.essay') + '</div>';
      var pics = state.p[mb + '.photo'] || [];
      if (pics.length) {
        h += '<div class="block"><div class="q">手写稿照片</div><div class="imgs">' +
             pics.map(function (s) { return '<img src="' + s + '" alt="手写稿">'; }).join('') + '</div></div>';
      }
      if (has(mb + '.note')) h += qa('想让助教留意的地方', mb + '.note');
    } else if (lesson.mockNote) {
      h += '<h3>写作模考</h3><div class="a">' + esc(lesson.mockNote) + '</div>';
    }

    var db = 'L' + lesson.id + '.dict';
    var dck = state.c[ckey(lesson, 'dict')];
    h += '<h3>' + esc(lesson.dictation.title) + '（' + esc(lesson.dictation.total) + '）</h3>';
    h += '<div class="stamp">' + (dck ? '已确认提交 · ' + esc(dck) : '未确认提交') + '</div>';
    h += '<div class="block"><ol class="answers">';
    lesson.dictation.rounds.forEach(function (r, ri) {
      var v = val(db + '.r' + ri);
      h += '<li>' + esc(r.name) + '：' + (v ? esc(v) : '__') + ' / ' + r.max + '</li>';
    });
    h += '</ol></div>';
    if (has(db + '.hard')) h += qa('写错／没记住的词', db + '.hard');

    lesson.homework.forEach(function (hw) {
      var hck = state.c[ckey(lesson, 'hw' + hw.n)];
      var hb = 'L' + lesson.id + '.hw' + hw.n;
      h += '<h3>作业 ' + hw.n + '：' + esc(hw.title) + '</h3>';
      h += '<div class="stamp">' + (hck ? '已确认提交 · ' + esc(hck) : '未确认提交') +
           '　|　需提交：' + esc(hw.submit) + '</div>';
      hw.fields.forEach(function (f) { h += reportField(f, hb); });
    });

    return h;
  }

  function openReport(all) {
    flush();
    var list = all ? LESSONS : [lessonById(current)];
    var name = (state.student.name || '').trim() || '（未填写姓名）';
    var date = state.student.date || todayISO();

    var total = 0, done = 0;
    list.forEach(function (l) {
      var secs = sectionsOf(l);
      total += secs.length;
      done += secs.filter(function (s) { return state.c[ckey(l, s.key)]; }).length;
    });

    var h = '<div class="report-bar"><div class="inner">' +
      '<button class="btn" id="report-print">打印 / 保存为 PDF</button>' +
      '<button class="btn ghost" id="report-close">返回继续填写</button>' +
      '<span class="hint">在打印对话框中选择「另存为 PDF」即可保存这份报告。</span>' +
      '</div></div>';

    h += '<div class="sheet">';
    h += '<h1>' + esc(COURSE.title) + ' · 课后作业提交报告</h1>';
    h += '<div class="meta">' + esc(COURSE.subtitle) + '</div>';
    h += '<div class="meta-grid">' +
      '<span><b>学生姓名：</b>' + esc(name) + '</span>' +
      '<span><b>日期：</b>' + esc(date) + '</span>' +
      '<span><b>课次：</b>' + esc(list.map(function (l) { return l.name; }).join('、')) + '</span>' +
      '<span><b>确认提交：</b>' + done + ' / ' + total + ' 项</span>' +
      '<span><b>生成时间：</b>' + esc(nowISO()) + '</span></div>';
    h += '<hr>';
    list.forEach(function (l) { h += reportLesson(l); });
    h += '<div class="foot">本报告由学生本人填写并确认提交，内容原样收录，未经批改、评分或修改。</div>';
    h += '</div>';

    document.getElementById('report').innerHTML = h;
    document.body.classList.add('report-open');
    window.scrollTo(0, 0);
    if (photosInMemory) {
      stamp('提醒：照片未能保存到浏览器，请现在就把报告存为 PDF。');
    }
  }

  /* ------------------------------ go ------------------------------ */

  if (!state.student.date) state.student.date = todayISO();
  render();
})();
