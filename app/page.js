"use client";
import "./homePage.scss";

import ButtonRound from "./components/ButtonRound/ButtonRound";
import { useState } from "react";
import { TypeContext } from "./TypeContext";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const signs = ["÷", "×", "−", "+"];

export default function Home() {
  const [numberOne, setNumberOne] = useState(0); // первое число
  const [enterNumberOne, setEnterNumberOne] = useState(false); // статус нажатия на первое число

  const [numberTwo, setNumberTwo] = useState(0); // второе число
  const [enterNumberTwo, setEnterNumberTwo] = useState(false); // статус нажатия на второе число

  const [result, setResult] = useState(0); // результат
  const [enterResult, setEnterResult] = useState(false); // статус вычисления результата

  const [sign, setSign] = useState(null); // знак вычисления между первым и вторым числом
  const [enterSign, setEnterSign] = useState(false); // статус нажатия знака

  function handleClickNumberOne(number) {
    setEnterNumberOne(true);
    setNumberOne((nO) => Number(nO));
    setNumberOne((nO) => String(nO) + number);
    setNumberOne((nO) => Number(nO));
  }

  function handleClickSign(sign) {
    setEnterSign(true);
    setSign(sign);
  }

  function handleClickNumberTwo(number) {
    setEnterNumberOne(false);
    setEnterNumberTwo(true);
    setNumberTwo((nT) => Number(nT));
    setNumberTwo((nT) => String(nT) + number);
    setNumberTwo((nT) => Number(nT));
  }

  function handleClickResult(numberOne, numberTwo, sign) {
    let result;
    switch (sign) {
      case "+":
        result = numberOne + numberTwo;
        break;
      case "-":
        result = numberOne - numberTwo;
        break;
      case "×":
        result = numberOne * numberTwo;
        break;
      case "÷":
        result = numberOne / numberTwo;
        break;
      default:
        null;
    }
    setResult(result);
    setNumberOne(result);
    setEnterNumberOne(true);
    setNumberTwo(0);
    setEnterNumberTwo(false);
    setEnterSign(false);
  }

  function handleClickSignDot() {
    // setNumberOne((nO) => Number(nO));
    // setNumberOne((nO) => String(nO) + number);
    // setNumberOne((nO) => Number(nO));
  }

  function getResult() {
    if (enterResult) {
      return result;
    } else if (enterNumberOne) {
      return numberOne;
    } else if (enterNumberTwo) {
      return numberTwo;
    } else {
      return numberOne;
    }
  }

  function handleClickClearData() {
    setNumberOne(0);
    setEnterNumberOne(false);
    setNumberTwo(0);
    setEnterNumberTwo(false);
    setResult(0);
    setEnterResult(false);
    setSign(null);
    setEnterSign(false);
  }

  console.log({
    numberOne,
    sign,
    numberTwo,
    enterSign,
    result,
    enterNumberOne,
    enterNumberTwo,
  });

  function handleClickReverseData() {
    if (enterNumberOne) {
      return setNumberOne(-numberOne);
    } else if (enterNumberTwo) {
      return setNumberTwo(-numberTwo);
    }
  }

  function handleClickProcentage() {
    if (enterNumberOne) {
      return setNumberOne(numberOne / 100);
    } else if (enterNumberTwo) {
      return setNumberTwo(numberTwo / 100);
    }
  }

  function handleClickNumber(number) {
    // !enterSign
    //   ? () => handleClickNumberOne(number)
    //   : () => handleClickNumberTwo(number);
    if (!enterSign) {
      return handleClickNumberOne(number);
    }
    return handleClickNumberTwo(number);
  }

  return (
    <main>
      <div className="calculator">
        <div className="calculator__input">{getResult()}</div>
        <div className="calculator__buttons">
          <TypeContext.Provider value={"other"}>
            <div className="buttons__memory">
              <ButtonRound
                value={
                  enterNumberOne || enterNumberTwo || enterResult || enterSign
                    ? "C"
                    : "AC"
                }
                onClick={handleClickClearData}
              />
              <ButtonRound value="±" onClick={handleClickReverseData} />
              <ButtonRound value="%" onClick={handleClickProcentage} />
            </div>
          </TypeContext.Provider>

          <TypeContext.Provider value={"sign"}>
            <div className="buttons__signs">
              {signs.map((sign) => (
                <ButtonRound
                  key={sign}
                  value={sign}
                  onClick={() => handleClickSign(sign)}
                />
              ))}
              <ButtonRound
                value="="
                onClick={() => handleClickResult(numberOne, numberTwo, sign)}
              />
            </div>
          </TypeContext.Provider>

          <div className="buttons__numbers">
            {numbers.map((number) => (
              <ButtonRound
                key={number}
                value={number}
                style={
                  number == 0
                    ? { gridArea: "zero", width: "100%", borderRadius: "80px" }
                    : null
                }
                onClick={() => handleClickNumber(number)}
              />
            ))}
            <ButtonRound value="," onClick={handleClickSignDot} />
          </div>
        </div>
      </div>
    </main>
  );
}
