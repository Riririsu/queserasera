import { SITE } from '../data/site.js';
import { FadeUp, TelCta, Smoke } from './Motion.jsx';
import logo from '../assets/brand/logo.svg';

export default function Contact() {
  return (
    <section className="sec sec--contact" aria-labelledby="contact-h">
      <Smoke className="smoke--contact" />
      <div className="wrap contact__in">
        <FadeUp>
          <img className="contact__logo" src={logo} width="120" height="120" alt="" loading="lazy" />
        </FadeUp>
        <FadeUp as="h2" className="contact__h" delay={0.06}>
          <span id="contact-h">今日の焼鳥、けむりで。</span>
        </FadeUp>
        <FadeUp as="p" className="contact__t" delay={0.12}>
          焼きたてを持ち帰って、家でどうぞ。
        </FadeUp>
        <FadeUp delay={0.18} className="contact__cta">
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
        </FadeUp>
        <FadeUp as="p" className="contact__hours" delay={0.24}>
          {SITE.hours.open} OPEN／{SITE.hours.close} CLOSE　<span>{SITE.hours.note}</span><br />
          {SITE.hours.closed}
        </FadeUp>
      </div>
    </section>
  );
}
