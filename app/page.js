"use client";
import "./homePage.scss";

import ButtonRound from "./components/ButtonRound/ButtonRound";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);
  const [numberOne, setNumberOne] = useState(0);
  const [numberTwo, setNumberTwo] = useState(0);
  return (
    <main>
      <div className="calculator">
        <div className="calculator__input">{count}</div>
        <div className="calculator__buttons">
          <div className="buttons__memory">
            <ButtonRound
              title="AC"
              colorButton={"#A5A5A5"}
              colorText={"#000000"}
            />
            <ButtonRound
              title="±"
              colorButton={"#A5A5A5"}
              colorText={"#000000"}
            />
            <ButtonRound
              title="%"
              colorButton={"#A5A5A5"}
              colorText={"#000000"}
            />
          </div>
          <div className="buttons__signs">
            <ButtonRound title="÷" colorButton={"#FF9F0B"} />
            <ButtonRound title="×" colorButton={"#FF9F0B"} />
            <ButtonRound title="-" colorButton={"#FF9F0B"} />
            <ButtonRound title="+" colorButton={"#FF9F0B"} />
            <ButtonRound title="=" colorButton={"#FF9F0B"} />
          </div>
          <div className="buttons__numbers">
            <ButtonRound title="1" onClick={() => setCount(1)} />
            <ButtonRound title="2" onClick={() => setCount(2)} />
            <ButtonRound title="3" onClick={() => setCount(3)} />
            <ButtonRound title="4" onClick={() => setCount(4)} />
            <ButtonRound title="5" onClick={() => setCount(5)} />
            <ButtonRound title="6" onClick={() => setCount(6)} />
            <ButtonRound title="7" onClick={() => setCount(7)} />
            <ButtonRound title="8" onClick={() => setCount(8)} />
            <ButtonRound title="9" onClick={() => setCount(9)} />
            <ButtonRound title="0" onClick={() => setCount(0)} />
            <ButtonRound title="," onClick={() => setCount(",")} />
          </div>
        </div>
      </div>
    </main>
  );
}
