import { Author, BlogData } from "./blogSliceTypes";

export interface CommentAttributes {
  comment: string;
  createdAt: string;
  blog: BlogData;
  users_permissions_user: Author;
}

export interface CommentData {
  id: number;
  attributes: CommentAttributes;
}
