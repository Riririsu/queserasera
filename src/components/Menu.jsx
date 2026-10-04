import { SITE, MENU } from '../data/site.js';
import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function Menu() {
  const [lead, ...rest] = MENU;
  return (
    <section className="sec sec--menu" id="menu" aria-labelledby="menu-h">
      <div className="wrap">
        <SectionHead n="04" label="MENU" title={<span id="menu-h">どれ、食べよう。</span>}>
          公開情報から確認できた定番の品です。価格はお手数ですが公式Instagramをご確認ください。
        </SectionHead>

        <div className="menugrid">
          <FadeUp className="menugrid__lead">
            <Photo slot={lead.slot} ratio="4 / 5" sizes="(min-width: 900px) 48vw, 100vw" />
            <p className="menugrid__name menugrid__name--lead">{lead.name}</p>
          </FadeUp>

          <ul className="menugrid__rest">
            {rest.map((m, i) => (
              <FadeUp as="li" key={m.slot} delay={0.05 * i}>
                <Photo slot={m.slot} ratio="1 / 1" sizes="(min-width: 900px) 24vw, 45vw" />
                <p className="menugrid__name">{m.name}</p>
              </FadeUp>
            ))}
          </ul>
        </div>

        <FadeUp className="menu__foot">
          <p className="menu__price">価格は公式Instagramをご確認ください。</p>
          <a className="ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            <span className="ghost__ic ghost__ic--ig" aria-hidden="true" />
            Instagramで見る
            <span className="ghost__ar" aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
