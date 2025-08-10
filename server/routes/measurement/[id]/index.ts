import { z } from "zod";

const pathSchema = z.object({
  id: z.string().transform(objectIdTransform),
});

export default eventHandler(async (event) => {
  let _id: string;
  try {
    _id = await getUserId(event);
  } catch (error) {
    throw createError({
      message: "User not authprized",
      status: 401,
    });
  }
  const { id } = await zodValidateData(getRouterParams(event), pathSchema.parse);
  const role = await getUserRole(event);

  const measurement = await ModelMeasurement.findOne(
     role !== "admin" ? { _id: id, userId: _id } : { _id: id }
  );
  if (!measurement) {
    throw createError({
      message: "Measurement not found",
      status: 404,
    });
  }
  return {
    success: true,
    measurement,
  };
});
