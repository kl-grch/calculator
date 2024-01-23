"use client";

import { useContext } from "react";
import "./buttonRound.scss";
import { TypeContext } from "@/app/TypeContext";

export default function ButtonRound({ value, onClick, style }) {
  const type = useContext(TypeContext);
  let className;
  let zeroStyle;

  if (type === "sign") {
    className = " button--sign";
  } else if (type === "other") {
    className = " button--other";
  } else {
    className = "";
  }
  
  return (
    <button
      className={"button" + className}
      onClick={onClick}
      style={style}
    >
      {value}
    </button>
  );
}
