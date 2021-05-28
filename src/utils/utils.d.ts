import { NextApiResponse } from 'next'

declare type SetHeaders = (
  res: NextApiResponse,
  headers: {
    [k: string]: string
  },
) => void
