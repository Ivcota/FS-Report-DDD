type Environment = "development" | "production" | "test";
type Script = "start";

class Config {
  env: Environment;
  script: Script;
  constructor(script: Script) {
    this.env = (process.env.NODE_ENV as Environment) || "development";
    this.script = script;
  }
}
