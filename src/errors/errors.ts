class ErrorApp extends Error {
  constructor(public message: string, public codestatus: number = 400) {
    super(message);
  }
}

export { ErrorApp }