export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  ///
  console.log("Received application data have been saved:", {
    id: body.id,
    products: body.products,
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!body || !body.id || !Array.isArray(body.products)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid request format",
    });
  }

  return {
    status: 200,
    message: "OK",
    success: true,
  };
});
