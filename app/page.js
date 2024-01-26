"use client";

import "./homePage.scss";

import { useState } from "react";
import { TypeContext } from "./TypeContext";
import ButtonRound from "./components/ButtonRound/ButtonRound";

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const signs = ["÷", "×", "-", "+"];
const functionalButtons = ["AC", "±", "%"];

export default function Home() {
  const [numberOne, setNumberOne] = useState(0);
  const [enterNumberOne, setEnterNumberOne] = useState(true);
  const [numberTwo, setNumberTwo] = useState(0);
  const [enterNumberTwo, setEnterNumberTwo] = useState(false);
  const [sign, setSign] = useState(null);
  const [enterSign, setEnterSign] = useState(false);
  const [result, setResult] = useState(false);
  const [enterSignDot, setEnterSignDot] = useState(false);

  // ✅ Кнопки ввода чисел
  function handleClickNumber(number) {
    if (enterNumberOne && !enterNumberTwo && !enterSign && !result) {
      getStateNumber(number, setNumberOne, numberOne);
    } else if (enterNumberOne && !enterNumberTwo && enterSign) {
      setEnterNumberTwo(true);
      setEnterNumberOne(false);
      getStateNumber(number, setNumberTwo, numberTwo);
      setResult(false);
    } else if (!enterNumberOne && enterNumberTwo && enterSign && !result) {
      getStateNumber(number, setNumberTwo, numberTwo);
    }
  }

  function getStateNumber(number, setStateNumber, stateNumber) {
    if (stateNumber === 0 && number === 0) {
      false;
      console.log("1 variant"); //  ✅
    } else if (stateNumber === 0 && number !== 0) {
      setStateNumber(number);
      console.log("2 variant"); //  ✅
    } else if (stateNumber !== 0 && !enterSignDot) {
      setStateNumber(String(stateNumber) + number);
      console.log("3 variant"); //  ✅
    } else if (stateNumber.endsWith(".")) {
      setStateNumber(false);
      if (number === 0) {
        setStateNumber(stateNumber + "0");
      } else {
        setStateNumber((n) => String(n) + String(number));
        setStateNumber((n) => Number(n));
      }
      console.log("4 variant");
    }
  }

  // ✅ Нажатие на кнопку равно
  function handleClickSignEqual() {
    function setStateEqual() {
      setResult(true);
      setEnterSign(true);
      setEnterNumberOne(true);
      setNumberTwo(numberTwo);
      setEnterNumberTwo(false);
    }
    if (sign === null) {
      false;
    } else if (sign === "+") {
      setNumberOne(numberOne + numberTwo);
      setStateEqual();
    } else if (sign === "-") {
      setNumberOne(numberOne - numberTwo);
      setStateEqual();
    } else if (sign === "×") {
      setNumberOne(numberOne * numberTwo);
      setStateEqual();
    } else if (sign === "÷") {
      setNumberOne(numberOne / numberTwo);
      setStateEqual();
    }
  }

  //  ✅ Операционные кнопки делить / умножить / вычесть / сложить / равно
  // Доработать повторное нажатие на кнопку, при повторном нажатии на кнопку сначала должно вычислиться выражение нажатое на первую кнопку знака

  function handleClickSign(sign) {
    if (!enterNumberOne && enterNumberTwo && enterSign && !result) {
      let calculation;
      if (sign === "+") {
        calculation = numberOne + numberTwo;
      } else if (sign === "-") {
        calculation = numberOne - numberTwo;
      } else if (sign === "÷") {
        if (numberTwo === 0) {
          calculation = 0;
        } else {
          calculation = numberOne / numberTwo;
        }
      } else if (sign === "×") {
        calculation = numberOne * numberTwo;
      }
      setResult(true);
      setEnterSign(true);
      setNumberOne(calculation);
      setEnterNumberOne(true);
      setNumberTwo(0);
      setEnterNumberTwo(false);
    } else {
      setSign(sign);
      setEnterSign(true);
    }
  }

  // ✅ Функция вывода числа на экран
  function getResult() {
    if (enterNumberOne) {
      return numberOne;
    } else {
      return numberTwo;
    }
  }

  // ✅ Функциональные кнопки очистить данные / плюс - минус / процент от числа
  function handleClickFunctionalButton(functionalButton) {
    if (functionalButton === "AC") {
      if (
        numberOne === 0 &&
        enterNumberOne &&
        numberTwo === 0 &&
        !enterNumberTwo &&
        sign === null &&
        !enterSign &&
        !result &&
        !enterSignDot
      ) {
        false;
      } else {
        setNumberOne(0);
        setEnterNumberOne(true);
        setNumberTwo(0);
        setEnterNumberTwo(false);
        setSign(null);
        setEnterSign(false);
        setResult(false);
        setEnterSignDot(false);
      }
    } else if (functionalButton === "±") {
      if (enterNumberOne && numberOne !== 0) {
        setNumberOne(-numberOne);
      } else if (enterNumberTwo && numberTwo !== 0) {
        setNumberTwo(-numberTwo);
      }
    } else if (functionalButton === "%") {
      if (enterNumberOne && numberOne !== 0) {
        setNumberOne(numberOne / 100);
      } else if (enterNumberTwo && numberTwo !== 0) {
        setNumberTwo(numberTwo / 100);
      }
    }
  }

  // ✅ Кнопка установки значения запятой
  function handleClickSignDot() {
    if (numberOne === 0 && enterNumberOne) {
      setNumberOne("0.");
    } else if (Number.isInteger(numberOne) && enterNumberOne) {
      setNumberOne(String(numberOne) + ".");
      // setEnterSignDot(true);
    } else if (numberTwo === 0 && enterNumberTwo) {
      setNumberTwo("0.");
    } else if (Number.isInteger(numberTwo) && enterNumberTwo) {
      setNumberTwo(String(numberTwo) + ".");
      // setEnterSignDot(true);
    }
  }

  console.log(
    `
    numberOne: ${numberOne}
    numberTwo: ${numberTwo}
    sign: ${sign}
    enterNumberOne: ${enterNumberOne}
    enterNumberTwo: ${enterNumberTwo}
    enterSign: ${enterSign}
    result: ${result}
    enterSignDot: ${enterSignDot}
    `
  );

  return (
    <main>
      <div className="calculator">
        <div className="calculator__input">
          <p>{getResult()}</p>
        </div>
        <div className="calculator__buttons">
          <TypeContext.Provider value={"other"}>
            <div className="buttons__memory">
              {functionalButtons.map((functionalButton, i) => (
                <ButtonRound
                  key={i}
                  value={functionalButton}
                  onClick={() => handleClickFunctionalButton(functionalButton)}
                />
              ))}
            </div>
          </TypeContext.Provider>

          <TypeContext.Provider value={"sign"} activeStatus={enterSign}>
            <div className="buttons__signs">
              {signs.map((sign) => (
                <ButtonRound
                  key={sign}
                  activeStatus={enterSign}
                  value={sign}
                  onClick={() => handleClickSign(sign)}
                />
              ))}
              <ButtonRound value="=" onClick={handleClickSignEqual} />
            </div>
          </TypeContext.Provider>

          <TypeContext.Provider value={"number"}>
            <div className="buttons__numbers">
              {numbers.map((number) => (
                <ButtonRound
                  key={number}
                  value={number}
                  onClick={() => handleClickNumber(number)}
                />
              ))}
              <ButtonRound value="," onClick={handleClickSignDot} />
            </div>
          </TypeContext.Provider>
        </div>
      </div>
    </main>
  );
}
