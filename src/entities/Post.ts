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
import Comment from "./Comment";
import Image from "./Image";
import Like from "./Like";
import User from "./User";

@Entity()
class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: true })
  location: string;

  @Column({ type: "text" })
  caption: string;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;

  @OneToMany((type) => Image, (image) => image.post)
  images: Image[];

  @OneToMany((type) => Like, (like) => like.post)
  likes: Like[];

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @Column({ type: "boolean", default: false })
  isLiked: boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}

export default Post;
