type RoleName = "admin" | "user";

export class Role {
  name: RoleName;
  constructor(name: string) {
    if (name !== "admin" && name !== "user") {
      throw new Error("Invalid role");
    }
    this.name = name;
  }
}
