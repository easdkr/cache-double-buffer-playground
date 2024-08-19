export interface IAuthor {
  id: number;
  name: string;
  email: string;
}

export class Author {
  #id: number;
  #name: string;
  #email: string;

  public constructor(args: IAuthor) {
    this.#id = args.id;
    this.#name = args.name;
    this.#email = args.email;
  }

  public get id(): number {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get email(): string {
    return this.#email;
  }
}
