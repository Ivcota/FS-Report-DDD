type RoleName = "admin" | "user";

export class Role {
  name: RoleName;

  static create(name: string): Role {
    if (name !== "admin" && name !== "user") {
      throw new Error("Invalid role");
    }
    return new Role(name);
  }

  constructor(name: string) {
    if (name !== "admin" && name !== "user") {
      throw new Error("Invalid role");
    }
    this.name = name;
  }
}
