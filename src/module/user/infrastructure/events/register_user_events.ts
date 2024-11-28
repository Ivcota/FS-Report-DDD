import { IEventBus } from "@/module/shared/domain/events/event_bus";
import { UserCreatedHandler } from "../../application/event_handlers/user_created_handler";

export function registerUserEvents(eventBus: IEventBus) {
  eventBus.subscribe("user.created", new UserCreatedHandler());
}
