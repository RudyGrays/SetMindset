"use client";
import Image from "next/image";
import Logo2 from "../images/morty.webp";

export const Logo = () => {
  return (
    <Image className="rounded-xl w-10 h-10 min-w-max" src={Logo2} alt="#" />
  );
};
