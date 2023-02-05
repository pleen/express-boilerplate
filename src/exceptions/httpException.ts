export class HttpException extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export const catchException = (
  work: () => any,
  status: number,
  message?: string
) => {
  try {
    return work();
  } catch (error: any) {
    //tsc v4.4부터 catch의 error의 타입이 any-> unknown (정의가 바뀜) message접근 불가
    throw new HttpException(status, message ? message : error.message);
  }
};

export const asyncCatchException = async (
  work: () => Promise<any>,
  status: number,
  message?: string
) => {
  try {
    return await work();
  } catch (error: any) {
    throw new HttpException(status, message ? message : error.message);
  }
};
