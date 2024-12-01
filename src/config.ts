type Environment = "development" | "production" | "test";
type Script = "start" | "start:test";

export class Config {
  env: Environment;
  script: Script;
  OPENAI_API_KEY: string | undefined;

  constructor(script: Script) {
    this.env = (process.env.NODE_ENV as Environment) || "development";
    this.script = script;
    this.OPENAI_API_KEY = process.env.OPENAI_API_KEY || undefined;
  }
}

export const config = new Config("start");
