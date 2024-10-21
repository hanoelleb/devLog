import { NavBar } from "../page";
import Image from "next/image";
import variables from "../../../styles/variables.module.scss";
import Link from "next/link";

const CharacterSelect = ({ charName }: { charName: string }) => {
  return (
    <>
      <div className={variables[`CharacterSelect${charName}`]}></div>
      <Link href={`/characters/${charName}`}>{charName}</Link>
    </>
  );
};

export default function CharacterCastPage() {
  return (
    <>
      <NavBar></NavBar>
      <h1>Characters</h1>
      <h1>Potential Romances</h1>
      <CharacterSelect charName={"Astrid"}></CharacterSelect>
      <CharacterSelect charName={"Zuri"}></CharacterSelect>
      <h1>Villagers</h1>
      <h1>Outside of Melostead</h1>
    </>
  );
}
