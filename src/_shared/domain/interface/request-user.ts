import { Request } from 'express';

export class Payload {
  userId: number;
  restarurantId: number;
  roleName: string;
}

export class RequestUser extends Request {
  user: Payload;
}
