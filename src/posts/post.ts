import { Author } from './author';

export interface IPost {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likes: number;
  comments: number;
  author: Author;
}
export class Post {
  #id: number;
  #title: string;
  #createdAt: Date;
  #updatedAt: Date;
  #content: string;
  #likes: number;
  #comments: number;
  #author: Author;

  public constructor(args: IPost) {
    this.#id = args.id;
    this.#title = args.title;
    this.#createdAt = args.createdAt;
    this.#updatedAt = args.updatedAt;
    this.#content = args.content;
    this.#likes = args.likes;
    this.#comments = args.comments;
    this.#author = new Author(args.author);
  }

  public get id(): number {
    return this.#id;
  }

  public get title(): string {
    return this.#title;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public get content(): string {
    return this.#content;
  }

  public get likes(): number {
    return this.#likes;
  }

  public get comments(): number {
    return this.#comments;
  }

  public get author(): Author {
    return this.#author;
  }
}
