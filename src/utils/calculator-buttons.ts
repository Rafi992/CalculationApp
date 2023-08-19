import BackIcon from "/back-icon.svg";

enum Actions {
  Add = "add",
  Substract = "substract",
  Multiple = "multiple",
  Divide = "divide",
  Equal = "equal",
  Back = "back",
  C = "clear",
  Reverse = "reverse",
}

export const mainButtons = [
  {
    id: 1,
    value: "7",
    action: "number",
  },
  {
    id: 2,
    value: "8",
    action: "number",
  },
  {
    id: 3,
    value: "9",
    action: "number",
  },
  {
    id: 4,
    value: "4",
    action: "number",
  },
  {
    id: 5,
    value: "5",
    action: "number",
  },
  {
    id: 6,
    value: "6",
    action: "number",
  },
  {
    id: 7,
    value: "1",
    action: "number",
  },
  {
    id: 8,
    value: "2",
    action: "number",
  },
  {
    id: 9,
    value: "3",
    action: "number",
  },
  {
    id: 10,
    value: ".",
    action: "sign",
  },
  {
    id: 11,
    value: "0",
    action: "number",
  },
  {
    id: 12,
    value: "C",
    action: Actions.C,
  },
];

export const actionButtons = [
  {
    id: 1,
    value: "+/-",
    action: Actions.Reverse,
  },
  {
    id: 2,
    value: "<",
    action: Actions.Back,
    icon: BackIcon,
  },
  {
    id: 3,
    value: "+",
    action: Actions.Add,
  },
  {
    id: 4,
    value: "-",
    action: Actions.Substract,
  },
  {
    id: 5,
    value: "*",
    action: Actions.Multiple,
  },
  {
    id: 6,
    value: "/",
    action: Actions.Divide,
  },
];
