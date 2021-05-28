import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import capture from '../../../lib/capture'
import { setHeaders, validate } from '../../../utils'
import { captureQuerySchema } from './schemas'

const headers = {
  'Cache-Control': 'private',
  'Content-Type': 'image/jpg',
  'Content-Disposition': 'inline',
}

const handler = nc<
  ExtendedNextApiRequest<CaptureQueryOptions>,
  NextApiResponse
>()
  .use(validate(captureQuerySchema, 'query'))
  .get(async (req, res) => {
    const { url } = req.query

    setHeaders(res, headers)

    const image = await capture({ url })

    res.send(image)
  })

export default handler
