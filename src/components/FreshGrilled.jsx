import Photo from './Photo.jsx';
import { SectionHead, FadeUp } from './Motion.jsx';

export default function FreshGrilled() {
  return (
    <section className="sec sec--fresh" aria-labelledby="fresh-h">
      <Photo slot="grill" className="fresh__photo" sizes="100vw" ratio="16 / 9" />
      <div className="wrap fresh__body">
        <SectionHead n="07" label="FRESHLY GRILLED" title={<span id="fresh-h">注文を受けてから、焼く。</span>}>
          焼き置きはしません。お電話をいただいてから焼きはじめるので、お渡しするのは焼きたてです。
          そのぶん、受け取りまでに少しお時間をいただく場合があります。
        </SectionHead>
        <FadeUp as="p" className="fresh__tip" delay={0.1}>
          受け取り時間をお電話でお伝えいただけると、待ち時間なくお渡しできます。
        </FadeUp>
      </div>
    </section>
  );
}
