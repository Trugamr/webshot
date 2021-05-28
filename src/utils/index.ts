export const setHeaders: SetHeaders = (res, headers) => {
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }
}

export const validate: Validate = (schema, key) => {
  return async (req, res, next) => {
    try {
      req[key] = await schema.validate(req[key], {
        stripUnknown: true,
        abortEarly: false,
      })
      next()
    } catch (error) {
      res.status(400).json(error)
    }
  }
}
