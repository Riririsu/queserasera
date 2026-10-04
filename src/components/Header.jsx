import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SITE, NAV } from '../data/site.js';
import logo from '../assets/brand/logo.svg';

export default function Header() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1000px)');
    const fn = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  return (
    <header className="hd">
      <a className="hd__brand" href="#top">
        <img className="hd__logo" src={logo} width="120" height="120" alt="" />
        <span className="hd__txt">
          <span className="hd__sub">{SITE.nameSub}</span>
          <span className="hd__name">{SITE.nameShort}</span>
        </span>
      </a>

      <nav className="hd__nav" aria-label="メインナビゲーション">
        <ul>
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href}>{n.label}</a></li>
          ))}
        </ul>
      </nav>

      <a className="hd__tel" href={SITE.telLink} data-cta>
        <span className="tel__ic" aria-hidden="true" />電話で注文
      </a>

      <button
        className="hd__burger"
        type="button"
        aria-expanded={open}
        aria-controls="drawer"
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`hd__bars ${open ? 'is-open' : ''}`} aria-hidden="true" />
        <span className="sr">{open ? 'メニューを閉じる' : 'メニューを開く'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="hd__scrim"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.2 }}
            />
            <motion.nav
              id="drawer"
              className="hd__drawer"
              aria-label="メニュー"
              initial={reduce ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.26, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
                  </li>
                ))}
                <li>
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    Instagram
                  </a>
                </li>
              </ul>
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
