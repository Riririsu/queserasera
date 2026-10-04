import { FAQ } from '../data/site.js';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function Faq() {
  return (
    <section className="sec sec--faq" aria-labelledby="faq-h">
      <div className="wrap">
        <SectionHead n="09" label="FAQ" title={<span id="faq-h">よくあるご質問</span>} />
        <div className="faq">
          {FAQ.map((f, i) => (
            <FadeUp key={f.q} delay={0.04 * i}>
              <details className="faq__i">
                <summary className="faq__q">{f.q}</summary>
                <div className="faq__a"><p>{f.a}</p></div>
              </details>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
