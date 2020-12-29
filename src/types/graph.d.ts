export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  participants: [User!]!\n  createdAt: String\n  updatedAt: String\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  chatId: Int\n  user: User!\n  userId: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype GetFollowedPostResponse {\n  ok: Boolean!\n  err: String\n  post: [Post]\n}\n\ntype Query {\n  GetFollowedPost(page: Int!): GetFollowedPostResponse!\n  GetFullPost(page: Int!): GetFullPostResponse!\n  Me: MeResponse!\n  users: [User]\n}\n\ntype GetFullPostResponse {\n  ok: Boolean!\n  err: String\n  post: [Post]\n}\n\ntype Comment {\n  id: Int!\n  text: String!\n  user: User!\n  userId: Int\n  post: Post!\n  postId: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype Image {\n  id: Int!\n  url: String!\n  post: Post!\n  postId: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype Like {\n  id: Int!\n  user: User!\n  post: Post!\n  userId: Int\n  postId: Int\n  createdAt: String\n  updatedAt: String\n}\n\ntype Post {\n  id: Int!\n  location: String\n  caption: String\n  user: User!\n  images: [Image]\n  likes: [Like]\n  comments: [Comment]\n  isLiked: Boolean\n  createdAt: String\n  updatedAt: String\n}\n\ntype UploadPostResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype Mutation {\n  UploadPost(location: String, caption: String, images: [String]): UploadPostResponse!\n  ConfirmSecret(code: String!, email: String!): ConfirmSecretResponse!\n  CreateAccount(username: String!, email: String!, firstName: String!, lastName: String!, intro: String): CreateAccountResponse!\n  RequestCode(email: String!): RequestCodeResponse!\n  ToggleFollowing(username: String!): ToggleFollowingResponse!\n}\n\ntype ConfirmSecretResponse {\n  ok: Boolean!\n  err: String\n  token: String\n}\n\ntype CreateAccountResponse {\n  ok: Boolean!\n  err: String\n}\n\ntype MeResponse {\n  ok: Boolean!\n  err: String\n  user: User\n}\n\ntype RequestCodeResponse {\n  ok: Boolean!\n  err: String\n  code: String\n}\n\ntype User {\n  id: Int!\n  email: String!\n  profilePhoto: String\n  intro: String\n  username: String!\n  firstName: String!\n  lastName: String!\n  loginSecret: String\n  following: [User]\n  follower: [User]\n  isFollowing: Boolean\n  posts: [Post]\n  likes: [Like]\n  comments: [Comment]\n  chats: [Chat]\n  messages: [Message]\n  createdAt: String\n  updatedAt: String\n}\n\ntype ToggleFollowingResponse {\n  ok: Boolean!\n  err: String\n}\n"];
/* tslint:disable */

export interface Query {
  GetFollowedPost: GetFollowedPostResponse;
  GetFullPost: GetFullPostResponse;
  Me: MeResponse;
  users: Array<User> | null;
}

export interface GetFollowedPostQueryArgs {
  page: number;
}

export interface GetFullPostQueryArgs {
  page: number;
}

export interface GetFollowedPostResponse {
  ok: boolean;
  err: string | null;
  post: Array<Post> | null;
}

export interface Post {
  id: number;
  location: string | null;
  caption: string | null;
  user: User;
  images: Array<Image> | null;
  likes: Array<Like> | null;
  comments: Array<Comment> | null;
  isLiked: boolean | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface User {
  id: number;
  email: string;
  profilePhoto: string | null;
  intro: string | null;
  username: string;
  firstName: string;
  lastName: string;
  loginSecret: string | null;
  following: Array<User> | null;
  follower: Array<User> | null;
  isFollowing: boolean | null;
  posts: Array<Post> | null;
  likes: Array<Like> | null;
  comments: Array<Comment> | null;
  chats: Array<Chat> | null;
  messages: Array<Message> | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Like {
  id: number;
  user: User;
  post: Post;
  userId: number | null;
  postId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Comment {
  id: number;
  text: string;
  user: User;
  userId: number | null;
  post: Post;
  postId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  participants: Array<User>;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  chatId: number | null;
  user: User;
  userId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Image {
  id: number;
  url: string;
  post: Post;
  postId: number | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface GetFullPostResponse {
  ok: boolean;
  err: string | null;
  post: Array<Post> | null;
}

export interface MeResponse {
  ok: boolean;
  err: string | null;
  user: User | null;
}

export interface Mutation {
  UploadPost: UploadPostResponse;
  ConfirmSecret: ConfirmSecretResponse;
  CreateAccount: CreateAccountResponse;
  RequestCode: RequestCodeResponse;
  ToggleFollowing: ToggleFollowingResponse;
}

export interface UploadPostMutationArgs {
  location: string | null;
  caption: string | null;
  images: Array<string> | null;
}

export interface ConfirmSecretMutationArgs {
  code: string;
  email: string;
}

export interface CreateAccountMutationArgs {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  intro: string | null;
}

export interface RequestCodeMutationArgs {
  email: string;
}

export interface ToggleFollowingMutationArgs {
  username: string;
}

export interface UploadPostResponse {
  ok: boolean;
  err: string | null;
}

export interface ConfirmSecretResponse {
  ok: boolean;
  err: string | null;
  token: string | null;
}

export interface CreateAccountResponse {
  ok: boolean;
  err: string | null;
}

export interface RequestCodeResponse {
  ok: boolean;
  err: string | null;
  code: string | null;
}

export interface ToggleFollowingResponse {
  ok: boolean;
  err: string | null;
}
