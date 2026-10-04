import { motion, useReducedMotion } from 'framer-motion';
import { SITE, MENU } from '../data/site.js';
import { FadeUp, Stagger, StaggerItem, TelCta, MaskLine } from './Motion.jsx';
import Smoke from './Smoke.jsx';
import Tate from './Tate.jsx';
import Now from './Now.jsx';
import logo from '../assets/brand/logo.svg';

const EASE = [0.22, 0.61, 0.36, 1];

/* ===== 01 いま ===== */
export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="hero" id="top">
      <Smoke className="hero__smoke" count={24} />
      <span className="hero__ember" aria-hidden="true" />

      <div className="hero__in wrap">
        <div className="hero__type">
          <p className="hero__sub">
            <MaskLine as="span" className="mask__in" delay={0.1}>{SITE.nameSub}</MaskLine>
          </p>
          <h1 className="hero__name">
            <MaskLine as="span" className="mask__in" delay={0.2} duration={1.15}>
              {SITE.nameShort}
            </MaskLine>
          </h1>
          <p className="hero__lead">
            <MaskLine as="span" className="mask__in" delay={0.42}>燻製塩で、焼きたてを。</MaskLine>
            <MaskLine as="span" className="mask__in" delay={0.52}>持ち帰りだけの焼鳥屋です。</MaskLine>
          </p>
        </div>

        <motion.div className="hero__now"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}>
          <Now />
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
          <p className="hero__dm">当日のご注文はお電話で。</p>
        </motion.div>
      </div>

      {/* 縦書きの屋号。暖簾のつもり */}
      <Tate text="燻製塩焼鳥" className="hero__noren" />
    </section>
  );
}

/* ===== 02 けむりのこと ===== */
const POINTS = [
  { k: '塩', t: '燻製塩', b: 'たれではなく、燻した塩で食べる一本。' },
  { k: '火', t: '焼きたて', b: '注文を受けてから焼きます。焼き置きはしません。' },
  { k: '袋', t: '持ち帰り', b: 'テイクアウト専門。席はありません。' },
];

