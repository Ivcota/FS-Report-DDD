import { ApplicationContainer } from "./composition-root";
import { Config } from "@/config";

const config = new Config("start");
const serviceContainer = ApplicationContainer.getInstance(config);

export async function bootstrap() {
  await serviceContainer.initialize();
}
