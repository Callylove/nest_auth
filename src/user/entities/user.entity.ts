import { Role } from "src/role/entities/role.entity";
import { BaseTable } from "src/utils/base-table";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('users')
export class User extends BaseTable {
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: true,
  })
  first_name: string;

  @Column({
    nullable: true,
  })
  last_name: string;

  @Column({
    nullable: true,
    unique: true,
  })
  mobile: string;


  @Column({
    nullable: true,
    select: false,
  })
  password: string;
 @ManyToOne(() => Role, (role) => role.id, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  role: Role;
  
}

