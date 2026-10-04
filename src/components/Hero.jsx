import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { SITE } from '../data/site.js';
import { getPhoto } from '../data/photos.js';
import { TelCta, MaskLine, Smoke, EASE } from './Motion.jsx';

export default function Hero() {
  const reduce = useReducedMotion();
  const { src, alt, note } = getPhoto('hero');
  const ref = useRef(null);

  // 写真だけをゆっくり遅らせる。幅は小さく抑え、派手なパララックスにはしない。
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero__media" style={reduce ? undefined : { y }}>
        {src ? (
          <motion.img
            className="hero__img"
            src={src}
            alt={alt}
            width="1600" height="2000"
            fetchpriority="high"
            decoding="async"
            initial={reduce ? false : { scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 16, ease: 'linear' }}
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
        <Smoke className="smoke--hero" />
      </motion.div>

      <div className="hero__body wrap">
        <p className="hero__sub">
          <MaskLine as="span" className="mask__in" delay={0.15}>{SITE.nameSub}</MaskLine>
        </p>

        <h1 className="hero__name">
          <MaskLine as="span" className="mask__in" delay={0.26} duration={1.15}>
            {SITE.nameShort}
          </MaskLine>
        </h1>

        <p className="hero__lead">
          <MaskLine as="span" className="mask__in" delay={0.46}>燻製塩で味わう、</MaskLine>
          <MaskLine as="span" className="mask__in" delay={0.56}>焼きたて焼鳥。</MaskLine>
        </p>

        <motion.div className="hero__hours"
          initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.78 }}>
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
          transition={{ duration: 0.9, ease: EASE, delay: 0.92 }}>
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
          <p className="hero__note">当日のご注文はお電話でお願いします。</p>
        </motion.div>

        <motion.span className="hero__scroll" aria-hidden="true"
          initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}>
          <span className="hero__scrollLine" />
        </motion.span>
      </div>
    </section>
  );
}
