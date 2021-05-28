import * as yup from 'yup'

export const captureQuerySchema = yup.object({
  url: yup.string().url().required(),
})
