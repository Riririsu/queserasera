import { useEffect, useRef } from 'react';

/**
 * 立ちのぼる煙。店名そのものなので、模様ではなく本物の動きとして描く。
 *
 * 負荷を抑えるための約束：
 *  - 粒は少なく（既定22）、やわらかい円を1枚だけ作って使い回す
 *  - 解像度は最大1.5倍まで。高精細端末でも塗る面積を増やしすぎない
 *  - 30fpsで十分。画面外・非表示タブ・reduced-motion では完全に止める
 */
export default function Smoke({ count = 22, tint = '236,231,218', className = '', seedY = 1.1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0, dpr = 1, raf = 0, last = 0, visible = true, running = true;
    const puffs = [];

    // やわらかい円を1枚だけ用意し、以降はこれを拡大縮小して使う
    const sprite = document.createElement('canvas');
    const S = 128;
    sprite.width = sprite.height = S;
    const sctx = sprite.getContext('2d');
    const g = sctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, `rgba(${tint},0.38)`);
    g.addColorStop(0.45, `rgba(${tint},0.14)`);
    g.addColorStop(1, `rgba(${tint},0)`);
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, S, S);

    const reset = (p, first) => {
      p.x = Math.random() * w;
      p.y = first ? Math.random() * h * seedY : h + Math.random() * h * 0.2;
      p.r = (0.09 + Math.random() * 0.16) * Math.min(w, h);
      p.vy = -(0.08 + Math.random() * 0.16);      // px/ms 相当の控えめな上昇
      p.vx = (Math.random() - 0.5) * 0.035;
      p.life = 0;
      p.span = 9000 + Math.random() * 9000;
      p.grow = 1 + Math.random() * 0.9;
    };

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    size();
    for (let i = 0; i < count; i++) {
      const p = {};
      reset(p, true);
      p.life = Math.random() * p.span;
      puffs.push(p);
    }

    const frame = (now) => {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(now - last, 60);
      if (dt < 33) return;            // 30fpsで足りる
      last = now;

      ctx.clearRect(0, 0, w, h);
      for (const p of puffs) {
        p.life += dt;
        if (p.life > p.span || p.y + p.r < -h * 0.1) reset(p);
        const k = p.life / p.span;                        // 0→1
        const fade = Math.sin(Math.PI * Math.min(k, 1));  // 出て、消える
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        const r = p.r * (1 + p.grow * k);
        ctx.globalAlpha = fade * 0.5;
        ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);
    const onVis = () => { visible = !document.hidden; };
    document.addEventListener('visibilitychange', onVis);

    let rt = 0;
    const onResize = () => { clearTimeout(rt); rt = setTimeout(size, 160); };
    window.addEventListener('resize', onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('resize', onResize);
      clearTimeout(rt);
    };
  }, [count, tint, seedY]);

  return <canvas className={`smokeC ${className}`} ref={ref} aria-hidden="true" />;
}
