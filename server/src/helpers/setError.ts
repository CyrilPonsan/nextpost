export function setError(message: string, code: number) {
  throw { message, status: code };
}
