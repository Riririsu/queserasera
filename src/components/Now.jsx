import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { shopState, human, burnProgress, OPEN_H, CLOSE_H } from '../lib/now.js';
import { SITE } from '../data/site.js';

/**
 * このサイトが最初に答えるべきこと＝「今、やってる？」
 * 確認できている営業時間と定休日だけから組み立てる。在庫は言い切らない。
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

      {/* 17:00→22:00 の5時間。いまどこにいるかを一本の線で示す */}
      <div className="burn" role="img" aria-label={`営業時間 ${OPEN_H}:00 から ${CLOSE_H}:00`}>
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

      <p className="now__fine">
        売切れ次第CLOSE。在庫は
        <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        かお電話で。
      </p>
    </div>
  );
}
