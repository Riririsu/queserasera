/* ============================================================
   燻製塩焼鳥 けむり｜RIKKUN WEB STUDIO 提案用デモ
   ライブラリ非依存。JS無効でも全内容が読め、電話できる。
   アニメーションは必要最小限。
   ============================================================ */
(function () {
  'use strict';

  /* 固定CTA：ヒーローを過ぎたら表示し、最終CTAと重なる位置では隠す */
  function stickyCta() {
    var el = document.querySelector('.sticky');
    var hero = document.querySelector('.hero');
    var last = document.querySelector('.final');
    if (!el || !hero) return;

    if (!('IntersectionObserver' in window)) { el.classList.add('on'); return; }

    var past = false, atEnd = false;
    function apply() { el.classList.toggle('on', past && !atEnd); }

    new IntersectionObserver(function (e) {
      past = !e[0].isIntersecting; apply();
    }, { rootMargin: '-100px 0px 0px 0px' }).observe(hero);

    if (last) {
      new IntersectionObserver(function (e) {
        atEnd = e[0].isIntersecting; apply();
      }, { rootMargin: '0px 0px -30% 0px' }).observe(last);
    }
  }

  /* スクロール導入：短いフェードのみ。reduced-motion では何もしない */
  function reveal() {
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;

    var targets = document.querySelectorAll(
      '.hero__body, .slot, .first__lead, .first__act, .why .eyebrow, .why .h2,' +
      '.why__lead, .flow__i, .menu__head, .shina, .today__in > *, .steps__i,' +
      '.order__foot, .pick__b, .access__b, .ig__in > *, .final__in > *'
    );
    if (!targets.length) return;

    var waiting = [];
    function show(el) {
      el.classList.add('in');
      io.unobserve(el);
      var i = waiting.indexOf(el);
      if (i !== -1) waiting.splice(i, 1);
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) show(en.target); });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('rv');
      waiting.push(el);
      io.observe(el);
    });

    // 保険：高速スクロールやアンカー移動で通過した要素を確実に表示する
    var queued = false;
    function sweep() {
      queued = false;
      for (var i = waiting.length - 1; i >= 0; i--) {
        if (waiting[i].getBoundingClientRect().top < window.innerHeight) show(waiting[i]);
      }
      if (!waiting.length) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
      }
    }
    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(sweep);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  function init() { stickyCta(); reveal(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();
