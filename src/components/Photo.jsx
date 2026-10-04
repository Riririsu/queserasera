import { motion, useReducedMotion } from 'framer-motion';
import { getPhoto } from '../data/photos.js';

/**
 * 写真スロット。
 * 画像があれば表示し、無ければ「写真待ち」の枠を出す。
 * どちらの場合も同じ比率を占めるので、差し替えてもレイアウトが動かない。
 */
export default function Photo({
  slot,
  className = '',
  ratio,
  priority = false,
  sizes,
  reveal = true,
  objectPosition,
}) {
  const { src, alt, note, ratio: defaultRatio } = getPhoto(slot);
  const reduce = useReducedMotion();
  const style = { '--ar': ratio || defaultRatio };

  const inner = src ? (
    <img
      className="photo__img"
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchpriority={priority ? 'high' : undefined}
      sizes={sizes}
      style={objectPosition ? { objectPosition } : undefined}
    />
  ) : (
    <span className="photo__wait" role="img" aria-label={`${note}（写真をご提供ください）`}>
      <span className="photo__smoke" aria-hidden="true" />
      <span className="photo__label">
        <span className="photo__note">{note}</span>
        <span className="photo__sub">写真をご提供ください</span>
      </span>
    </span>
  );

  if (!reveal || reduce) {
    return (
      <figure className={`photo ${className}`} style={style}>
        {inner}
      </figure>
    );
  }

  return (
    <motion.figure
      className={`photo ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {inner}
    </motion.figure>
  );
}
