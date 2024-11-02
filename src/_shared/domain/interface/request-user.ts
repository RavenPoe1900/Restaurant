import { Request } from 'express';

export class Payload {
  userId: number;
  restaurantId: number;
  roleName: string;
}

export class RequestUser extends Request {
  user: Payload;
}
