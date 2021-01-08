import { IsEmail } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Comment from "./Comment";
import Like from "./Like";
import Message from "./Message";
import Post from "./Post";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  @IsEmail()
  email: string;

  @Column({
    type: "text",
    default:
      "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
  })
  profilePhoto: string | null;

  @Column({ type: "text", nullable: true })
  intro: string | null;

  @Column({ type: "text" })
  username: string;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "text", nullable: true })
  loginSecret: string;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @Column({ type: "text", nullable: true })
  googleId: string;

  @Column({ type: "boolean", default: false })
  isFollowing: boolean;

  @OneToMany(() => User, (user) => user.following, { nullable: true })
  following: User[];

  @OneToMany(() => User, (user) => user.follower, { nullable: true })
  follower: User[];

  @OneToMany(() => Post, (post) => post.user, {
    onDelete: "CASCADE",
    nullable: true
  })
  posts: Post[];

  @OneToMany(() => Like, (like) => like.user, { nullable: true })
  likes: Like[];

  @OneToMany(() => Comment, (comment) => comment.user, { nullable: true })
  comments: Comment[];

  @OneToMany(() => Chat, (chat) => chat.to, { nullable: true })
  chats: Chat[];

  @OneToMany(() => Message, (message) => message.user, { nullable: true })
  messages: Message[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default User;
