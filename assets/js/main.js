/* ============================================================
   燻製塩焼鳥 けむり｜RIKKUN WEB STUDIO 提案用デモ
   ライブラリ非依存。アニメーションは最小限。
   固定CTAは常時表示のため、JSでは制御しない。
   ============================================================ */
(function () {
  'use strict';

  /* モバイルメニュー */
  function menu() {
    var b = document.querySelector('[data-burger]');
    var nav = document.getElementById('nav');
    var scrim = document.querySelector('[data-scrim]');
    if (!b || !nav) return;

    function set(open) {
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
      nav.classList.toggle('open', open);
      if (scrim) scrim.hidden = !open;
      b.querySelector('.sr').textContent = open ? 'メニューを閉じる' : 'メニューを開く';
    }
    b.addEventListener('click', function () { set(b.getAttribute('aria-expanded') !== 'true'); });
    if (scrim) scrim.addEventListener('click', function () { set(false); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') { set(false); b.focus(); }
    });
    if (window.matchMedia) {
      var mq = window.matchMedia('(min-width: 1080px)');
      var fn = function (ev) { if (ev.matches) set(false); };
      if (mq.addEventListener) mq.addEventListener('change', fn);
      else if (mq.addListener) mq.addListener(fn);
    }
  }

  /* ページ上部へ戻る：ヒーローを過ぎたら表示 */
  function toTop() {
    var el = document.querySelector('[data-top]');
    var hero = document.querySelector('.hero');
    if (!el || !hero || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(function (e) {
      el.classList.toggle('on', !e[0].isIntersecting);
    }, { rootMargin: '-100px 0px 0px 0px' }).observe(hero);
  }

  /* scroll reveal（控えめ／reduced-motion では無効） */
  function reveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var t = document.querySelectorAll(
      '.hero__in > *, .first .sn, .first .h2, .first .lead, .steps__i, .first__cta, .first .warn,' +
      '.about__in > *, .menu .sn, .menu .h2, .menu .lead, .menu__g > *,' +
      '.today__b, .ph--today, .order > .wrap > *, .pick__b, .ph--pick,' +
      '.acc > .wrap > *, .ig > .wrap > *, .fin__in > *'
    );
    if (!t.length) return;

    var wait = [];
    function show(el) {
      el.classList.add('in');
      io.unobserve(el);
      var i = wait.indexOf(el); if (i !== -1) wait.splice(i, 1);
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) show(e.target); });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(t, function (el, i) {
      el.classList.add('rv');
      el.style.transitionDelay = (Math.min(i % 3, 2) * 50) + 'ms';
      wait.push(el);
      io.observe(el);
    });

    // 保険：高速スクロールやアンカー移動で通過した要素を確実に表示
    var q = false;
    function sweep() {
      q = false;
      for (var i = wait.length - 1; i >= 0; i--) {
        if (wait[i].getBoundingClientRect().top < window.innerHeight) show(wait[i]);
      }
      if (!wait.length) {
        window.removeEventListener('scroll', on);
        window.removeEventListener('resize', on);
      }
    }
    function on() { if (q) return; q = true; window.requestAnimationFrame(sweep); }
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    on();
  }

  function init() { menu(); toTop(); reveal(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
