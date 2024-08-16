export const plusOneVisible = (array, conditionFunc) => {
  let visible = false;
  let step = 2;
  return array
    .toReversed()
    .map((value) => {
      if (conditionFunc(value)) visible = true;
      return { visible, value };
    })
    .toReversed()
    .map(({ visible, value }) => {
      if (!visible) step -= 1;
      return { visible: step > 0, value };
    })
    .filter(({ visible }) => visible)
    .map(({ value }) => value);
};
