import { SetHeaders } from './utils'

export const setHeaders: SetHeaders = (res, headers) => {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }
}
