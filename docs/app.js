// ========== State ==========
const state = {
  currentBook: 'Genesis',
  pages: [],           // Array of { words: string[], reference: string }
  pageIndex: 0,
  highlights: {},      // key: "pageIndex-wordIndex" => color
  bookmarks: new Set(),
  highlightColor: null, // null | 'yellow' | 'green' | 'blue'
  fontSize: 18,
  darkMode: false,
};

// ========== DOM refs ==========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const cardContainer = $('#card-container');
const bookSelect = $('#book-select');
const currentPageEl = $('#current-page');
const totalPagesEl = $('#total-pages');
const bookmarkToast = $('#bookmark-toast');
const swipeHint = $('#swipe-hint');

// ========== Persistence ==========
function save() {
  const data = {
    currentBook: state.currentBook,
    pageIndex: state.pageIndex,
    highlights: state.highlights,
    bookmarks: [...state.bookmarks],
    fontSize: state.fontSize,
    darkMode: state.darkMode,
  };
  localStorage.setItem('bible-swipe', JSON.stringify(data));
}

function load() {
  try {
    const raw = localStorage.getItem('bible-swipe');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data.currentBook) state.currentBook = data.currentBook;
    if (typeof data.pageIndex === 'number') state.pageIndex = data.pageIndex;
    if (data.highlights) state.highlights = data.highlights;
    if (data.bookmarks) state.bookmarks = new Set(data.bookmarks);
    if (data.fontSize) state.fontSize = data.fontSize;
    if (typeof data.darkMode === 'boolean') state.darkMode = data.darkMode;
  } catch (e) { /* ignore corrupt data */ }
}

// ========== Bible text chunking ==========
function buildPages(bookName) {
  const book = BIBLE_BOOKS[bookName];
  if (!book) return [];
  const pages = [];
  const chapterNums = Object.keys(book.chapters).map(Number).sort((a, b) => a - b);

  for (const chNum of chapterNums) {
    const verses = book.chapters[chNum];
    // Collect all words with verse tracking
    const allWords = [];
    verses.forEach((verse, vi) => {
      const words = verse.split(/\s+/).filter(w => w.length > 0);
      words.forEach(w => allWords.push({ word: w, verse: vi + 1, chapter: chNum }));
    });

    // Chunk into pages of 15 words
    for (let i = 0; i < allWords.length; i += 15) {
      const chunk = allWords.slice(i, i + 15);
      const startVerse = chunk[0].verse;
      const endVerse = chunk[chunk.length - 1].verse;
      const ref = startVerse === endVerse
        ? `${bookName} ${chNum}:${startVerse}`
        : `${bookName} ${chNum}:${startVerse}-${endVerse}`;
      pages.push({
        words: chunk.map(c => c.word),
        reference: ref,
        book: bookName,
        chapter: chNum,
      });
    }
  }
  return pages;
}

// ========== Card rendering ==========
function createCard(pageIdx) {
  const page = state.pages[pageIdx];
  if (!page) return null;

  const card = document.createElement('div');
  card.className = 'bible-card entering';
  card.dataset.pageIndex = pageIdx;

  // Swipe indicators
  card.innerHTML = `
    <div class="swipe-indicator left">Back</div>
    <div class="swipe-indicator right">Next</div>
    <div class="swipe-indicator up">Save</div>
    <div class="card-reference">${page.reference}</div>
    <div class="card-text"></div>
  `;

  const textEl = card.querySelector('.card-text');
  page.words.forEach((word, wi) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word + ' ';
    span.dataset.wordIndex = wi;

    // Apply saved highlight
    const hlKey = `${pageIdx}-${wi}`;
    if (state.highlights[hlKey]) {
      span.classList.add('hl-' + state.highlights[hlKey]);
    }

    // Tap to highlight
    span.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!state.highlightColor) return;
      if (state.highlightColor === 'none') {
        delete state.highlights[hlKey];
        span.className = 'word';
      } else {
        state.highlights[hlKey] = state.highlightColor;
        span.className = 'word hl-' + state.highlightColor;
      }
      save();
    });

    textEl.appendChild(span);
  });

  card.style.setProperty('--card-font-size', state.fontSize + 'px');
  return card;
}