export function About() {
  return (
    <section className="about" id="about">
      <div className="wrap">
        <FadeUp as="p" className="eyebrow">けむりのこと</FadeUp>
        <FadeUp as="h2" className="h2" delay={0.05}>
          五時に火を入れて、<br />売り切れたら、終い。
        </FadeUp>
        <FadeUp as="p" className="about__lead" delay={0.1}>
          {SITE.opened}から、国分中央で焼いています。
          燻製塩を使った焼鳥の、持ち帰り専門店です。
        </FadeUp>

        <Stagger as="ul" className="points" gap={0.1}>
          {POINTS.map((p) => (
            <StaggerItem as="li" key={p.k} className="points__i">
              <span className="points__k" aria-hidden="true">{p.k}</span>
              <h3 className="points__t">{p.t}</h3>
              <p className="points__b">{p.b}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ===== 03 品書き ===== */
export function Shinagaki() {
  return (
    <section className="shina" id="menu">
      <Smoke className="shina__smoke" count={14} seedY={0.6} />
      <div className="wrap shina__in">
        <FadeUp as="p" className="eyebrow">品書き</FadeUp>
        <FadeUp as="h2" className="h2" delay={0.05}>定番の七本。</FadeUp>

        <Stagger as="ul" className="fuda" gap={0.07} amount={0.1}>
          {MENU.map((m) => (
            <StaggerItem as="li" key={m.name} className="fuda__i">
              <Tate text={m.name} className="fuda__t" />
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="shina__foot" delay={0.1}>
          <p className="shina__note">
            日替わりと、その日の値段はInstagramに出ています。
          </p>
          <a className="ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            <span className="ghost__ic ghost__ic--ig" aria-hidden="true" />
            今日の品を見る
            <span className="ghost__ar" aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

/* ===== 04 買い方 ===== */
const STEPS = [
  { n: '一', t: '電話する', b: SITE.tel },
  { n: '二', t: '品と本数、受け取る時間を伝える', b: '' },
  { n: '三', t: '焼き上がりに合わせて来る', b: '' },
  { n: '四', t: '店先で受け取る', b: 'お店の前に駐車できます' },
];

export function HowTo() {
  return (
    <section className="howto" id="order">
      <div className="wrap">
        <FadeUp as="p" className="eyebrow">買い方</FadeUp>
        <FadeUp as="h2" className="h2 h2--ink" delay={0.05}>電話一本で、取り置きます。</FadeUp>
        <FadeUp as="p" className="howto__lead" delay={0.1}>
          焼きはじめるのは注文を受けてから。先に電話をもらえると、待たずに渡せます。
        </FadeUp>

        <Stagger as="ol" className="steps" gap={0.09}>
          {STEPS.map((s) => (
            <StaggerItem as="li" key={s.n} className="steps__i">
              <span className="steps__n" aria-hidden="true">{s.n}</span>
              <div>
                <h3 className="steps__t">{s.t}</h3>
                {s.b && <p className="steps__b">{s.b}</p>}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <FadeUp className="howto__cta" delay={0.1}>
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
          <p className="howto__dm">
            当日のご注文はお電話でお願いします。<br />
            <span>行き違いを防ぐため、当日のDMは受けていません。</span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ===== 05 店 ===== */
export function Store() {
  return (
    <section className="store" id="store">
      <div className="wrap store__in">
        <div className="store__body">
          <FadeUp as="p" className="eyebrow">店</FadeUp>
          <FadeUp as="h2" className="h2" delay={0.05}>国分中央、三丁目。</FadeUp>

          <FadeUp as="dl" className="info" delay={0.1}>
            <div><dt>住所</dt><dd>{SITE.address}</dd></div>
            <div><dt>電話</dt><dd><a href={SITE.telLink}>{SITE.tel}</a></dd></div>
            <div><dt>営業</dt><dd>{SITE.hours.open}〜{SITE.hours.close}<span className="info__so">{SITE.hours.note}</span></dd></div>
            <div><dt>休み</dt><dd>火・水</dd></div>
            <div><dt>駐車</dt><dd>お店の前に</dd></div>
          </FadeUp>

          <FadeUp className="store__acts" delay={0.14}>
            <a className="ghost" href={SITE.maps} target="_blank" rel="noopener noreferrer">
              <span className="ghost__ic ghost__ic--pin" aria-hidden="true" />
              地図で見る
              <span className="ghost__ar" aria-hidden="true" />
            </a>
            <a className="ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <span className="ghost__ic ghost__ic--ig" aria-hidden="true" />
              {SITE.instagramHandle}
              <span className="ghost__ar" aria-hidden="true" />
            </a>
          </FadeUp>
        </div>

        {/* 写真がないので、地図の代わりに場所の構造を線で示す */}
        <FadeUp className="store__plan" delay={0.08}>
          <svg viewBox="0 0 320 240" role="img" aria-label="お店の前に駐車スペースがある配置の略図">
            <defs>
              <pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" strokeOpacity=".22" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="24" y="26" width="272" height="78" fill="url(#hatch)" stroke="currentColor" strokeOpacity=".5" />
            <text x="160" y="70" textAnchor="middle" className="plan__t">けむり</text>
            <rect x="128" y="96" width="64" height="12" fill="currentColor" fillOpacity=".7" />
            <text x="160" y="126" textAnchor="middle" className="plan__s">受け取り</text>
            <rect x="24" y="142" width="272" height="56" fill="none" stroke="currentColor" strokeOpacity=".35" strokeDasharray="5 5" />
            <text x="160" y="176" textAnchor="middle" className="plan__s">お店の前に駐車</text>
            <line x1="0" y1="214" x2="320" y2="214" stroke="currentColor" strokeOpacity=".3" />
            <text x="300" y="232" textAnchor="end" className="plan__s">道路</text>
          </svg>
        </FadeUp>
      </div>
    </section>
  );
}

/* ===== 06 締め ===== */
export function Closing() {
  return (
    <section className="closing">
      <Smoke className="closing__smoke" count={18} tint="226,80,43" />
      <div className="wrap closing__in">
        <img className="closing__logo" src={logo} width="120" height="120" alt="" loading="lazy" />
        <FadeUp as="h2" className="closing__h" delay={0.05}>
          今夜、けむりが立ちます。
        </FadeUp>
        <FadeUp className="closing__cta" delay={0.12}>
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
        </FadeUp>
        <FadeUp as="p" className="closing__hours" delay={0.18}>
          {SITE.hours.open}–{SITE.hours.close}／{SITE.hours.note}／火・水休み
        </FadeUp>
      </div>
    </section>
  );
}
