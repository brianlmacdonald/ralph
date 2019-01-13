import { getUrlAndHeaders, safeConfigImport } from '../../utils'
const fetch = require('node-fetch')

//@ts-ignore
global.Headers = fetch.Headers
//@ts-ignore
global.Request = fetch.Request

const configObject = {
  'www.some-api.com': [
    'some-session-token',
    'Content-Type',
  ]
}

const sessionToken =  'ey54tw9na87chnqhsergxn,er08vybr08wnbsvndfibsg8reabsvf'
const testHeaders = new Headers()
testHeaders.set('some-session-token', sessionToken)
testHeaders.set('Content-Type', 'text/html')
//@ts-ignore
const testRequest = new Request('the.local.host', { headers: testHeaders, query: { host: 'www.some-api.com' } })

describe('utils', () => {

  describe('safeConfigImport', () => {
    it('returns an empty object if no config exists', async () => {
      expect(await safeConfigImport('./empty')).toEqual({})
    })

    it('returns the resolved config when found', async () => {
      expect(await safeConfigImport(`${process.cwd()}/src/__tests__/utils/config.json`)).toEqual(configObject)
    })
  })
  describe('getUrlAndHeaders', () => {
    beforeEach(() => {
      //@ts-ignore
      safeConfigImport = jest.fn().mockImplementation(() => configObject)
      //@ts-ignore
      safeConfigImport.mockClear()
    })

    it('returns the correct headers', () => {
      //@ts-ignore
      expect(getUrlAndHeaders(testRequest)).toEqual({})
    })

  })
})