function renderCard() {
  // Remove existing cards
  cardContainer.querySelectorAll('.bible-card').forEach(c => c.remove());

  const card = createCard(state.pageIndex);
  if (!card) return;
  cardContainer.appendChild(card);
  setupSwipe(card);
  updatePageIndicator();

  // Hide hint after first interaction
  setTimeout(() => swipeHint.classList.add('hidden'), 3000);
}

function updatePageIndicator() {
  currentPageEl.textContent = state.pageIndex + 1;
  totalPagesEl.textContent = state.pages.length;
  updateProgress();
}

// ========== Swipe gestures ==========
function setupSwipe(card) {
  let startX = 0, startY = 0, currentX = 0, currentY = 0;
  let isDragging = false;
  let isWordTap = false;

  function onStart(e) {
    // Check if tap started on a word (for highlighting)
    if (e.target.classList.contains('word') && state.highlightColor) {
      isWordTap = true;
      return;
    }
    isWordTap = false;
    isDragging = true;
    const point = e.touches ? e.touches[0] : e;
    startX = point.clientX;
    startY = point.clientY;
    currentX = 0;
    currentY = 0;
    card.style.transition = 'none';
  }

  function onMove(e) {
    if (!isDragging) return;
    e.preventDefault();
    const point = e.touches ? e.touches[0] : e;
    currentX = point.clientX - startX;
    currentY = point.clientY - startY;

    const rotate = currentX * 0.08;
    card.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${rotate}deg)`;

    // Show indicators
    const leftInd = card.querySelector('.swipe-indicator.left');
    const rightInd = card.querySelector('.swipe-indicator.right');
    const upInd = card.querySelector('.swipe-indicator.up');

    leftInd.style.opacity = currentX < -40 ? Math.min(1, (-currentX - 40) / 60) : 0;
    rightInd.style.opacity = currentX > 40 ? Math.min(1, (currentX - 40) / 60) : 0;
    upInd.style.opacity = currentY < -40 ? Math.min(1, (-currentY - 40) / 60) : 0;
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;

    const threshold = 80;
    const yThreshold = 100;

    if (currentY < -yThreshold && Math.abs(currentX) < threshold) {
      // Swipe UP — bookmark
      card.style.transition = 'all 0.3s ease-out';
      card.style.animation = 'flyUp 0.3s forwards';
      toggleBookmark();
      setTimeout(renderCard, 300);
    } else if (currentX > threshold) {
      // Swipe RIGHT — next page
      card.style.transition = 'all 0.3s ease-out';
      card.style.animation = 'flyRight 0.3s forwards';
      setTimeout(() => {
        if (state.pageIndex < state.pages.length - 1) state.pageIndex++;
        renderCard();
        save();
      }, 280);
    } else if (currentX < -threshold) {
      // Swipe LEFT — previous page
      card.style.transition = 'all 0.3s ease-out';
      card.style.animation = 'flyLeft 0.3s forwards';
      setTimeout(() => {
        if (state.pageIndex > 0) state.pageIndex--;
        renderCard();
        save();
      }, 280);
    } else {
      // Snap back
      card.style.transition = 'transform 0.3s ease-out';
      card.style.transform = '';
      card.querySelectorAll('.swipe-indicator').forEach(i => {
        i.style.transition = 'opacity 0.2s';
        i.style.opacity = 0;
      });
    }
  }

  card.addEventListener('touchstart', onStart, { passive: true });
  card.addEventListener('touchmove', onMove, { passive: false });
  card.addEventListener('touchend', onEnd);
  card.addEventListener('mousedown', onStart);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onEnd);
}

// ========== Bookmarks ==========
function toggleBookmark() {
  const key = `${state.currentBook}:${state.pageIndex}`;
  if (state.bookmarks.has(key)) {
    state.bookmarks.delete(key);
  } else {
    state.bookmarks.add(key);
    showToast();
  }
  save();
}

function showToast() {
  bookmarkToast.classList.add('show');
  setTimeout(() => bookmarkToast.classList.remove('show'), 1200);
}

// ========== Highlight bar ==========
function setupHighlightBar() {
  $$('.hl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      if (state.highlightColor === color) {
        // Deselect
        state.highlightColor = null;
        btn.classList.remove('active');
      } else {
        state.highlightColor = color;
        $$('.hl-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  });
}

// ========== Navigation ==========
function setupNav() {
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view;
      $$('.nav-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $$('.view').forEach(v => v.classList.remove('active'));
      $(`#${view}-view`).classList.add('active');

      if (view === 'library') renderLibrary();
      if (view === 'reader') renderCard();
    });
  });

  // Set initial active
  $('.nav-btn[data-view="reader"]').classList.add('active');
}

