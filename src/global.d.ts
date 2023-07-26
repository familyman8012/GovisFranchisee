// Helper types
interface IResponse<T> {
  code: string;
  data: T;
  message: string;
}
