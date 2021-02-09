export enum HttpStatusCode {
  unauthorized = 401,
  forbidden = 403,
  badRequest = 400,
  notFound = 404,
  serverError = 500,
  noContent = 204,
  ok = 200,
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
};
