"use client";
import Image from "next/image";
import hole from "./hole.png";
import mole from "./mole.png";
import { useEffect, useState } from "react";

export default function Home() {
  const [score, setScore] = useState(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  function showMole(index: number) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = true;
      return newMoles;
    });
  }

  function hideMole(index: number) {
    setMoles((curMoles) => {
      const newMoles = [...curMoles];
      newMoles[index] = false;
      return newMoles;
    });
  }

  function whackMole(index: number) {
    if (!moles[index]) return;
    hideMole(index);
    setScore(score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      showMole(randomIndex);
      setTimeout(() => {
        hideMole(randomIndex);
      }, 600);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [moles]);

  return (
    <div className="min-h-screen">
      <h1 className="text-center font-bold text-4xl pt-8 text-yellow-500">
        Whack-A-Mole
      </h1>

      <h3 className="text-center font-bold text-lg mt-2 text-slate-700 ">
        Score: {score}
      </h3>
      <div className="grid max-w-[500px] grid-cols-3 mx-auto my-0 h-[500px] p-2 place-items-center">
        {moles.map((isMole, idx) => (
          <Image
            key={idx}
            className="w-auto h-auto"
            src={isMole ? mole : hole}
            alt="hole"
            height={100}
            width={100}
            priority={true}
            onClick={() => {
              whackMole(idx);
            }}
          />
        ))}
      </div>
    </div>
  );
}
