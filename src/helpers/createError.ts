export const createError = (status = 500, message = "Something went wrong") => {
  class UserError extends Error {
    code = status;

    constructor(message: string | undefined) {
      super(message);
    }
  }

  return new UserError(message);
};
