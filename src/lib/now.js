/**
 * 店の「いま」を、確認できている営業情報だけから組み立てる。
 *   17:00 OPEN ／ 22:00 CLOSE ／ 売切れ次第CLOSE ／ 火・水休み
 *
 * 在庫は分からないので「営業中」とは言い切らない。
 * 言えるのは「いまは営業時間です」までで、そこから先は電話とInstagramに渡す。
 * 基準は見ている人の端末ではなく、店のある日本時間。
 */
export const OPEN_H = 17;
export const CLOSE_H = 22;
export const REST_DAYS = [2, 3]; // 火・水

const WD = ['日', '月', '火', '水', '木', '金', '土'];

/** 端末のタイムゾーンに関係なく、日本時間の {年,月,日,曜日,時,分} を取り出す */
export function tokyoParts(date = new Date()) {
  const f = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', weekday: 'short', hour12: false,
  });
  const p = {};
  for (const { type, value } of f.formatToParts(date)) p[type] = value;
  const wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[p.weekday];
  let hour = parseInt(p.hour, 10);
  if (hour === 24) hour = 0; // 環境によって 24 を返すことがある
  return {
    y: +p.year, m: +p.month, d: +p.day,
    wd, wdJa: WD[wd],
    hour, min: +p.minute,
    minutes: hour * 60 + +p.minute,
  };
}

/**
 * state は4つ。
 *   rest   … 定休日
 *   before … 開店前（今日は開く）
 *   open   … 営業時間内（在庫は別）
 *   after  … 本日終了
 */
export function shopState(date = new Date()) {
  const t = tokyoParts(date);
  const isRest = REST_DAYS.includes(t.wd);
  const openMin = OPEN_H * 60;
  const closeMin = CLOSE_H * 60;

  if (isRest) {
    return { state: 'rest', t, label: '本日は定休日', sub: '火曜・水曜はお休みです' };
  }
  if (t.minutes < openMin) {
    const countdown = openMin - t.minutes;
    return {
      state: 'before', t,
      // 開店まで間があるのに「まもなく」とは言わない
      label: countdown <= 180 ? 'まもなく火を入れます' : `本日は ${OPEN_H}:00 から`,
      // 開店まで間がある時は見出しが時刻を言っているので、副文は重ねない
      sub: countdown <= 180 ? `${OPEN_H}:00 から` : '',
      countdown,
    };
  }
  if (t.minutes < closeMin) {
    return {
      state: 'open', t,
      label: 'いまは営業時間です',
      sub: `${CLOSE_H}:00 まで／売切れ次第CLOSE`,
      remain: closeMin - t.minutes,
    };
  }
  return { state: 'after', t, label: '本日は終了しました', sub: `明日は ${OPEN_H}:00 から` };
}

/** 残り/開店までを「◯時間◯分」に */
export function human(mins) {
  if (mins == null) return '';
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}時間${m}分`;
  if (h) return `${h}時間`;
  return `${m}分`;
}

/** 17:00–22:00 のうち、いまどこにいるか（0–1）。営業時間外は null */
export function burnProgress(date = new Date()) {
  const t = tokyoParts(date);
  if (REST_DAYS.includes(t.wd)) return null;
  const a = OPEN_H * 60, b = CLOSE_H * 60;
  if (t.minutes < a || t.minutes >= b) return null;
  return (t.minutes - a) / (b - a);
}
