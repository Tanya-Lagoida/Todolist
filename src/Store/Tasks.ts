export const sum = (state: number, num: number): number => state + num;
export const sub = (state: number, num: number): number => state - num;
export const div = (state: number, num: number): number => state / num;
export const mult = (state: number, num: number): number => state * num;

export type ActionType = {
  type: "SUM" | "SUB" | "DIV" | "MULT"
  num: number
}

export const calculatorReducer = (state: number, action: ActionType ) => {
  switch (action.type) {
    case "SUM":
      return state + action.num
    case "SUB":
      return state - action.num
    case "DIV":
      return state / action.num
    case "MULT":
      return state * action.num
    default:
      return state

  }

}