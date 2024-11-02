import { UserEntity } from 'src/users/domain/user.entity';

export interface IUserAuth extends UserEntity {
  id: number;
  restaurantId: number;
  role: { name: string };
}
