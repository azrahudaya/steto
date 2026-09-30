"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const labels = ["Conversation", "SOAP draft"];

export function LandingExample() {
  const [active, setActive] = useState(1);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") next = 1 - index;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 1;
    else return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return (
    <div className="example-stage" id="example">
      <div className="example-backing" aria-hidden="true" />
      <section className="du-card example-sheet" aria-label="Sample consultation note">
        <div className="example-heading">
          <div><p className="document-context">Consult room</p><h2>Visit note</h2></div>
          <span className="du-badge du-badge-outline example-label">Sample</span>
        </div>
        <div className="tabs tabs-border example-tabs" role="tablist" aria-label="View sample">
          {labels.map((label, index) => (
            <button
              key={label}
              ref={(el) => { buttons.current[index] = el; }}
              id={`example-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`example-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              className={`tab ${active === index ? "tab-active" : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigate(event, index)}
            >{label}</button>
          ))}
        </div>
        <div id="example-panel-0" role="tabpanel" aria-labelledby="example-tab-0" hidden={active !== 0} className="example-content">
          <div className="conversation-line"><span>Doctor</span><p>What brings you in today?</p></div>
          <div className="conversation-line patient-line"><span>Patient</span><p>Dizziness and tiredness for about three days.</p></div>
          <div className="conversation-line"><span>Doctor</span><p>Any nausea or vomiting?</p></div>
          <div className="conversation-line patient-line"><span>Patient</span><p>No, none.</p></div>
        </div>
        <div id="example-panel-1" role="tabpanel" aria-labelledby="example-tab-1" hidden={active !== 1} className="example-content soap-content">
          <div className="soap-row"><span className="soap-letter">S</span><div><h3>Subjective</h3><p>Dizziness and tiredness for three days. No nausea or vomiting.</p><span className="source-label">From the conversation</span></div></div>
          <div className="soap-row"><span className="soap-letter">O</span><div><h3>Objective</h3><p>Exam findings not yet recorded.</p></div></div>
          <div className="soap-row"><span className="soap-letter">A</span><div><h3>Assessment</h3><p>Awaiting clinician assessment.</p></div></div>
          <div className="soap-row"><span className="soap-letter">P</span><div><h3>Plan</h3><p>Awaiting follow-up plan.</p></div></div>
        </div>
        <div className="example-note"><span className="review-mark" aria-hidden="true">!</span><p>Draft for review.<br /><strong>Final decisions stay with the clinician.</strong></p></div>
      </section>
      <p className="example-caption">Sample content, not a live processing result.</p>
    </div>
  );
}
