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

    var parts = {};
    try {
      new Intl.DateTimeFormat('en-US', {
        timeZone: TZ,
        year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short'
      }).formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    } catch (e) {
      return; // Intl/timeZone 未対応環境では静的表示のまま
    }

    var ja = { Sun:'日', Mon:'月', Tue:'火', Wed:'水', Thu:'木', Fri:'金', Sat:'土' };
    var isClosed = CLOSED_DAYS.indexOf(parts.weekday) !== -1;

    dateEl.textContent = parts.year + '.' + parts.month + '.' + parts.day +
                         ' (' + (ja[parts.weekday] || '') + ')';
    stateEl.textContent = isClosed ? '本日は定休日です' : '本日は 17:00 OPEN の予定です';
    stateEl.setAttribute('data-open', isClosed ? 'false' : 'true');
  }

  /* ----------------------------------------------------------
     02. モバイルメニュー
     ---------------------------------------------------------- */
  function bindMenu() {
    var burger = document.querySelector('[data-burger]');
    var nav = document.getElementById('nav');
    var scrim = document.querySelector('[data-scrim]');
    if (!burger || !nav) return;

    function setOpen(open) {
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('is-open', open);
      if (scrim) scrim.hidden = !open;
      burger.querySelector('.sr-only').textContent = open ? 'メニューを閉じる' : 'メニューを開く';
    }

    burger.addEventListener('click', function () {
      setOpen(burger.getAttribute('aria-expanded') !== 'true');
    });
    if (scrim) scrim.addEventListener('click', function () { setOpen(false); });

    // リンク選択後は閉じる
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        burger.focus();
      }
    });

    // デスクトップ幅に戻ったらドロワー状態を解除
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 1024px)');
      var onChange = function (ev) { if (ev.matches) setOpen(false); };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ----------------------------------------------------------
     03. モバイル固定CTA
     ヒーローを過ぎたら表示。最終CTAと重なる位置では隠す。
     ---------------------------------------------------------- */
  function bindSticky() {
    var sticky = document.querySelector('[data-sticky]');
    var hero = document.querySelector('.hero');
    var finalCta = document.querySelector('.final');
    if (!sticky || !hero) return;

    if (!('IntersectionObserver' in window)) {
      sticky.classList.add('is-visible');
      return;
    }

    var pastHero = false, atFinal = false;
    function apply() { sticky.classList.toggle('is-visible', pastHero && !atFinal); }

    new IntersectionObserver(function (es) {
      pastHero = !es[0].isIntersecting; apply();
    }, { rootMargin: '-120px 0px 0px 0px' }).observe(hero);

    if (finalCta) {
      new IntersectionObserver(function (es) {
        atFinal = es[0].isIntersecting; apply();
      }, { rootMargin: '0px 0px -35% 0px' }).observe(finalCta);
    }
  }

  /* ----------------------------------------------------------
     04. スクロール表示（控えめ／prefers-reduced-motion を尊重）
     JSでクラスを付与するため、JS無効時に非表示にならない。
     ---------------------------------------------------------- */
  function bindReveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.hero__body, .today__card, .today__figure, .feature__inner > *,' +
      '.menu__head, .menu__list, .menu__figure, .daily__figure, .daily__body,' +
      '.reserve__inner > *, .steps__i, .pickup__body, .access__body, .access__figure,' +
      '.faq__inner > *, .ig__inner > *, .final__inner > *'
    );
    if (!targets.length) return;

    var pending = [];
    function show(el) {
      el.classList.add('is-in');
      io.unobserve(el);
      var i = pending.indexOf(el);
      if (i !== -1) pending.splice(i, 1);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) show(en.target); });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(targets, function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 55) + 'ms';
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
    bindMenu();
    bindSticky();
    bindReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
