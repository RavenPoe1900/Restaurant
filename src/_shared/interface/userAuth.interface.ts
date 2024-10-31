import { UserEntity } from "src/users/domain/user.entity";

export interface IUserAuth extends UserEntity {
  id: number;
  restarurantId: number;
  role: { name: string };
}
