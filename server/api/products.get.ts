import { mockProducts } from "~~/server/mocks/products";

export default defineEventHandler(async (event) => {
  console.log("download products start..");
  await new Promise((answer) => setTimeout(answer, 2000));
  console.log("download products complete!");

  return mockProducts;
});
