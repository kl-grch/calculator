"use client";

import { useContext } from "react";
import "./buttonRound.scss";
import { TypeContext } from "@/app/TypeContext";

export default function ButtonRound({ value, onClick }) {
  const type = useContext(TypeContext);
  let className;

  if (type === "sign") {
    className = "button--sign";
  } else if (type === "other") {
    className = "button--other";
  } else {
    className = null;
  }

  return (
    <button className={"button " + className} onClick={onClick}>
      {value}
    </button>
  );
}
