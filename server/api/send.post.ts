export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    status: 200,
    message: "OK",
  };
});
