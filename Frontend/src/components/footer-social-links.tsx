/**
 * Add more entries here as you grow social presence (href + label + icon key).
 */
export const FOOTER_SOCIAL_LINKS = [
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@great.muranga.com.run",
    icon: "tiktok" as const,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/the_greatmurangacommunityrun/",
    icon: "instagram" as const,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/share/1B7AizEmE5/?mibextid=wwXIfr",
    icon: "facebook" as const,
  },
] as const;

/** Simple Icons–style TikTok mark (updated path, balanced in 24×24 viewBox) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`block shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`block shrink-0 ${className ?? ""}`}
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05S0 3.603 0 8.049c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`block shrink-0 ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: (typeof FOOTER_SOCIAL_LINKS)[number]["icon"] }) {
  const cls = "h-5 w-5";
  switch (icon) {
    case "tiktok":
      return <TikTokIcon className={cls} />;
    case "instagram":
      return <InstagramIcon className={cls} />;
    case "facebook":
      return <FacebookIcon className={cls} />;
    default:
      return null;
  }
}

export default function FooterSocialLinks() {
  return (
    <div className="mt-10 border-t border-white/20 pt-8">
      <h3
        id="footer-social-heading"
        className="mb-4 max-w-md text-center text-[clamp(1.05rem,2.8vw,1.45rem)] font-extrabold leading-snug tracking-tight text-white sm:text-left"
      >
        Follow Us on Our{" "}
        <span className="inline-block rounded-md bg-white px-2.5 py-1 text-[#003b00] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.45)] ring-1 ring-white/25">
          Socials
        </span>
      </h3>
      <ul className="flex flex-wrap items-center justify-center gap-3 sm:justify-start" aria-labelledby="footer-social-heading">
        {FOOTER_SOCIAL_LINKS.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.name} (opens in a new tab)`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2a2c30]"
            >
              <SocialIcon icon={item.icon} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
