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
      message: "User not authorized",
      status: 401,
    });
  }
  const { id } = await zodValidateData(getRouterParams(event), pathSchema.parse);
  const { authorizationBase } = useRuntimeConfig();
  const user = await getInitialUser(event, authorizationBase);

  const measurement = await ModelMeasurement.findOne(
     can(user, "get-all-measurements") ? { _id: id } : { _id: id, userId: _id }
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
