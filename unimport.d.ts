export {}
declare global {
  const $fetch: typeof import('ofetch')['$fetch']
  const afterAll: typeof import('vitest')['afterAll']
  const beforeAll: typeof import('vitest')['beforeAll']
  const describe: typeof import('vitest')['describe']
  const expect: typeof import('vitest')['expect']
  const getUserId: typeof import('/home/b_guard/Projects/service-measurements/server/utils/getUserId')['default']
  const getUserRole: typeof import('/home/b_guard/Projects/service-measurements/server/utils/getUserRole')['default']
  const issueAccessToken: typeof import('/home/b_guard/Projects/service-measurements/server/utils/issueAccessToken')['default']
  const it: typeof import('vitest')['it']
  const objectIdTransform: typeof import('/home/b_guard/Projects/service-measurements/server/utils/objectIdTransform')['default']
  const parse: typeof import('set-cookie-parser')['parse']
  const uuidv4: typeof import('uuid')['v4']
  const verify: typeof import('/home/b_guard/Projects/service-measurements/server/utils/verify')['default']
  const zodValidateBody: typeof import('/home/b_guard/Projects/service-measurements/server/utils/zodValidateBody')['default']
  const zodValidateData: typeof import('/home/b_guard/Projects/service-measurements/server/utils/zodValidateData')['default']
}