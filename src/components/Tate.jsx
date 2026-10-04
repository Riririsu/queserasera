/**
 * 縦書き。1文字=1ブロックで積むので、端末フォントの縦組みメトリクスに依存しない。
 * （writing-mode に任せると、明朝が無い環境で字送りが崩れることがある）
 */
export default function Tate({ text, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`tate ${className}`} aria-label={text}>
      {Array.from(text).map((c, i) => (
        <span key={i} className="tate__c" aria-hidden="true">
          {c === '　' || c === ' ' ? ' ' : c}
        </span>
      ))}
    </Tag>
  );
}
