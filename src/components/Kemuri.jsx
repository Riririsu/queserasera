import { SITE } from '../data/site.js';
import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function Kemuri() {
  return (
    <section className="sec sec--kemuri" id="kemuri" aria-labelledby="kemuri-h">
      <div className="wrap kemuri__grid">
        <div className="kemuri__body">
          <SectionHead n="02" label="KEMURI" title={<span id="kemuri-h">国分の片隅で、<br />煙を上げている店。</span>}>
            けむりは、燻製塩を使った焼鳥のテイクアウト専門店です。
            注文を受けてから焼きはじめるので、お渡しするのはいつも焼きたて。
          </SectionHead>

          <FadeUp as="dl" className="facts" delay={0.1}>
            <div><dt>開業</dt><dd>{SITE.opened}</dd></div>
            <div><dt>業態</dt><dd>テイクアウト専門</dd></div>
            <div><dt>所在地</dt><dd>{SITE.address}</dd></div>
          </FadeUp>
        </div>

        <Photo slot="kemuri" className="kemuri__photo" sizes="(min-width: 900px) 46vw, 100vw" />
      </div>
    </section>
  );
}
