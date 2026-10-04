/**
 * 掲載内容は店のInstagramで確認できる情報のみ。
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
  { href: '#about', label: 'けむりのこと' },
  { href: '#menu', label: '品書き' },
  { href: '#order', label: '買い方' },
  { href: '#store', label: '店' },
];

/** 公開情報から確認できた品のみ。価格は設定しない。 */
export const MENU = [
  { name: 'もも' },
  { name: '豚バラ' },
  { name: 'ねぎま' },
  { name: 'つくね' },
  { name: 'レバー' },
  { name: '砂ずり' },
  { name: 'スモークチーズ' },
];
