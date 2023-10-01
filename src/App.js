import { useState } from "react";
import "./App.css";

export default function App() {
  const [currentOperand, setCurrentOperand] = useState("");
  const [previousOperand, setPreviousOperand] = useState("");
  const [operation, setOperation] = useState("");

  function handleCurrentOperand(value) {
    setCurrentOperand((currentOperand) => currentOperand + value);
  }
  function handleDelete() {
    setCurrentOperand((currentOperand) =>
      currentOperand.substring(0, currentOperand.length - 1)
    );
  }
  function handleDeleteAll() {
    setCurrentOperand("");
  }

  function validate() {
    const regex = /^\d+\.?\d*$/;
    if (!regex.test(currentOperand)) {
      return false;
    }
    return true;
  }

  function handleOperatorSelection(value) {
    if (validate()) {
      setOperation(value);
      setPreviousOperand(currentOperand);
      setCurrentOperand("");
    }
  }

  function handleSolution() {
    if (!currentOperand || !previousOperand || !operation || !validate())
      return;
    const result = evaluate(previousOperand, operation, currentOperand);
    setPreviousOperand(
      (previousOperand) => previousOperand + operation + currentOperand
    );
    setCurrentOperand("" + result);
    setOperation("");
  }

  function evaluate(previousOperand, operation, currentOperand) {
    switch (operation) {
      case "+":
        return parseFloat(previousOperand) + parseFloat(currentOperand);
      case "-":
        return parseFloat(previousOperand) - parseFloat(currentOperand);
      case "*":
        return parseFloat(previousOperand) * parseFloat(currentOperand);
      case "÷":
        return parseFloat(previousOperand) / parseFloat(currentOperand);
      default:
        return 0;
    }
  }

  return (
    <div className="calci--container">
      <div className="calculator--grid">
        <div className="output">
          <div className="previous--operand">{previousOperand + operation}</div>
          <div className="current--operand">{currentOperand}</div>
        </div>
        <button className="span--two" onClick={handleDeleteAll}>
          AC
        </button>
        <button onClick={handleDelete}>DEL</button>
        <button onClick={() => handleOperatorSelection("÷")}>÷</button>
        <button onClick={() => handleCurrentOperand("1")}>1</button>
        <button onClick={() => handleCurrentOperand("2")}>2</button>
        <button onClick={() => handleCurrentOperand("3")}>3</button>
        <button onClick={() => handleOperatorSelection("*")}>*</button>
        <button onClick={() => handleCurrentOperand("4")}>4</button>
        <button onClick={() => handleCurrentOperand("5")}>5</button>
        <button onClick={() => handleCurrentOperand("6")}>6</button>
        <button onClick={() => handleOperatorSelection("+")}>+</button>
        <button onClick={() => handleCurrentOperand("7")}>7</button>
        <button onClick={() => handleCurrentOperand("8")}>8</button>
        <button onClick={() => handleCurrentOperand("9")}>9</button>
        <button onClick={() => handleOperatorSelection("-")}>-</button>
        <button onClick={() => handleCurrentOperand(".")}>.</button>
        <button onClick={() => handleCurrentOperand("0")}>0</button>
        <button className="span--two" onClick={handleSolution}>
          =
        </button>
      </div>
    </div>
  );
}
