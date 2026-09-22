import { useState } from "react";

/**
 * SmartImage — every image in the template renders through this component.
 * - Accepts local paths ("/assets/photo.jpg") or full https URLs.
 * - object-cover inside a fixed-aspect container, so ANY replacement image
 *   of ANY dimensions looks correct instantly.
 * - Graceful placeholder when the src is missing or fails to load.
 */
export default function SmartImage({ src, alt = "", className = "", eager = false }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        aria-label={alt}
        className={`flex items-center justify-center bg-ink/5 text-ink/30 ${className}`}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
