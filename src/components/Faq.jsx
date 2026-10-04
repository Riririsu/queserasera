import { FAQ } from '../data/site.js';
import { SectionHead, Stagger, StaggerItem } from './Motion.jsx';

export default function Faq() {
  return (
    <section className="sec sec--faq" aria-labelledby="faq-h">
      <div className="wrap">
        <SectionHead n="09" label="FAQ" title={<span id="faq-h">よくあるご質問</span>} />
        <Stagger className="faq" gap={0.05}>
          {FAQ.map((f) => (
            <StaggerItem key={f.q}>
              <details className="faq__i">
                <summary className="faq__q">{f.q}</summary>
                <div className="faq__a"><p>{f.a}</p></div>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
