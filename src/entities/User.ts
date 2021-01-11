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

  @OneToMany((type) => User, (user) => user.following)
  following: User[];

  @OneToMany((type) => User, (user) => user.follower)
  follower: User[];

  @OneToMany((type) => Post, (post) => post.user, { onDelete: "CASCADE" })
  posts: Post[];

  @OneToMany((type) => Like, (like) => like.user)
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Chat, (chat) => chat.to)
  chats: Chat[];

  @OneToMany((type) => Message, (message) => message.user)
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
