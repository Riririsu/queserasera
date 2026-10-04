import Photo from './Photo.jsx';
import { SectionHead, FadeUp, DrawLine, Smoke } from './Motion.jsx';

const FLOW = [
  { k: '煙', t: '燻す' },
  { k: '塩', t: '燻製塩' },
  { k: '串', t: '焼鳥にふる' },
  { k: '焼', t: '焼きたてで渡す' },
];

export default function SmokedSalt() {
  return (
    <section className="sec sec--salt" id="salt" aria-labelledby="salt-h">
      <Photo slot="salt-smoke" className="salt__bg" reveal={false} ratio="auto" />
      <span className="salt__veil" aria-hidden="true" />
      <Smoke className="smoke--salt" />

      <div className="wrap salt__inner">
        <SectionHead n="03" label="SMOKED SALT" title={<span id="salt-h">味の軸は、<br />燻製塩。</span>}>
          けむりの焼鳥は、燻製塩で味をつけます。たれではなく塩で食べる一本です。
        </SectionHead>

        <ol className="saltflow">
          {FLOW.map((f, i) => (
            <FadeUp as="li" key={f.k} delay={0.08 * i} className="saltflow__i">
              <span className="saltflow__k" aria-hidden="true">{f.k}</span>
              <span className="saltflow__t">{f.t}</span>
            </FadeUp>
          ))}
        </ol>
        <DrawLine className="saltflow__rule" />

        <div className="salt__shots">
          <Photo slot="salt" className="salt__shot" sizes="(min-width: 900px) 52vw, 100vw" />
        </div>
      </div>
    </section>
  );
}
