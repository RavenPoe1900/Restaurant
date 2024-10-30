import { Request } from 'express';

export class Payload {
  userId: number;
  restarurantId: number;
}

export class RequestUser extends Request {
  user: Payload;
}
