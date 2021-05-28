import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import capture from '../../../lib/capture'
import { setHeaders } from '../../../utils'

const headers = {
  'Cache-Control': 'private',
  'Content-Type': 'image/jpg',
  'Content-Disposition': 'inline',
}

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  setHeaders(res, headers)

  const image = await capture({ url: 'https://trugamr.tech' })

  res.send(image)
})

export default handler
