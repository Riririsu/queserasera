import { motion, useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 0.61, 0.36, 1];

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

/**
 * 下から立ち上がる行送り。暖簾をくぐるような出方で、ヒーローの見出しに使う。
 * 行ごとにマスクで切るので、フェードよりも「現れた」感が出る。
 */
export function MaskLine({ children, delay = 0, as = 'span', className = '', duration = 1 }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.span;
  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <span className="mask">
      <Tag
        className={className}
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </Tag>
    </span>
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

/* ---- まとまりで順に出す（グリッドやリスト用） ----
   個々の要素ではなく、まとまりが画面に入った時点を起点に送る。
   バラバラに出ないので、一覧がひとつの塊として読める。 */
const listV = (gap, delay) => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});
const itemV = (y) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
});

export function Stagger({ children, as = 'div', className = '', gap = 0.07, delay = 0, amount = 0.15, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      variants={listV(gap, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, as = 'div', className = '', y = 16, ...rest }) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as;
    return <Plain className={className} {...rest}>{children}</Plain>;
  }
  const Tag = motion[as] || motion.div;
  return (
    <Tag className={className} variants={itemV(y)} {...rest}>
      {children}
    </Tag>
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

/**
 * 立ちのぼる煙。暗いセクションの空気づくり。
 * CSSアニメーションのみ（JSの計算を持たない）／reduced-motion では停止。
 */
export function Smoke({ className = '' }) {
  return (
    <span className={`smoke ${className}`} aria-hidden="true">
      <span className="smoke__l smoke__l--1" />
      <span className="smoke__l smoke__l--2" />
      <span className="smoke__l smoke__l--3" />
    </span>
  );
}
