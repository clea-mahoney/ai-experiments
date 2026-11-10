import { AbsoluteFill, Sequence } from "remotion";
import { Quiz } from "./Video";

const SCENE = 120; // 4 seconds at 30 frames per second
const QUIZ = 300;

const lines = [
  "Can free AI models build a clickable video?",
  "I set up free models in my terminal to find out.",
  "They wrote code fast. They also said broken things worked.",
  "So a stronger AI wrote the plan. The free AI followed it, one step at a time.",
  "I checked every result myself.",
  "Here's what I learned. Try the quiz.",
];

export const QUIZ_START = lines.length * SCENE;
export const STORY_FRAMES = QUIZ_START + QUIZ;

const Scene = ({ text }: { text: string }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#0f0f1a",
      color: "#fff",
      fontFamily: "sans-serif",
      justifyContent: "center",
      alignItems: "center",
      padding: 100,
      fontSize: 56,
      fontWeight: 700,
      textAlign: "center",
      lineHeight: 1.3,
    }}
  >
    {text}
  </AbsoluteFill>
);

export const Story = ({ onAnswer }: { onAnswer?: () => void }) => (
  <AbsoluteFill>
    {lines.map((text, i) => (
      <Sequence key={i} from={i * SCENE} durationInFrames={SCENE}>
        <Scene text={text} />
      </Sequence>
    ))}
    <Sequence from={lines.length * SCENE}>
      <Quiz onAnswer={onAnswer} />
    </Sequence>
  </AbsoluteFill>
);
