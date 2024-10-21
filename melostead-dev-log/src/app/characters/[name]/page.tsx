"use client";
import Image from "next/image";
import variables from "../../../../styles/variables.module.scss";
import dialogue from "../../../../json/dialogue/Dialogue.json";
import { useState } from "react";

import { usePathname } from "next/navigation";
import { NavBar } from "../../page";

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

  const { Zuri, Astrid } = dialogue;

  let characterDialogue: { emotion: string; content: string }[];

  switch (characterName) {
    case "Astrid":
      characterDialogue = Astrid;
      break;
    case "Zuri":
      characterDialogue = Zuri;
      break;
    default:
      characterDialogue = Astrid;
      break;
  }

  const SENTENCES_LENGTH = characterDialogue.length;

  const [sentenceValue, setSentenceValue] = useState(0);

  const handleNextSentence = () => {
    setSentenceValue((sentenceValue + 1) % SENTENCES_LENGTH);
  };

  const { emotion, content } = characterDialogue[sentenceValue];

  return (
    <>
      <NavBar></NavBar>
      <h1>{characterName}</h1>

      <Image
        width={512}
        height={512}
        src={`/portraits/${characterName}/${emotion}.png`}
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
