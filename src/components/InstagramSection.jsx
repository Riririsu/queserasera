import { SITE } from '../data/site.js';
import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

const SHOTS = ['ig1', 'ig2', 'ig3', 'ig4'];

export default function InstagramSection() {
  return (
    <section className="sec sec--ig" aria-labelledby="ig-h">
      <div className="wrap">
        <SectionHead n="10" label="INSTAGRAM" title={<span id="ig-h">最新は、Instagramで。</span>}>
          本日のメニュー・売り切れ情報・営業のお知らせはこちらで発信しています。
        </SectionHead>

        <ul className="iggrid">
          {SHOTS.map((s, i) => (
            <FadeUp as="li" key={s} delay={0.05 * i}>
              <Photo slot={s} ratio="1 / 1" sizes="(min-width: 900px) 24vw, 45vw" />
            </FadeUp>
          ))}
        </ul>

        <FadeUp className="ig__foot">
          <p className="ig__at">{SITE.instagramHandle}</p>
          <a className="ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
            <span className="ghost__ic ghost__ic--ig" aria-hidden="true" />
            Instagramを見る
            <span className="ghost__ar" aria-hidden="true" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
