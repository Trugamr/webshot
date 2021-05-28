declare interface ExtendedNextApiRequest<
  Q = void & { [key: string]: string | string[] },
  B = void,
> extends NextApiRequest {
  query: Q
  body: B
}
