# 燻製塩焼鳥 けむり｜店舗LP（React）

鹿児島県霧島市国分の焼鳥テイクアウト専門店「燻製塩焼鳥 けむり」の1ページLP。
React + Vite + Framer Motion、スマートフォンファースト。

> RIKKUN WEB STUDIO｜提案用デモ

---

## 目的

ブランドサイトではなく、**GoogleやInstagramから来た人を電話注文まで連れていくWeb上の店舗スタッフ**。

検索 → 店舗を理解 → 焼鳥を見て食べたくなる → メニュー → 営業状況 → 電話注文 → 来店

- **PRIMARY CTA**：電話で注文する（`tel:09044731867`）
- **SECONDARY CTA**：Instagramを見る

---

## 動かす

```sh
npm install
npm run dev      # 開発サーバー
npm run build    # 本番ビルド → dist/
npm run preview  # ビルド結果の確認
```

---

## 構成

```
index.html                  SEO/OGP/構造化データ
src/
  App.jsx                   11セクションの組み立て
  main.jsx
  data/site.js              店舗情報・メニュー・FAQ（文言はここに集約）
  data/photos.js            写真スロット定義と自動解決
  components/               セクションごとのコンポーネント
  styles/                   global.css / sections.css
  assets/photos/            ★ 写真を置くフォルダ（README参照）
public/                     favicon / ogp
```

| # | セクション | 役割 |
|---|---|---|
| 01 | HERO | 「食べたい」と思わせる |
| 02 | KEMURI | どんな店なのか |
| 03 | 燻製塩 | この店ならではの特徴 |
| 04 | MENU | 定番メニュー（写真中心） |
| 05 | TODAY'S MENU | 日替わりはInstagramへ |
| 06 | ORDER | 電話注文の流れ |
| 07 | 焼きたて | 注文を受けてから焼く |
| 08 | ACCESS | 店舗・駐車・Google Maps |
| 09 | FAQ | 来店前の不安を解消 |
| 10 | INSTAGRAM | 最新情報 |
| 11 | CONTACT | 電話注文 |

---

## 写真の入れ方

**`src/assets/photos/` にファイルを置くだけ**で反映されます。コード変更は不要です。
スロット名・推奨比率は [`src/assets/photos/README.md`](src/assets/photos/README.md) を参照してください。

未設置のスロットは「写真をご提供ください」という枠で表示され、
写真が入ると同じ比率のまま差し替わるのでレイアウトは動きません。

---

## デザイン

**「かっこいいのに、腹が減る。」**

| 役割 | 色 |
|---|---|
| BASE | 黒紺 `#0C1116` / 濃紺 `#111A24` / 生成り `#F2EDE3` |
| ACCENT | 赤 `#D1372A`（焼き・火・注文） |
| 微量 | 金 `#E8B43C`（ロゴとの調和） |

見出しは明朝、本文はゴシック。英字はセクションラベルのみに抑えています。
暗いセクションと生成りのセクションを交互に置き、写真が主役になる構成にしています。

### モーション（Framer Motion）

- ヒーロー写真のゆっくりズーム（14秒・linear）
- 写真のReveal（opacity + わずかなscale）
- 文字のフェード、ラインの描画
- 固定CTAの出し入れ

`useReducedMotion()` で全モーションを停止します。すべて `viewport={{ once: true }}` で、
スクロール中の再計算を避けています。

---

## 掲載内容について

公式Instagramで確認できる情報のみを掲載しています。文言は `src/data/site.js` に集約。

掲載している：営業時間（17:00-22:00／売切れ次第CLOSE／火・水休み）、開業日、住所、電話、
テイクアウト専門、注文を受けてから焼くこと、当日のDM注文不可、お店の前に駐車、定番7品。

**掲載していない（創作しない）**：価格、待ち時間、駐車台数、口コミ・レビュー、受賞歴、
販売数、製法の詳細、店舗の歴史、お客様の声。

- 価格は「公式Instagramをご確認ください」の導線にしています
- 営業時間は変わる可能性があるため、Instagramへの確認導線を併設しています
- 「夫婦で営む」は確認できる情報源がないため本文に書いていません

構造化データ（Restaurant）は確認済みの項目のみ登録しています。

---

## 検証済み

- 320 / 375 / 414 / 768 / 1000 / 1280 / 1600px で横スクロール・はみ出しなし
- コンソールエラーなし、未解決リクエストなし
- `prefers-reduced-motion` で全モーション停止、初期表示で隠れる本文ゼロ
- キーボード操作（スキップリンク → ヘッダー → 本文）、Escでメニューが閉じる
- 固定CTAはヒーロー上では出さず、最終CTAでは引っ込めて内容を隠さない
- 電話リンク7箇所すべてタップ領域44px以上
- コントラストは全項目 WCAG AA（4.5:1）以上
- `h1` は1つ、画像のaltあり、外部リンクは `rel="noopener"`

### 本番公開前に

1. `index.html` の `robots` から `noindex, nofollow` を外す
2. `index.html` の `canonical` と `src/data/site.js` の `canonical` を本番ドメインに変更
3. `og:image` を実写真ベースのものに差し替え
4. ロゴを正式データに差し替え（`src/assets/brand/logo.svg` は仮）
