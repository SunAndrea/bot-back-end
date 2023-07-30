export class CustomError extends Error {
  code: number;
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export const createCustomError = (code: number, message: string) => {
  return new CustomError(code, message);
};
