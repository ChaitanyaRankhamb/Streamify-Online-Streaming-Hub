// lib/errors.ts
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific errors
export class UserAlreadyExistsError extends AppError {
  constructor(message = "User already exists") {
    super(message, 400);
  }
}

export class EmailAlreadyExistsError extends AppError {
  constructor(message = "Email already exists") {
    super(message, 400);
  }
}

export class ErrorInUserCreation extends AppError {
  constructor(message = "Error in user creation") {
    super(message, 500);
  }
}

export class ErrorInSecretKey extends AppError {
  constructor(message = "Secret key is not defined!") {
    super(message, 500);
  }
}
