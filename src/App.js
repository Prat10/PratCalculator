import { useState, useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
function App() {
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)

    }, 5000)
  }, [])

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if (
      (ops.includes(value)) && (calc === '' ||             //this code used for No double operators
        ops.includes(value)) && (ops.includes(calc.slice(-1)//only one operator one time 
        ))
    ) {
      return;
    }
    setCalc(calc + value);

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  }

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())}
          key={i}>
          {i}
        </button>
      )
    }

    return digits;
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
  }
  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);

    setCalc(value);
  }
  return (
    <div className="App">
      {

        loading ?
          <BarLoader
            color={"#d73797"}
            loading={loading}
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          :
          <div className="Calculator">
            <div className="display">
              {result ? <span>({result})</span> : ''} &nbsp;
              {calc || "0"}
            </div>
            <div className="operators">
              <button onClick={() => updateCalc('/')}>/</button>
              <button onClick={() => updateCalc('*')}>*</button>
              <button onClick={() => updateCalc('+')}>+</button>
              <button onClick={() => updateCalc('-')}>-</button>
              <button onClick={deleteLast}>DEL</button>
            </div>
            <div className="digits">
              {createDigits()}
              <button onClick={() => updateCalc('0')}>0</button>
              <button onClick={() => updateCalc('.')}>.</button>

              <button onClick={calculate}>=</button>
            </div>
          </div>
      }
    </div>
  );
}

export default App;
