import { motion, useReducedMotion } from 'framer-motion';
import { SITE } from '../data/site.js';
import { getPhoto } from '../data/photos.js';
import { TelCta } from './Motion.jsx';

const EASE = [0.22, 0.61, 0.36, 1];

export default function Hero() {
  const reduce = useReducedMotion();
  const { src, alt, note } = getPhoto('hero');

  return (
    <section className="hero" id="top">
      <div className="hero__media">
        {src ? (
          <motion.img
            className="hero__img"
            src={src}
            alt={alt}
            width="1600" height="2000"
            fetchpriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 14, ease: 'linear' }}
          />
        ) : (
          <span className="hero__wait" role="img" aria-label={`${note}（写真をご提供ください）`}>
            <span className="photo__smoke" aria-hidden="true" />
            <span className="photo__label">
              <span className="photo__note">{note}</span>
              <span className="photo__sub">写真をご提供ください</span>
            </span>
          </span>
        )}
        <span className="hero__veil" aria-hidden="true" />
      </div>

      <div className="hero__body wrap">
        <motion.p className="hero__sub"
          initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
          {SITE.nameSub}
        </motion.p>

        <motion.h1 className="hero__name"
          initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}>
          {SITE.nameShort}
        </motion.h1>

        <motion.p className="hero__lead"
          initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}>
          燻製塩で味わう、<br />焼きたて焼鳥。
        </motion.p>

        <motion.div className="hero__hours"
          initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.42 }}>
          <p className="hero__time">
            <span>{SITE.hours.open}</span><em>OPEN</em>
            <i aria-hidden="true" />
            <span>{SITE.hours.close}</span><em>CLOSE</em>
          </p>
          <p className="hero__soldout">{SITE.hours.note}</p>
          <p className="hero__rest">{SITE.hours.closed}</p>
        </motion.div>

        <motion.div className="hero__cta"
          initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.54 }}>
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
          <p className="hero__note">当日のご注文はお電話でお願いします。</p>
        </motion.div>
      </div>
    </section>
  );
}
