import Image from "next/image";
import Link from "next/link";

export type PartnerLogo = {
  src: string;
  alt: string;
  /** Optional — wrap the logo in a link */
  href?: string;
  /** No bordered card — logo sits directly on the strip */
  plain?: boolean;
};

/**
 * Add more partner / sponsor logos here. The row scrolls in a continuous loop.
 */
export const PARTNER_LOGOS: PartnerLogo[] = [
  {
    src: "https://ik.imagekit.io/eizd2ue5a/pwani_oil.png",
    alt: "Pwani Oil",
    plain: true,
  },
  {
    src: "https://ik.imagekit.io/eizd2ue5a/athletics_kenya.jpeg",
    alt: "Athletics Kenya",
    plain: true,
  },
  {
    src: "https://ik.imagekit.io/eizd2ue5a/tawc_logo.png?updatedAt=1775563574265",
    alt: "The Athletes Wellness Club",
    plain: true,
  },
  {
    src: "https://ik.imagekit.io/eizd2ue5a/ministry_sports.png",
    alt: "Ministry of Sports, Culture and Heritage, Kenya",
    plain: true,
  },
  {
    src: "https://ik.imagekit.io/eizd2ue5a/muranga-county.jpg",
    alt: "Muranga County Government",
    plain: true,
  },
];

function PartnerMark({ item }: { item: PartnerLogo }) {
  const image = (
    <Image
      src={item.src}
      alt={item.alt}
      width={280}
      height={123}
      sizes="(max-width: 640px) 58vw, 280px"
      style={{ width: "auto", height: "auto" }}
      className={
        item.plain
          ? "h-auto w-[min(220px,64vw)] max-h-24 object-contain sm:w-[min(280px,58vw)] sm:max-h-32"
          : "h-full w-auto max-h-[4.5rem] object-contain sm:max-h-20"
      }
    />
  );

  const inner = item.plain ? (
    <div className="partner-icon-motion flex shrink-0 items-center justify-center px-3 py-2 sm:px-5 sm:py-3">
      {image}
    </div>
  ) : (
    <div className="partner-icon-motion flex h-24 w-[min(240px,48vw)] shrink-0 items-center justify-center rounded-xl border border-[color:var(--hairline)] bg-transparent px-5 py-3 shadow-sm transition duration-300 hover:border-[color:var(--green)]/30 hover:shadow-md sm:h-28 sm:w-60">
      {image}
    </div>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        {inner}
      </Link>
    );
  }

  return <div className="shrink-0">{inner}</div>;
}

export default function PartnersSection() {
  return (
    <section
      className="relative overflow-hidden border-y border-[color:var(--hairline)] bg-white"
      aria-labelledby="partners-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,102,0,0.14) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <div className="mb-8 text-center sm:mb-10">
          <p className="eyebrow">With thanks to</p>
          <h2
            id="partners-heading"
            className="mt-2 font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]"
            style={{ fontSize: "clamp(22px, 3.5vw, 36px)" }}
          >
            Partners <span className="text-[color:var(--green)]">&</span> sponsors
          </h2>
          <div
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[color:var(--red)] via-[color:var(--yellow)] to-[color:var(--green)]"
            aria-hidden
          />
        </div>

        <div className="relative -mx-4 sm:mx-0">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-16"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-16"
            aria-hidden
          />

          <div className="overflow-hidden py-1">
            <div className="site-marquee-track">
              <div className="flex shrink-0 items-center gap-6 pr-6 sm:gap-12 sm:pr-12">
                {PARTNER_LOGOS.map((item) => (
                  <PartnerMark key={item.src} item={item} />
                ))}
              </div>
              <div
                className="flex shrink-0 items-center gap-6 pr-6 sm:gap-12 sm:pr-12"
                aria-hidden
              >
                {PARTNER_LOGOS.map((item) => (
                  <PartnerMark key={`${item.src}-dup`} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
