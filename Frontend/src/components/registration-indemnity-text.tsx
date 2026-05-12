/** Inline consent body (data authorization, indemnity & waiver). Organisers should have wording reviewed by counsel. */
export default function RegistrationIndemnityText() {
  return (
    <div className="min-w-0 space-y-4 break-words text-[13px] leading-relaxed text-[color:var(--ink-soft)] sm:text-[14px] sm:leading-relaxed">
      <p className="text-sm font-bold leading-snug text-[color:var(--ink)] sm:text-base">
        Muranga Community Run — data authorization, indemnity and waiver form consent
      </p>
      <ol className="list-decimal space-y-3 pl-5 marker:font-bold marker:text-[color:var(--ink)] sm:space-y-4 sm:pl-6">
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Release & indemnity.</span> To the fullest extent
          permitted by applicable law in Kenya, I release, waive, discharge, and agree not to sue the organisers,
          sponsors, partners, contractors, volunteers, officials, medical staff, and host community in connection
          with the event for any liability, loss, injury, damage, or claim arising from my participation, except where
          liability cannot lawfully be excluded.
        </li>
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Medical fitness.</span> I confirm I am medically
          able to participate. I am responsible for seeking professional advice where needed. I will not participate if I
          am unwell or if a medical professional has advised against strenuous activity.
        </li>
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Emergency treatment.</span> In the event of injury or
          illness, I consent to emergency first aid and medical care (including hospital treatment) if reasonably
          required. I accept responsibility for any medical costs incurred unless otherwise arranged by event protocols.
        </li>
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Compliance.</span> I agree to follow race-day rules,
          marshal instructions, traffic directions, safety announcements, and official decisions (including withdrawal or
          cancellation for safety reasons).
        </li>
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Accuracy.</span> The details I submit are true and
          complete to the best of my knowledge.
        </li>
        <li>
          <span className="font-semibold text-[color:var(--ink)]">Media.</span> I understand photographs or recordings
          may be taken during the event and agree that non-identifying use for legitimate promotion or reporting may
          occur in line with applicable data-protection requirements.
        </li>
      </ol>
    </div>
  );
}
