function hasDecimalPlaces(number: number) {
  return number.toString().includes(".");
}

export const calculateExpression = (expression: string) => {
  const operators = {
    "+": (a: number, b: number) =>
      hasDecimalPlaces(a + b) ? (a + b).toFixed(1) : a + b,
    "-": (a: number, b: number) =>
      hasDecimalPlaces(a - b) ? (a - b).toFixed(1) : a - b,
    "*": (a: number, b: number) =>
      hasDecimalPlaces(a * b) ? (a * b).toFixed(1) : a * b,
    "/": (a: number, b: number) =>
      hasDecimalPlaces(a / b) ? (a / b).toFixed(1) : a / b,
  };

  const stack: number[] = [];
  let currentNumber = "";
  let currentOperator: string | null = null;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char >= "0" && char <= "9") {
      currentNumber += char;
    } else if (char === "-" && (i === 0 || expression[i - 1] in operators)) {
      currentNumber += char;
    } else if (char in operators) {
      if (currentNumber !== "") {
        stack.push(parseFloat(currentNumber));
        currentNumber = "";
      }

      if (currentOperator !== null) {
        const b = stack.pop()!;
        const a = stack.pop()!;
        // @ts-ignore
        const result = operators[currentOperator](a, b);
        stack.push(result);
      }

      currentOperator = char;
    }
  }

  if (currentNumber !== "") {
    stack.push(parseFloat(currentNumber));
  }

  if (currentOperator !== null) {
    const b = stack.pop()!;
    const a = stack.pop()!;
    // @ts-ignore
    const result = operators[currentOperator](a, b);
    stack.push(result);
  }

  return stack[0].toString();
  // @ts-ignore
};
