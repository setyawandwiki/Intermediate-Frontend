export const incrementCounter = (data) => {
  return {
    type: "INCREASE_LATIHAN",
    data,
  };
};

export const decrementCounter = () => {
  return {
    type: "DECREASE_LATIHAN",
  };
};

// export const resetCounter = () => {
//   return {
//     type: "RESET_LATIHAN",
//   };
// };
