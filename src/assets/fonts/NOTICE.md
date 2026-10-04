# 同梱フォントについて

## Kaisei Tokumin（解星 篤ミン）

- ファイル: `kaisei-tokumin-500.subset.woff2` / `kaisei-tokumin-700.subset.woff2`
- Copyright 2020 The Kaisei Project Authors (https://github.com/Font-Kai/Kaisei)
- ライセンス: SIL Open Font License 1.1 — https://scripts.sil.org/OFL
- バージョン: 5.003

OFL 1.1 のもとで再配布・改変（サブセット化）が認められています。
本プロジェクトでは、**このサイトで実際に使用する394文字のみ**に絞り込んで同梱しています。

### 絞り込みの手順（文言を変更したら作り直す）

サイトの文言を変えて新しい漢字が増えた場合、そのままだと端末の明朝に
フォールバックして字面が混ざります。その際は再生成してください。

1. `src/` と `index.html` から使用文字を抽出
2. Google Fonts の CSS から必要なサブセットのみ取得
3. `fonttools` で統合・サブセット化して woff2 に出力

絞り込み前は約1.1MB、絞り込み後は 500/700 の2ウェイトで約159KBです。
