import { z } from "zod";

const updateMeasurementSchema = z.object({
	timestamp: z.number().default(() => Date.now()),
	type: z.string(),
	meta: z.record(z.string(), z.any()).default({}),
});

export default eventHandler(async (event) => {
	const _id = await getUserId(event);
	const measurementId = getRouterParam(event, "id");
	const updateData = await zodValidateBody(
		event,
		updateMeasurementSchema.parse,
	);
	const { authorizationBase } = useRuntimeConfig();
	const user = await getInitialUser(event, authorizationBase);

	try {
		const updatedMeasurement = await ModelMeasurement.findOneAndUpdate(
			can(user, "update-all-measurements")
				? { _id: measurementId }
				: { _id: measurementId, userId: _id },
			{ $set: updateData },
			{ new: true },
		);
		return {
			success: true,
			measurement: updatedMeasurement,
		};
	} catch {
		throw createError({
			message: "Measurement not found",
			status: 404,
		});
	}
});
