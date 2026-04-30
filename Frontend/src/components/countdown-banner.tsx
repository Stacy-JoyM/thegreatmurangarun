"use client";

import { useEffect, useState } from "react";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  finished: boolean;
};

const targetDateMs = new Date("2026-05-31T00:00:00+03:00").getTime();

function getCountdown(): Countdown {
  const now = Date.now();
  const diff = targetDateMs - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, finished: false };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

function TimeBlock({
  value,
  label,
  className = "",
  valueClassName = "",
  labelClassName = "",
}: {
  value: string | number;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`w-full rounded-lg bg-white/10 px-2 py-2 text-center ring-1 ring-white/18 backdrop-blur-sm ${className}`}>
      <p className={`text-xl font-extrabold leading-none tracking-tight text-white ${valueClassName}`}>
        {value}
      </p>
      <p className={`mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-white/75 ${labelClassName}`}>
        {label}
      </p>
    </div>
  );
}

export default function CountdownBanner() {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    finished: false,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="w-full border-y border-white/20 bg-[linear-gradient(100deg,#0d1b11_0%,#112416_50%,#0d1b11_100%)] px-3 py-2 shadow-[0_12px_26px_-20px_rgba(0,0,0,0.75)] md:hidden">
        {countdown.finished ? (
          <div className="rounded-lg border border-[color:var(--yellow)]/35 bg-[color:var(--yellow)]/15 px-3 py-2 text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.1em] text-[color:var(--yellow)]">
              It&apos;s Race Day. Let&apos;s Go!
            </p>
          </div>
        ) : (
          <div className="grid w-full grid-cols-4 gap-1.5">
            <TimeBlock value={countdown.days} label="Days" valueClassName="text-base" labelClassName="text-[8px]" />
            <TimeBlock value={pad(countdown.hours)} label="Hours" valueClassName="text-base" labelClassName="text-[8px]" />
            <TimeBlock value={pad(countdown.minutes)} label="Minutes" valueClassName="text-base" labelClassName="text-[8px]" />
            <TimeBlock value={pad(countdown.seconds)} label="Seconds" valueClassName="text-base" labelClassName="text-[8px]" />
          </div>
        )}
      </div>

      <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="w-[112px] rounded-xl border border-white/20 bg-[linear-gradient(100deg,#0d1b11_0%,#112416_50%,#0d1b11_100%)] p-2 shadow-[0_12px_26px_-20px_rgba(0,0,0,0.75)]">
          {countdown.finished ? (
            <div className="rounded-lg border border-[color:var(--yellow)]/35 bg-[color:var(--yellow)]/15 px-2 py-2 text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-[color:var(--yellow)]">
                It&apos;s Race Day. Let&apos;s Go!
              </p>
            </div>
          ) : (
            <div className="grid w-full grid-cols-1 gap-1.5">
              <TimeBlock value={countdown.days} label="Days" />
              <TimeBlock value={pad(countdown.hours)} label="Hours" />
              <TimeBlock value={pad(countdown.minutes)} label="Minutes" />
              <TimeBlock value={pad(countdown.seconds)} label="Seconds" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
