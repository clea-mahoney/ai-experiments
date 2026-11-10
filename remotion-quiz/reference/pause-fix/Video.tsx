import { AbsoluteFill } from "remotion";
import { useState } from "react";

const answers = [
  { label: "A. Trusting it when it said done", correct: false },
  { label: "B. Short steps, checked by a person", correct: true },
  { label: "C. Letting it plan on its own", correct: false },
];

export const Quiz = ({ onAnswer }: { onAnswer?: () => void }) => {
  const [picked, setPicked] = useState<number | null>(null);
  const result = picked === null ? null : answers[picked].correct;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f1a", fontFamily: "sans-serif", color: "#fff", padding: 60, alignItems: "center" }}>
      <div style={{ fontSize: 48, fontWeight: 700, textAlign: "center", paddingTop: 60, marginBottom: 50 }}>
        What made the free AI useful?
      </div>
      <div style={{ display: "flex", gap: 30, justifyContent: "center" }}>
        {answers.map((answer, i) => (
          <button
            key={answer.label}
            onClick={() => {
              setPicked(i);
              onAnswer?.();
            }}
            style={{
              background: picked === i ? (answer.correct ? "#16a34a" : "#dc2626") : "#1e2a44",
              color: "#fff",
              padding: "24px 40px",
              borderRadius: 16,
              border: "2px solid #33415e",
              cursor: "pointer",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {answer.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 60, fontSize: 28, color: result === null ? "#8892a8" : "#fff", textAlign: "center" }}>
        {result === null
          ? "Click an answer."
          : result
            ? "Right. Short steps and a real check made it work."
            : "Not quite. Try another answer."}
      </div>
    </AbsoluteFill>
  );
};

export default Quiz;
