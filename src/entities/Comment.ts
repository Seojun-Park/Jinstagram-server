import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column({ type: "text" })
  text: string;

  @ManyToOne((type) => User, (user) => user.comments)
  user: User;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne((type) => Post, (post) => post.comments)
  post: Post;

  @Column({ nullable: true })
  postId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Comment;
