export function formatError(err: any) {
  if (
    err.message ===
    'Access denied! You need to be authorized to perform this action!'
  ) {
    err.message = 'You are not authenticated';
    err.extensions.code = 'UNAUTHENTICATED';
  }

  if (
    err.message === "Access denied! You don't have permission for this action!"
  ) {
    err.message = 'You are not authorized';
    err.extensions.code = 'UNAUTHORIZED';
  }

  if (err.message === 'Argument Validation Error') {
    err.extensions.code = 'ARGUMENT_VALIDATION_ERROR';
  }

  return err;
}
