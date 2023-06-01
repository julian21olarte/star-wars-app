import { Category } from "./enums/category";

export interface Item {
  name: string;
  category: Category;
  comments: { comment: string; score: number }[];
  [key: string]: string | unknown;
}
