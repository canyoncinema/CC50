export const optimalColWidths = (num) => {
  const widths = []
  if (num === 1) widths.push(1);
  if (num === 2) widths.push(2);
  if (num === 3) widths.push(3);
  if (num > 3) {
    while (num > 0) {
      widths.push(3);
      num -= 3;
    }
  }
  return widths;
};