// ========== Book selector ==========
function setupBookSelector() {
  // Build options: Book > Chapter
  bookSelect.innerHTML = '';
  for (const bookName of Object.keys(BIBLE_BOOKS)) {
    const chapters = Object.keys(BIBLE_BOOKS[bookName].chapters);
    for (const ch of chapters) {
      const opt = document.createElement('option');
      opt.value = `${bookName}|${ch}`;
      opt.textContent = `${bookName} ${ch}`;
      bookSelect.appendChild(opt);
    }
  }

  // Set current
  const page = state.pages[state.pageIndex];
  if (page) {
    bookSelect.value = `${page.book}|${page.chapter}`;
  }

  bookSelect.addEventListener('change', () => {
    const [book] = bookSelect.value.split('|');
    const chapter = parseInt(bookSelect.value.split('|')[1]);
    if (book !== state.currentBook) {
      state.currentBook = book;
      state.pages = buildPages(book);
    }
    // Find first page of selected chapter
    const idx = state.pages.findIndex(p => p.chapter === chapter);
    if (idx >= 0) state.pageIndex = idx;
    renderCard();
    save();
  });
}

// ========== Settings ==========
function setupSettings() {
  const darkToggle = $('#dark-mode-toggle');
  darkToggle.checked = state.darkMode;
  applyTheme();

  darkToggle.addEventListener('change', () => {
    state.darkMode = darkToggle.checked;
    applyTheme();
    save();
  });

  // Font size
  $('#font-size-display').textContent = state.fontSize + 'px';

  $('#font-increase').addEventListener('click', () => {
    if (state.fontSize < 28) {
      state.fontSize += 2;
      $('#font-size-display').textContent = state.fontSize + 'px';
      renderCard();
      save();
    }
  });

  $('#font-decrease').addEventListener('click', () => {
    if (state.fontSize > 12) {
      state.fontSize -= 2;
      $('#font-size-display').textContent = state.fontSize + 'px';
      renderCard();
      save();
    }
  });
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
}

function updateProgress() {
  const pct = state.pages.length > 0
    ? Math.round(((state.pageIndex + 1) / state.pages.length) * 100)
    : 0;
  $('#reading-progress').style.width = pct + '%';
  $('#progress-text').textContent = pct + '%';
}

// ========== Library ==========
function setupLibraryTabs() {
  $$('.lib-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      $$('.lib-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      $$('.lib-content').forEach(c => c.classList.remove('active'));
      $(`#${tab.dataset.tab}-list`).classList.add('active');
    });
  });
}

function renderLibrary() {
  renderHighlightsList();
  renderBookmarksList();
}

