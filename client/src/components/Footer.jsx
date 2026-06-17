export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-author">
          <p className="name">Rahul Meena</p>
          <a href="mailto:rahu230102069@iiitmanipur.ac.in">rahu230102069@iiitmanipur.ac.in</a>
        </div>
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-cta"
        >
          Built for Digital Heroes
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
