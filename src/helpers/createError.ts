export class CustomError {
  code: number;
  message: string;
  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}
export const createCustomError = (code: number, message: string) => {
  return new CustomError(code, message);
};
