/**
 * 掲載内容は公式Instagramで確認できる情報のみ。
 * 価格・待ち時間・駐車台数・口コミ・製法の詳細などは扱わない。
 */
export const SITE = {
  name: '燻製塩焼鳥 けむり',
  nameShort: 'けむり',
  nameSub: '燻製塩焼鳥',
  tagline: '燻製塩で味わう、焼きたて焼鳥。',
  description:
    '鹿児島県霧島市国分中央の焼鳥テイクアウト専門店「燻製塩焼鳥 けむり」。燻製塩で味わう、焼きたて焼鳥。17:00 OPEN／22:00 CLOSE、売切れ次第CLOSE、火・水休み。ご注文はお電話で。',
  tel: '090-4473-1867',
  telLink: 'tel:09044731867',
  address: '鹿児島県霧島市国分中央3-6-18',
  addressRegion: '鹿児島県',
  addressLocality: '霧島市',
  streetAddress: '国分中央3-6-18',
  opened: '2017年12月27日',
  instagram: 'https://www.instagram.com/yakitori.kemuri/',
  instagramHandle: '@yakitori.kemuri',
  maps:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('鹿児島県霧島市国分中央3-6-18'),
  canonical: 'https://example.com/', // 本番ドメイン確定後に差し替え
  hours: { open: '17:00', close: '22:00', note: '売切れ次第CLOSE', closed: '火・水休み' },
};

export const NAV = [
  { href: '#kemuri', label: 'けむりについて' },
  { href: '#salt', label: '燻製塩' },
  { href: '#menu', label: 'メニュー' },
  { href: '#order', label: '注文方法' },
  { href: '#access', label: 'アクセス' },
];

/** 公開情報から確認できた品のみ。価格は設定しない。 */
export const MENU = [
  { name: 'もも', slot: 'menu-momo' },
  { name: '豚バラ', slot: 'menu-butabara' },
  { name: 'ねぎま', slot: 'menu-negima' },
  { name: 'つくね', slot: 'menu-tsukune' },
  { name: 'レバー', slot: 'menu-lever' },
  { name: '砂ずり', slot: 'menu-sunazuri' },
  { name: 'スモークチーズ', slot: 'menu-cheese' },
];

export const ORDER_STEPS = [
  { n: '01', title: '電話する', body: `${SITE.tel} におかけください。` },
  { n: '02', title: '商品・受取時間を伝える', body: '品物と本数、受け取りたい時間をお伝えください。' },
  { n: '03', title: '焼き上がりに合わせて来店', body: '伝えた時間に合わせてお越しください。' },
  { n: '04', title: '店頭で受け取る', body: 'お店でお受け取り・お会計です。' },
];

/** 回答は確認済み情報のみ。不明なものは作らない。 */
export const FAQ = [
  { q: '電話注文できますか？', a: 'はい。ご注文はお電話でお願いしています。090-4473-1867 におかけください。' },
  { q: '当日のDM注文はできますか？', a: '当日のDM注文は、行き違い防止のためお受けしていません。当日のご注文はお電話でお願いします。' },
  { q: '営業時間は？', a: '17:00 OPEN、22:00 CLOSE です。売切れ次第CLOSEとなります。最新の営業情報は公式Instagramをご確認ください。' },
  { q: '定休日は？', a: '火曜・水曜がお休みです。' },
  { q: '売切れることはありますか？', a: 'あります。売切れ次第CLOSEとなりますので、確実に受け取りたい場合は事前にお電話ください。' },
  { q: '駐車場はありますか？', a: 'お店の前に駐車をお願いします、とご案内があります。' },
  { q: 'テイクアウト専門ですか？', a: 'はい。けむりはテイクアウト専門の焼鳥店です。' },
  { q: '日替わりメニューはどこで見られますか？', a: '日替わりメニューや本日のおすすめは、公式Instagram（@yakitori.kemuri）で発信されています。' },
];
