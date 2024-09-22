"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const words = `Visualize and Design Database Schemas with Ease.
`;

export function Headline() {
  return <TextGenerateEffect words={words} />;
}

export default Headline;