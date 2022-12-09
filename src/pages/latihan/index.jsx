// import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
  // resetCounter,
} from "../../stores/action/latihan";

const Latihan = () => {
  const counterData = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  console.log(counterData.test);

  // const increment = () => {
  //   setCounter(counter + 1);
  // };

  // const decrement = () => {
  //   setCounter(counter - 1);
  // };

  return (
    <div className="container text-center">
      <div>
        counter app
        <hr />
      </div>
      <h3>{counterData.test}</h3>
      <div className="d-flex gap-2 text-center w-100 justify-content-center">
        <button
          className="btn bg-primary text-white"
          onClick={() => dispatch(decrementCounter())}
        >
          -
        </button>
        <button
          className="btn bg-primary text-white"
          onClick={() => dispatch({ type: "RESET_LATIHAN" })}
        >
          reset
        </button>
        <button
          className="btn bg-primary text-white"
          onClick={() => dispatch(incrementCounter(2))}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Latihan;