function renderHighlightsList() {
  const container = $('#highlights-list');
  const keys = Object.keys(state.highlights);

  if (keys.length === 0) {
    container.innerHTML = '<div class="lib-empty">No highlights yet. Tap a highlight color, then tap words while reading.</div>';
    return;
  }

  // Group highlights by page
  const grouped = {};
  for (const key of keys) {
    const [pageIdx] = key.split('-').map(Number);
    if (!grouped[pageIdx]) grouped[pageIdx] = [];
    grouped[pageIdx].push(key);
  }

  let html = '';
  for (const pageIdx of Object.keys(grouped).sort((a, b) => a - b)) {
    const page = state.pages[parseInt(pageIdx)];
    if (!page) continue;

    const highlightedWords = grouped[pageIdx].map(key => {
      const wi = parseInt(key.split('-')[1]);
      const color = state.highlights[key];
      return `<span class="hl-preview hl-${color}">${page.words[wi]}</span>`;
    }).join(' ');

    html += `
      <div class="lib-item" data-page="${pageIdx}">
        <button class="delete-btn" data-keys='${JSON.stringify(grouped[pageIdx])}' title="Remove">&times;</button>
        <div class="lib-ref">${page.reference}</div>
        <div class="lib-text">${highlightedWords}</div>
      </div>`;
  }

  container.innerHTML = html;

  // Click to navigate
  container.querySelectorAll('.lib-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) return;
      state.pageIndex = parseInt(item.dataset.page);
      switchToView('reader');
      save();
    });
  });

  // Delete buttons
  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const keys = JSON.parse(btn.dataset.keys);
      keys.forEach(k => delete state.highlights[k]);
      save();
      renderHighlightsList();
    });
  });
}

function renderBookmarksList() {
  const container = $('#bookmarks-list');
  const bookmarks = [...state.bookmarks];

  if (bookmarks.length === 0) {
    container.innerHTML = '<div class="lib-empty">No bookmarks yet. Swipe up on a page to bookmark it.</div>';
    return;
  }

  let html = '';
  for (const bm of bookmarks) {
    const [bookName, pageIdxStr] = [bm.split(':').slice(0, -1).join(':'), bm.split(':').pop()];
    const pageIdx = parseInt(pageIdxStr);

    // We need to rebuild pages for that book to get info
    const pages = buildPages(bookName.split(':')[0] || bookName);
    const page = pages[pageIdx];
    if (!page) continue;

    html += `
      <div class="lib-item" data-book="${bookName}" data-page="${pageIdx}">
        <button class="delete-btn" data-bm="${bm}" title="Remove">&times;</button>
        <div class="lib-ref">${page.reference}</div>
        <div class="lib-text">${page.words.join(' ')}</div>
      </div>`;
  }

  container.innerHTML = html;

  container.querySelectorAll('.lib-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-btn')) return;
      const book = item.dataset.book;
      const pageIdx = parseInt(item.dataset.page);
      // Switch book if needed
      const actualBook = book.includes(':') ? book.split(':')[0] : book;
      if (actualBook !== state.currentBook) {
        state.currentBook = actualBook;
        state.pages = buildPages(actualBook);
      }
      state.pageIndex = pageIdx;
      switchToView('reader');
      save();
    });
  });

  container.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      state.bookmarks.delete(btn.dataset.bm);
      save();
      renderBookmarksList();
    });
  });
}

function switchToView(viewName) {
  $$('.nav-btn').forEach(b => b.classList.remove('active'));
  $(`.nav-btn[data-view="${viewName}"]`).classList.add('active');
  $$('.view').forEach(v => v.classList.remove('active'));
  $(`#${viewName}-view`).classList.add('active');
  if (viewName === 'reader') renderCard();
}

// ========== Keyboard support ==========
document.addEventListener('keydown', (e) => {
  if (!$('#reader-view').classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === 'd') {
    if (state.pageIndex < state.pages.length - 1) {
      state.pageIndex++;
      renderCard();
      save();
    }
  } else if (e.key === 'ArrowLeft' || e.key === 'a') {
    if (state.pageIndex > 0) {
      state.pageIndex--;
      renderCard();
      save();
    }
  } else if (e.key === 'ArrowUp' || e.key === 'b') {
    toggleBookmark();
    showToast();
  }
});

// ========== Init ==========
function init() {
  load();
  state.pages = buildPages(state.currentBook);

  // Clamp page index
  if (state.pageIndex >= state.pages.length) state.pageIndex = 0;

  setupNav();
  setupBookSelector();
  setupHighlightBar();
  setupLibraryTabs();
  setupSettings();
  renderCard();
}

init();
