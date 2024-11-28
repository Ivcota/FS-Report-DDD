import { ServiceContainer } from "@/service_container";
import { UserCreatedHandler } from "@/module/user/application/event_handlers/user_created_handler";

export function registerUserEventHandlers() {
  const serviceContainer = ServiceContainer.getInstance();
  const eventBus = serviceContainer.eventBus;

  eventBus.subscribe("user.created", new UserCreatedHandler());
}
