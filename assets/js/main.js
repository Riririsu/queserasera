/* ============================================================
   燻製塩焼鳥 けむり ／ 営業提案用デモLP
   依存ライブラリなし。JS無効でも全コンテンツが読める設計。
   ============================================================ */
(function () {
  'use strict';

  var TZ = 'Asia/Tokyo';
  var CLOSED_DAYS = ['Tue', 'Wed']; // 火・水休み（確認済み）

  /* ----------------------------------------------------------
     01. TODAY
     定休日（火・水）と営業時間（17:00-22:00）のみから算出する。
     「売切れ次第CLOSE」のため、営業中かどうかは断定しない。
     ---------------------------------------------------------- */
  function renderToday() {
    var dateEl = document.querySelector('[data-today-date]');
    var stateEl = document.querySelector('[data-today-state]');
    if (!dateEl || !stateEl) return;

    var now = new Date();
    var parts = {};
    try {
      new Intl.DateTimeFormat('en-US', {
        timeZone: TZ,
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
      }).formatToParts(now).forEach(function (p) { parts[p.type] = p.value; });
    } catch (e) {
      return; // 環境が Intl/timeZone 未対応なら静的表示のまま
    }

    var weekdayJa = { Sun:'日', Mon:'月', Tue:'火', Wed:'水', Thu:'木', Fri:'金', Sat:'土' };
    var wd = parts.weekday;
    var isClosed = CLOSED_DAYS.indexOf(wd) !== -1;

    dateEl.textContent =
      parts.year + '.' + parts.month + '.' + parts.day + ' (' + (weekdayJa[wd] || '') + ')';

    stateEl.textContent = isClosed
      ? '本日は定休日です'
      : '本日は 17:00 OPEN の予定です';
    stateEl.setAttribute('data-open', isClosed ? 'false' : 'true');
  }

  /* ----------------------------------------------------------
     02. 固定CTA / トップバーの表示制御
     ヒーローを過ぎたら表示。最終CTAと重なる位置では隠す。
     ---------------------------------------------------------- */
  function bindStickyUi() {
    var topbar = document.querySelector('[data-topbar]');
    var sticky = document.querySelector('[data-stickycta]');
    var hero = document.querySelector('.hero');
    var finalCta = document.querySelector('.finalcta');
    if (!hero) return;

    var pastHero = false;
    var atFinal = false;

    function apply() {
      var show = pastHero && !atFinal;
      if (topbar) topbar.classList.toggle('is-visible', show);
      if (sticky) sticky.classList.toggle('is-visible', show);
    }

    if (!('IntersectionObserver' in window)) {
      if (topbar) topbar.classList.add('is-visible');
      if (sticky) sticky.classList.add('is-visible');
      return;
    }

    new IntersectionObserver(function (entries) {
      pastHero = !entries[0].isIntersecting;
      apply();
    }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero);

    if (finalCta) {
      new IntersectionObserver(function (entries) {
        atFinal = entries[0].isIntersecting;
        apply();
      }, { rootMargin: '0px 0px -40% 0px' }).observe(finalCta);
    }
  }

  /* ----------------------------------------------------------
     03. スクロール表示（控えめ／prefers-reduced-motion を尊重）
     JSでクラスを付与するため、JS無効時に非表示にならない。
     ---------------------------------------------------------- */
  function bindReveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.hero__figure, .hero__body, .section__index, .section__title, .section__sub,' +
      '.today, .feature, .shinagaki, .menu__daily-link, .daily, .steps,' +
      '.section--reserve .btn, .notice, .pickup__text, .pickup__sub, .access,' +
      '.faq, .iggrid, .ig__handle, .section--instagram .btn, .finalcta__title,' +
      '.finalcta .hours, .finalcta .btn'
    );

    var pending = [];

    function show(el) {
      el.classList.add('is-in');
      io.unobserve(el);
      var i = pending.indexOf(el);
      if (i !== -1) pending.splice(i, 1);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) show(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      pending.push(el);
      io.observe(el);
    });

    // 保険：高速スクロールやアンカー移動でIntersectionObserverが
    // 発火しないまま通過した要素を、確実に表示させる。
    var ticking = false;
    function sweep() {
      ticking = false;
      for (var i = pending.length - 1; i >= 0; i--) {
        if (pending[i].getBoundingClientRect().top < window.innerHeight) show(pending[i]);
      }
      if (!pending.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(sweep);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  function init() {
    renderToday();
    bindStickyUi();
    bindReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
