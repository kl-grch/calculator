"use client";

import "./buttonRound.scss";

export default function ButtonRound({
  title = "?",
  onClick,
  className,
  colorButton,
  colorText,
}) {
  return (
    <button
      className={className}
      onClick={onClick}
      style={{ backgroundColor: colorButton, color: colorText }}
    >
      {title}
    </button>
  );
}
