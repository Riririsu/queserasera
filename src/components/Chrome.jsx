import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SITE, NAV } from '../data/site.js';
import { shopState, ctaLabel } from '../lib/now.js';
import logo from '../assets/brand/logo.svg';

export function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 920px)');
    const fn = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return (
    <header className="hd">
      <a className="hd__brand" href="#top">
        <img src={logo} width="120" height="120" alt="" />
        <span className="hd__name">けむり</span>
      </a>

      <nav className="hd__nav" aria-label="メインナビゲーション">
        {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
      </nav>

      <a className="hd__tel" href={SITE.telLink} data-cta>
        <span className="tel__ic" aria-hidden="true" />{SITE.tel}
      </a>

      <button className="hd__burger" type="button" aria-expanded={open}
        aria-controls="drawer" onClick={() => setOpen((v) => !v)}>
        <span className={`hd__bars ${open ? 'is-open' : ''}`} aria-hidden="true" />
        <span className="sr">{open ? 'メニューを閉じる' : 'メニューを開く'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="hd__scrim" onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }} />
            <motion.nav id="drawer" className="hd__drawer" aria-label="メニュー"
              initial={reduce ? false : { opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.24, ease: [0.22, 0.61, 0.36, 1] }}>
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
              ))}
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer"
                 onClick={() => setOpen(false)}>Instagram</a>
              <a className="hd__drawerTel" href={SITE.telLink} onClick={() => setOpen(false)} data-cta>
                <span className="tel__ic" aria-hidden="true" />{SITE.tel}
              </a>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

/** 画面下の電話。状態に応じて文言が変わる（定休日に「注文する」とは出さない） */
export function PhoneBar() {
  const [show, setShow] = useState(false);
  const [s, setS] = useState(() => shopState());
  const reduce = useReducedMotion();

  useEffect(() => {
    const id = setInterval(() => setS(shopState()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const end = document.querySelector('.closing');
    if (!hero) return;
    let past = false, atEnd = false;
    const apply = () => setShow(past && !atEnd);
    const o1 = new IntersectionObserver(([e]) => { past = !e.isIntersecting; apply(); },
      { rootMargin: '-120px 0px 0px 0px' });
    o1.observe(hero);
    const o2 = end && new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; apply(); },
      { rootMargin: '0px 0px -30% 0px' });
    if (o2) o2.observe(end);
    return () => { o1.disconnect(); o2 && o2.disconnect(); };
  }, []);

  const rest = s.state === 'rest';
  // 閉店が近い時間は「注文」より「まだあるか」が用件になる
  const label = rest ? '本日は定休日です' : ctaLabel(s);

  return (
    <motion.div className={`bar ${rest ? 'bar--rest' : ''}`}
      initial={false} animate={{ y: show ? 0 : '125%' }}
      transition={{ duration: reduce ? 0 : 0.34, ease: [0.22, 0.61, 0.36, 1] }}
      aria-hidden={!show}>
      <a className="bar__a" href={SITE.telLink} tabIndex={show ? 0 : -1} data-cta>
        <span className="tel__ic" aria-hidden="true" />
        <span className="bar__l">{label}</span>
        <span className="bar__n">{SITE.tel}</span>
      </a>
    </motion.div>
  );
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft__in">
        <p className="ft__name"><span>{SITE.nameSub}</span>けむり</p>
        <p className="ft__meta">
          {SITE.address}<br />
          {SITE.hours.open}–{SITE.hours.close}／{SITE.hours.note}／火・水休み
        </p>
        <nav className="ft__nav" aria-label="フッターナビゲーション">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        </nav>
      </div>
      <p className="ft__demo">RIKKUN WEB STUDIO｜提案用デモ</p>
    </footer>
  );
}
