import { calculatorReducer, div, mult, sub, sum } from './Tasks';


test("sum", () => {
  const state = 10
  const num = 5

  const result = sum(state, num)
  expect(result).toBe(15)

})

test("sub", () => {
   expect(sub(10, 5)).toBe(5)
})

test("div", () => {
  expect(div(10, 5)).toBe(2)
})

test("mult", () => {
  expect(mult(10, 5)).toBe(50)
})

test ("sum whis reduser", () => {
  expect(calculatorReducer(3, {type: "SUM", num: 5})).toBe(8)
})
