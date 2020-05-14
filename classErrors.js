class customError extends Error {
  constructor(name, message) {
    super(message)
    this.name = name
    this.date = new Date()
    Error.captureStackTrace(this, customError)
  }
}

export { customError }
