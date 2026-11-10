import { Composition } from "remotion";
import { Quiz } from "./Video";

export const Root = () => (
  <Composition id="Quiz" component={Quiz} durationInFrames={150} fps={30} width={1280} height={720} />
);
