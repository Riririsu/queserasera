/**
 * 写真スロット定義。
 *
 * 使い方：src/assets/photos/ に「スロット名」と同じファイル名で画像を置くだけ。
 *   例）src/assets/photos/hero.jpg → HEROに反映
 * 対応拡張子：avif / webp / jpg / jpeg / png（同名があれば avif > webp > jpg の順で採用）
 *
 * 画像が無いスロットは「写真待ち」の枠として表示される。
 * 実写真が未提供のため、AI生成画像やフリー素材での代用は行っていない。
 */
const files = import.meta.glob('../assets/photos/*.{avif,webp,jpg,jpeg,png}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const PRIORITY = ['avif', 'webp', 'jpg', 'jpeg', 'png'];

/** ファイル名（拡張子なし）→ URL。優先度の高い拡張子を採用する。 */
const resolved = (() => {
  const map = {};
  for (const [path, url] of Object.entries(files)) {
    const file = path.split('/').pop();
    const dot = file.lastIndexOf('.');
    const base = file.slice(0, dot);
    const ext = file.slice(dot + 1).toLowerCase();
    const cur = map[base];
    if (!cur || PRIORITY.indexOf(ext) < PRIORITY.indexOf(cur.ext)) {
      map[base] = { url, ext };
    }
  }
  return map;
})();

/** 各スロットの意味・代替テキスト・比率 */
export const SLOTS = {
  hero: { alt: '炭火で焼かれる燻製塩焼鳥', note: '焼き場・焼鳥のメインカット', ratio: '4 / 5' },
  kemuri: { alt: '燻製塩焼鳥 けむり の店舗外観', note: '店舗外観', ratio: '4 / 3' },
  salt: { alt: '焼鳥にふる燻製塩', note: '燻製塩のアップ', ratio: '3 / 2' },
  'salt-smoke': { alt: '立ちのぼる煙', note: '煙・燻しのカット', ratio: '3 / 4' },
  grill: { alt: '注文を受けてから焼き上げる焼き場', note: '焼き台・焼き目', ratio: '16 / 9' },
  'menu-momo': { alt: 'もも', note: 'もも', ratio: '1 / 1' },
  'menu-butabara': { alt: '豚バラ', note: '豚バラ', ratio: '1 / 1' },
  'menu-negima': { alt: 'ねぎま', note: 'ねぎま', ratio: '1 / 1' },
  'menu-tsukune': { alt: 'つくね', note: 'つくね', ratio: '1 / 1' },
  'menu-lever': { alt: 'レバー', note: 'レバー', ratio: '1 / 1' },
  'menu-sunazuri': { alt: '砂ずり', note: '砂ずり', ratio: '1 / 1' },
  'menu-cheese': { alt: 'スモークチーズ', note: 'スモークチーズ', ratio: '1 / 1' },
  today: { alt: '日替わりメニューを発信する公式Instagram', note: 'Instagram投稿', ratio: '4 / 5' },
  access: { alt: 'けむりの店舗外観と入口', note: '外観・入口・目印', ratio: '4 / 3' },
  parking: { alt: 'お店の前の駐車スペース', note: '店前の駐車スペース', ratio: '4 / 3' },
  ig1: { alt: '', note: 'Instagram投稿', ratio: '1 / 1' },
  ig2: { alt: '', note: 'Instagram投稿', ratio: '1 / 1' },
  ig3: { alt: '', note: 'Instagram投稿', ratio: '1 / 1' },
  ig4: { alt: '', note: 'Instagram投稿', ratio: '1 / 1' },
};

export function getPhoto(slot) {
  const meta = SLOTS[slot] || { alt: '', note: '写真', ratio: '4 / 3' };
  const hit = resolved[slot];
  return { ...meta, src: hit ? hit.url : null };
}

/** 実写真が1枚でも入っているか（READMEやビルド確認用） */
export const HAS_PHOTOS = Object.keys(resolved).length > 0;
export const PHOTO_COUNT = Object.keys(resolved).length;
