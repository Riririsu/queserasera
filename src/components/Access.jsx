import { SITE } from '../data/site.js';
import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function Access() {
  return (
    <section className="sec sec--access" id="access" aria-labelledby="access-h">
      <div className="wrap">
        <SectionHead n="08" label="ACCESS" title={<span id="access-h">お店は、ここです。</span>} onDark />

        <div className="access__grid">
          <Photo slot="access" className="access__photo" sizes="(min-width: 900px) 56vw, 100vw" />

          <div className="access__body">
            <FadeUp as="dl" className="access__list">
              <div><dt>住所</dt><dd>{SITE.address}</dd></div>
              <div><dt>電話</dt><dd><a href={SITE.telLink}>{SITE.tel}</a></dd></div>
              <div>
                <dt>営業時間</dt>
                <dd>
                  {SITE.hours.open}〜{SITE.hours.close}
                  <span className="access__so">{SITE.hours.note}</span>
                </dd>
              </div>
              <div><dt>定休日</dt><dd>{SITE.hours.closed}</dd></div>
              <div><dt>駐車</dt><dd>お店の前に駐車をお願いします。</dd></div>
            </FadeUp>

            <FadeUp delay={0.08} className="access__acts">
              <a className="ghost ghost--ink" href={SITE.maps} target="_blank" rel="noopener noreferrer">
                <span className="ghost__ic ghost__ic--pin" aria-hidden="true" />
                Google Mapsで見る
                <span className="ghost__ar" aria-hidden="true" />
              </a>
              <p className="access__fine">
                最新の営業情報は
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">公式Instagram</a>
                をご確認ください。
              </p>
            </FadeUp>
          </div>
        </div>

        <Photo slot="parking" className="access__parking" sizes="(min-width: 900px) 40vw, 100vw" />
      </div>
    </section>
  );
}
