import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Message from "./Message";
import User from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany((type) => Message, (message) => message.chat, {
    nullable: true,
    onDelete: "CASCADE"
  })
  messages: Message[];

  @ManyToOne((type) => User, (user) => user.chatTo)
  to: User;

  @Column({ nullable: true })
  toId: number;

  @ManyToOne((type) => User, (user) => user.chatFrom)
  from: User;

  @Column({ nullable: true })
  fromId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Chat;
