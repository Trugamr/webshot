import * as yup from 'yup'

export const captureQuerySchema = yup.object({
  url: yup.string().url().required(),
  wait_for: yup.number().integer().optional().max(5000).min(100),
})

export type CaptureQuerySchema = yup.TypeOf<typeof captureQuerySchema>
