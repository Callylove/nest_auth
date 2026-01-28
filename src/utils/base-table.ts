import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class BaseTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('uuid')
  @Column({ unique: true, nullable: false })
  uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deleted_at: Date;

  @BeforeInsert()
  insertUUID() {
    this.uuid = uuidv4();
  }
}
