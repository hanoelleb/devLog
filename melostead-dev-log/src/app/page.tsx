"use client";

import Image from "next/image";
import Link from "next/link";

import variables from "../../styles/variables.module.scss";

export const NavBar = () => {
  return (
    <div className={variables.NavBar}>
      <Link href="/">Home</Link>
      <Link href="/blog">Blog</Link>
      <Link href="/media">Media</Link>
      <Link href="/characters">Characters</Link>
      <Link href="/customizer">Character Creator Demo</Link>
    </div>
  );
};

export default function Home() {
  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <NavBar></NavBar>
        <img
          className="dark:invert"
          src="/logo.png"
          alt="Made in Melostead logo"
          width={640}
          height={360}
        />
      </main>
    </div>
  );
}
