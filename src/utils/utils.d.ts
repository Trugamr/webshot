type NextApiRequest = import('next').NextApiRequest
type NextApiResponse = import('next').NextApiResponse
type Middleware<T, S> = import('next-connect').Middleware<T, S>

declare type SetHeaders = (
  res: NextApiResponse,
  headers: {
    [k: string]: string
  },
) => void

declare type Validate = (
  schema: AnySchema,
  key: keyof Pick<NextApiRequest, 'body' | 'query'>,
) => Middleware<NextApiRequest, NextApiResponse>
