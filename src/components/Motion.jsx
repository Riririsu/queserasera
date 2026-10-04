import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.61, 0.36, 1];

/** 文字のフェード。reduced-motion では静止表示。 */
export function FadeUp({ children, delay = 0, y = 14, as = 'div', className = '', ...rest }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** ラインの描画。セクションの区切りに使う。 */
export function DrawLine({ className = '', vertical = false }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={`rule ${className}`} aria-hidden="true" />;
  return (
    <motion.span
      className={`rule ${className}`}
      aria-hidden="true"
      initial={{ transform: vertical ? 'scaleY(0)' : 'scaleX(0)' }}
      whileInView={{ transform: vertical ? 'scaleY(1)' : 'scaleX(1)' }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{ transformOrigin: vertical ? 'top' : 'left' }}
    />
  );
}

/** セクション見出し（番号・英字ラベル・日本語見出し） */
export function SectionHead({ n, label, title, children, onDark = false }) {
  return (
    <header className={`shead ${onDark ? 'shead--dark' : ''}`}>
      <FadeUp as="p" className="shead__meta">
        <span className="shead__n">{n}</span>
        <span className="shead__label">{label}</span>
      </FadeUp>
      <DrawLine className="shead__rule" />
      <FadeUp as="h2" className="shead__title" delay={0.06}>
        {title}
      </FadeUp>
      {children ? (
        <FadeUp as="p" className="shead__body" delay={0.12}>
          {children}
        </FadeUp>
      ) : null}
    </header>
  );
}

/** 電話CTA。サイト内で最重要の操作。 */
export function TelCta({ tel, telLink, label = '電話で注文する', size = 'md', showNumber = true }) {
  return (
    <a className={`tel tel--${size}`} href={telLink} data-cta>
      <span className="tel__ic" aria-hidden="true" />
      <span className="tel__txt">
        <span className="tel__label">{label}</span>
        {showNumber ? <span className="tel__num">{tel}</span> : null}
      </span>
    </a>
  );
}
