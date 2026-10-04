import { SITE } from '../data/site.js';
import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function TodaysMenu() {
  return (
    <section className="sec sec--today" aria-labelledby="today-h">
      <div className="wrap today__grid">
        <Photo slot="today" className="today__photo" sizes="(min-width: 900px) 40vw, 100vw" />

        <div className="today__body">
          <SectionHead n="05" label="TODAY'S MENU" title={<span id="today-h">今日、何があるか。</span>}>
            日替わりメニューや本日のおすすめ、その日の営業状況は公式Instagramで発信されています。
            サイトより早く、確実です。
          </SectionHead>

          <FadeUp delay={0.1}>
            <p className="today__at">{SITE.instagramHandle}</p>
            <a className="ghost" href={SITE.instagram} target="_blank" rel="noopener noreferrer">
              <span className="ghost__ic ghost__ic--ig" aria-hidden="true" />
              Instagramを見る
              <span className="ghost__ar" aria-hidden="true" />
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
