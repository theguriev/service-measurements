const baseURL = "http://localhost:4000";

const measurementBody = {
  timestamp: Date.now(),
  type: "temperature",
  meta: {
    unit: "Celsius",
    location: "office",
  },
};

describe.sequential("Measurement", () => {
  const validAccessToken = issueAccessToken(
    { userId: 123 },
    { secret: process.env.SECRET }
  );
  console.log("log: ", process.env.SECRET, validAccessToken);

  describe("POST /measurement", () => {
    it("gets 400 on validation errors", async () => {
      await $fetch("/measurement", {
        baseURL,
        method: "POST",
        ignoreResponseError: true,
        headers: {
          Accept: "application/json",
          Cookie: `accessToken=${validAccessToken};`,
        },
        body: {},
        onResponse: ({ response }) => {
          expect(response.status).toBe(400);
        },
      });
    });

    it("gets 200 on valid measurement data", async () => {
      await $fetch("/measurement", {
        baseURL,
        method: "POST",
        headers: {
          Accept: "application/json",
          Cookie: `accessToken=${validAccessToken};`,
        },
        body: measurementBody,
        onResponse: ({ response }) => {
          expect(response.status).toBe(200);
          expect(response._data.measurement).toMatchObject(measurementBody);
        },
      });
    });
  });
});
