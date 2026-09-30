"use client";

import { useRef, useState, type KeyboardEvent } from "react";

const labels = ["Percakapan", "Draf SOAP"];

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
    <div className="example-stage" id="contoh">
      <div className="example-backing" aria-hidden="true" />
      <section className="du-card example-sheet" aria-label="Contoh catatan konsultasi">
        <div className="example-heading">
          <div><p className="document-context">Ruang konsultasi</p><h2>Catatan kunjungan</h2></div>
          <span className="du-badge du-badge-outline example-label">Contoh</span>
        </div>
        <div className="du-tabs du-tabs-border example-tabs" role="tablist" aria-label="Lihat contoh">
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
              className={`du-tab ${active === index ? "du-tab-active" : ""}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => navigate(event, index)}
            >{label}</button>
          ))}
        </div>
        <div id="example-panel-0" role="tabpanel" aria-labelledby="example-tab-0" hidden={active !== 0} className="example-content">
          <div className="conversation-line"><span>Dokter</span><p>Ada keluhan apa hari ini?</p></div>
          <div className="conversation-line patient-line"><span>Pasien</span><p>Saya pusing dan cepat lelah, Dok. Sudah sekitar tiga hari.</p></div>
          <div className="conversation-line"><span>Dokter</span><p>Ada mual atau muntah?</p></div>
          <div className="conversation-line patient-line"><span>Pasien</span><p>Tidak ada, Dok.</p></div>
        </div>
        <div id="example-panel-1" role="tabpanel" aria-labelledby="example-tab-1" hidden={active !== 1} className="example-content soap-content">
          <div className="soap-row"><span className="soap-letter">S</span><div><h3>Subjektif</h3><p>Keluhan pusing dan cepat lelah sejak tiga hari. Tidak ada mual atau muntah.</p><span className="source-label">Dari percakapan</span></div></div>
          <div className="soap-row"><span className="soap-letter">O</span><div><h3>Objektif</h3><p>Hasil pemeriksaan belum dicatat.</p></div></div>
          <div className="soap-row"><span className="soap-letter">A</span><div><h3>Asesmen</h3><p>Menunggu penilaian dokter.</p></div></div>
          <div className="soap-row"><span className="soap-letter">P</span><div><h3>Rencana</h3><p>Menunggu rencana tindak lanjut.</p></div></div>
        </div>
        <div className="example-note"><span className="review-mark" aria-hidden="true">!</span><p>Draf untuk ditinjau.<br /><strong>Keputusan tetap di tenaga medis.</strong></p></div>
      </section>
      <p className="example-caption">Contoh isi, bukan hasil pemrosesan langsung.</p>
    </div>
  );
}
