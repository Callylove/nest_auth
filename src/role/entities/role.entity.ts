import { User } from 'src/user/entities/user.entity';
import { BaseTable } from 'src/utils/base-table';

import { Column, Entity, OneToMany } from 'typeorm';
export enum ROLE_TYPE {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
 
}

@Entity('roles')
export class Role extends BaseTable {
  @Column({
    type: 'enum',
    enum: ROLE_TYPE,
    default: ROLE_TYPE.CUSTOMER,
  })
  name: ROLE_TYPE;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
