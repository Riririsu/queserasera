import { SITE, ORDER_STEPS } from '../data/site.js';
import { SectionHead, FadeUp, TelCta, DrawLine } from './Motion.jsx';

export default function Order() {
  return (
    <section className="sec sec--order" id="order" aria-labelledby="order-h">
      <div className="wrap">
        <SectionHead n="06" label="ORDER" title={<span id="order-h">電話で、注文する。</span>} onDark>
          事前にお電話いただくと、受け取りがスムーズです。
        </SectionHead>

        <ol className="flow">
          {ORDER_STEPS.map((s, i) => (
            <FadeUp as="li" key={s.n} className="flow__i" delay={0.07 * i}>
              <span className="flow__n">{s.n}</span>
              <span className="flow__line" aria-hidden="true" />
              <h3 className="flow__t">{s.title}</h3>
              <p className="flow__b">{s.body}</p>
            </FadeUp>
          ))}
        </ol>

        <DrawLine className="order__rule" />

        <FadeUp className="order__note">
          <p className="order__dm">当日のご注文はお電話でお願いします。</p>
          <p className="order__dmSub">
            当日のDM注文は、行き違い防止のためお受けしていません。
          </p>
        </FadeUp>

        <FadeUp className="order__cta" delay={0.08}>
          <TelCta tel={SITE.tel} telLink={SITE.telLink} size="lg" />
        </FadeUp>
      </div>
    </section>
  );
}
