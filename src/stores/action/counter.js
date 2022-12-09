export const incrementCounter = (data) => {
  return {
    type: "INCREASE",
    data,
  };
};

export const decrementCounter = (data) => {
  return {
    type: "DECREASE",
    data,
  };
};
