import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { shopState, human, burnProgress, stockNote, OPEN_H, CLOSE_H } from '../lib/now.js';
import { SITE } from '../data/site.js';

/**
 * このサイトが最初に答えるべきこと＝「今、やってる？」
 *
 * ただしこの店は売切れ次第CLOSE なので、この問いは二段ある。
 *   ① 営業時間か   … カレンダーと時計でわかる → ここで答える
 *   ② 在庫があるか … 店しか知らない          → ここでは答えない
 * ②を小さな注記で済ませると、21時に見た人が閉まった店に向かってしまう。
 * だから②は①と同じ大きさで、電話を添えて置く。
 */
export default function Now() {
  const [s, setS] = useState(() => shopState());
  const [p, setP] = useState(() => burnProgress());
  const reduce = useReducedMotion();

  useEffect(() => {
    const tick = () => { setS(shopState()); setP(burnProgress()); };
    const id = setInterval(tick, 30000);
    const onVis = () => !document.hidden && tick();
    document.addEventListener('visibilitychange', onVis);
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', onVis); };
  }, []);

  const { state, t, label, sub } = s;
  const extra =
    state === 'before' ? `あと${human(s.countdown)}` :
    state === 'open' ? `のこり${human(s.remain)}` : '';
  const stock = stockNote(s);

  return (
    <div className={`now now--${state}`}>
      <p className="now__date">
        <span className="now__dateNum">{t.m}月{t.d}日</span>
        <span className="now__dateWd">（{t.wdJa}）</span>
      </p>

      <p className="now__label">
        <span className="now__dot" aria-hidden="true" />
        {label}
      </p>
      {(sub || extra) && (
        <p className="now__sub">
          {sub}{extra && <span className="now__extra">{extra}</span>}
        </p>
      )}

      {/* 17:00→22:00 の5時間。これは「時間」の線で、在庫の残りではない */}
      <div className="burn" role="img" aria-label={`営業時間は ${OPEN_H}:00 から ${CLOSE_H}:00 まで`}>
        <span className="burn__cap">{OPEN_H}:00</span>
        <span className="burn__bar">
          <motion.span
            className="burn__fill"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: p == null ? 0 : p }}
            transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 0.61, 0.36, 1] }}
          />
          {p != null && (
            <motion.span
              className="burn__head"
              initial={reduce ? false : { left: '0%' }}
              animate={{ left: `${p * 100}%` }}
              transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 0.61, 0.36, 1] }}
            />
          )}
        </span>
        <span className="burn__cap">{CLOSE_H}:00</span>
      </div>

      {stock ? (
        <div className={`stock ${state === 'open' && s.last ? 'stock--last' : ''}`}>
          <p className="stock__k">在庫</p>
          <p className="stock__b">
            {stock}
            <a className="stock__ig" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              Instagramでも告知
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
}
