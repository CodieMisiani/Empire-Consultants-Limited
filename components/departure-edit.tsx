"use client";

import Link from "next/link";
import { KeyboardEvent, useId, useState } from "react";

type Country = "Canada" | "United Kingdom" | "Australia" | "United States" | "Germany" | "Ireland";
type DirectionId = "career" | "community" | "specialised";

type Direction = {
  id: DirectionId;
  label: string;
  introduction: string;
  recommendations: Country[];
};

const countries: Country[] = ["Canada", "United Kingdom", "Australia", "United States", "Germany", "Ireland"];

const directions: Direction[] = [
  {
    id: "career",
    label: "Build an international career",
    introduction: "Begin with destinations known for connecting study, professional experience and an outward-looking future.",
    recommendations: ["Canada", "United Kingdom", "Australia"],
  },
  {
    id: "community",
    label: "Find a welcoming student life",
    introduction: "Start with places that offer a strong student community and a reassuring first chapter abroad.",
    recommendations: ["Canada", "Ireland", "Australia"],
  },
  {
    id: "specialised",
    label: "Pursue a specialised academic path",
    introduction: "Explore destinations with broad programme choice and room to follow a distinctly focused ambition.",
    recommendations: ["United Kingdom", "Germany", "United States"],
  },
];

export function DepartureEdit() {
  const [selectedId, setSelectedId] = useState<DirectionId>(directions[0].id);
  const labelId = useId();
  const selected = directions.find((direction) => direction.id === selectedId) ?? directions[0];
  const selectedContext = `Departure direction: ${selected.label}`;

  function selectWithKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const lastIndex = directions.length - 1;
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lastIndex;
    if (nextIndex === undefined) return;
    event.preventDefault();
    setSelectedId(directions[nextIndex].id);
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("[role='radio']")[nextIndex]?.focus();
  }

  return <section className="departure-edit section" aria-labelledby={labelId}>
    <div className="shell">
      <div className="departure-edit__intro">
        <p className="eyebrow">The Departure Edit</p>
        <h2 id={labelId} className="heading">What should your next chapter make possible?</h2>
      </div>
      <div className="departure-edit__choices" role="radiogroup" aria-label="Choose a study abroad direction">
        {directions.map((direction, index) => {
          const isSelected = direction.id === selected.id;
          return <button key={direction.id} type="button" role="radio" aria-checked={isSelected} tabIndex={isSelected ? 0 : -1} className={`departure-edit__choice${isSelected ? " is-selected" : ""}`} onClick={() => setSelectedId(direction.id)} onKeyDown={(event) => selectWithKeyboard(event, index)}>
            <span className="departure-edit__indicator" aria-hidden="true" />
            {direction.label}
          </button>;
        })}
      </div>
      <div className="departure-edit__result">
        <p className="lead">{selected.introduction}</p>
        <p className="departure-edit__live" aria-live="polite" aria-atomic="true">Recommended destinations for {selected.label}: {selected.recommendations.join(", ")}.</p>
        <Link className="button button-primary" href={`/apply?context=${encodeURIComponent(selectedContext)}`}>Talk through this direction</Link>
      </div>
      <div className="grid grid-3 departure-edit__countries">
        {countries.map((country) => {
          const recommended = selected.recommendations.includes(country);
          return <article className={`card departure-edit__country${recommended ? " is-recommended" : ""}`} key={country}>
            {recommended && <p className="eyebrow departure-edit__recommended">Recommended for this direction</p>}
            <p className="eyebrow">Study in</p>
            <h3 className="heading">{country}</h3>
            <Link href={`/apply?country=${encodeURIComponent(country)}&context=${encodeURIComponent(selectedContext)}`} aria-label={`Apply to study in ${country} for ${selected.label}`}>Explore {country} <span aria-hidden="true">→</span></Link>
          </article>;
        })}
      </div>
    </div>
    <style jsx>{`
      .departure-edit { background:var(--soft); border-block:1px solid var(--line); }
      .departure-edit__intro { max-width:680px; }
      .departure-edit__intro .heading { margin-top:12px; }
      .departure-edit__choices { display:grid; grid-template-columns:repeat(3,1fr); border-block:1px solid var(--line); margin-top:32px; }
      .departure-edit__choice { display:flex; align-items:center; gap:10px; padding:20px 18px; color:var(--navy); border:0; border-left:1px solid var(--line); background:transparent; font-weight:700; text-align:left; transition:color .2s ease,background .2s ease; }
      .departure-edit__choice:first-child { border-left:0; }
      .departure-edit__choice:hover,.departure-edit__choice.is-selected { color:var(--gold); background:var(--paper); }
      .departure-edit__choice:focus-visible { outline:2px solid var(--gold); outline-offset:-3px; }
      .departure-edit__indicator { width:10px; height:10px; flex:0 0 auto; border:1px solid currentColor; border-radius:50%; }
      .departure-edit__choice.is-selected .departure-edit__indicator { border:3px solid var(--gold); }
      .departure-edit__result { display:flex; align-items:center; justify-content:space-between; gap:28px; padding:28px 0; }
      .departure-edit__result .lead { max-width:680px; margin:0; }
      .departure-edit__live { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
      .departure-edit__countries { margin-top:8px; }
      .departure-edit__country { min-height:190px; padding:24px; display:flex; flex-direction:column; justify-content:flex-end; transition:border-color .2s ease, box-shadow .2s ease; }
      .departure-edit__country.is-recommended { border-color:var(--gold); box-shadow:inset 3px 0 0 var(--gold); }
      .departure-edit__country h3 { font-size:1.7rem; margin:12px 0 24px; }
      .departure-edit__country a { color:var(--gold); font-weight:700; }
      .departure-edit__country a:focus-visible { outline:2px solid var(--gold); outline-offset:4px; }
      .departure-edit__recommended { margin:0 0 auto; color:var(--gold); }
      @media (max-width:800px) { .departure-edit__choices { grid-template-columns:1fr; } .departure-edit__choice,.departure-edit__choice:first-child { border-left:0; border-top:1px solid var(--line); } .departure-edit__choice:first-child { border-top:0; } .departure-edit__result { display:grid; align-items:start; } }
      @media (prefers-reduced-motion:reduce) { .departure-edit__choice,.departure-edit__country { transition:none; } }
    `}</style>
  </section>;
}
