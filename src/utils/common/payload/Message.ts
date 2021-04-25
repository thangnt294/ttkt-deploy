import { HttpStatus } from '../../constant/http-status';

export class Message {
  private _statusCode: HttpStatus;

  private _message: string;

  get statusCode(): HttpStatus {
    return this._statusCode;
  }

  set statusCode(value: HttpStatus) {
    this._statusCode = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
