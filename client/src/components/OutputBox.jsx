import { useState } from "react";

function BulletCard({ bullet, index }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bullet);
    } catch {
      const el = document.createElement("textarea");
      el.value = bullet;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="bullet-card fade-in-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="bullet-num">{index + 1}</div>
      <p className="bullet-text">{bullet}</p>
      <button
        onClick={handleCopy}
        className={`btn-copy-bullet ${copied ? "copied" : ""}`}
      >
        {copied ? (
          <>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}

export default function OutputBox({ bullets, onCopyAll }) {
  const [allCopied, setAllCopied] = useState(false);

  if (!bullets || bullets.length === 0) return null;

  const handleCopyAll = async () => {
    await onCopyAll();
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="output">
      <div className="output-header">
        <div className="output-title-group">
          <div className="output-bar" />
          <h2 className="output-title">Generated Bullets</h2>
          <span className="output-count">{bullets.length} bullets</span>
        </div>

        <button
          onClick={handleCopyAll}
          className={`btn-copy-all ${allCopied ? "copied" : ""}`}
        >
          {allCopied ? (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              All Copied!
            </>
          ) : (
            <>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Copy All
            </>
          )}
        </button>
      </div>

      <div className="bullets">
        {bullets.map((bullet, i) => (
          <BulletCard key={i} bullet={bullet} index={i} />
        ))}
      </div>

      <div className="tip-box">
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd" />
        </svg>
        <p>
          These bullets are ATS-optimized. Tailor them to match specific keywords from the job description for best results.
        </p>
      </div>
    </div>
  );
}
