import jwt from "jsonwebtoken";
import { StringValue } from "ms";

const issueAccessToken = (
	payload: jwt.JwtPayload,
	{
		secret,
		expiresIn = "15m",
	}: { secret: string; expiresIn?: number | StringValue },
) =>
	jwt.sign(payload, secret, {
		expiresIn,
	});

export default issueAccessToken;
