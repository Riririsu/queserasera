import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SITE } from '../data/site.js';

/**
 * SPの固定電話CTA。
 * ヒーローを抜けてから出し、最終CTAと重なる位置では引っ込めて内容を邪魔しない。
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  const past = useRef(false);
  const atEnd = useRef(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const end = document.querySelector('.sec--contact');
    if (!hero) return;
    const apply = () => setShow(past.current && !atEnd.current);

    const obs = [];
    const o1 = new IntersectionObserver(
      ([e]) => { past.current = !e.isIntersecting; apply(); },
      { rootMargin: '-120px 0px 0px 0px' }
    );
    o1.observe(hero); obs.push(o1);

    if (end) {
      const o2 = new IntersectionObserver(
        ([e]) => { atEnd.current = e.isIntersecting; apply(); },
        { rootMargin: '0px 0px -30% 0px' }
      );
      o2.observe(end); obs.push(o2);
    }
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.div
      className="sticky"
      initial={false}
      animate={{ y: show ? 0 : '120%' }}
      transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 0.61, 0.36, 1] }}
      aria-hidden={!show}
    >
      <a className="sticky__a" href={SITE.telLink} tabIndex={show ? 0 : -1} data-cta>
        <span className="tel__ic" aria-hidden="true" />
        <span className="sticky__l">電話で注文する</span>
        <span className="sticky__n">{SITE.tel}</span>
      </a>
    </motion.div>
  );
}
