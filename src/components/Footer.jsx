import { SITE, NAV } from '../data/site.js';

export default function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft__in">
        <div className="ft__brand">
          <p className="ft__name"><span>{SITE.nameSub}</span>{SITE.nameShort}</p>
          <p className="ft__addr">{SITE.address}</p>
          <p className="ft__tel"><a href={SITE.telLink}>{SITE.tel}</a></p>
        </div>
        <nav className="ft__nav" aria-label="フッターナビゲーション">
          <ul>
            {NAV.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="ft__demo">RIKKUN WEB STUDIO｜提案用デモ</p>
    </footer>
  );
}
