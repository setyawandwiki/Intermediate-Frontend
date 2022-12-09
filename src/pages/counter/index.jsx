import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementCounter } from "../../stores/action/counter";

function Counter() {
  // let counter1 = 0;
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  // value 1/index 0 = untuk memanggil nilai di dalam variabel
  // value 2/index 1 = untuk merubah nilai di dalam variable tsb
  const counterData = useSelector((state) => state.counter);
  // const increment = (data) => {
  //   console.log("INCREMENT DATA", data);
  //   setCounter(counter + data);
  // };
  const decrement = () => {
    console.log("DECREMENT DATA");
    setCounter(counter - 1);
  };

  return (
    <div className="container text-center">
      <div>
        <h1>Counter App</h1>
        <hr />
        <h3>{counter}</h3>
        <button className="btn btn-primary" onClick={decrement}>
          -
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => {
            console.log("RESET DATA");
            setCounter(0);
          }}
        >
          Reset
        </button>
        <button
          className="btn btn-primary"
          onClick={() => dispatch(incrementCounter())}
        >
          +2
        </button>
      </div>
      <h3>{counterData.count}</h3>
    </div>
  );
}

export default Counter;
