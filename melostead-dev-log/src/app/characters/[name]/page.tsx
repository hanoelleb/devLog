"use client";
import Image from "next/image";
import variables from "../../../../styles/variables.module.scss";
import dialogue from "../../../../json/dialogue/Astrid/Dialogue.json";
import { useState } from "react";

import { usePathname } from "next/navigation";

const TextBox = ({ sentence }: { sentence: string }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: variables.uiLightColor,
          borderWidth: "5px",
          borderRadius: "20px",
          borderStyle: "solid",
          borderColor: variables.uiDarkColor,
          width: 800,
          height: 200,
          marginTop: -100,
          position: "absolute",
        }}
      >
        <p>{sentence}</p>
      </div>
    </>
  );
};

export default function CharacterPage() {
  const characterName = usePathname().split("/")[2];

  const SENTENCES_LENGTH = dialogue.sentences.length;

  const [sentenceValue, setSentenceValue] = useState(0);

  const handleNextSentence = () => {
    setSentenceValue((sentenceValue + 1) % SENTENCES_LENGTH);
  };

  const { emotion, content } = dialogue.sentences[sentenceValue];

  return (
    <>
      <h1>{characterName}</h1>

      <Image
        width={512}
        height={512}
        src={`/portraits/Astrid/${emotion}.png`}
        alt={`Pixel art portrait of ${characterName}`}
        quality={100}
      ></Image>
      <button onClick={handleNextSentence} style={{ position: "absolute" }}>
        next
      </button>
      <TextBox sentence={content}></TextBox>
    </>
  );
}
