import { EventHandler } from "@/module/shared/domain/events/event_handler";
import { UserCreatedEvent } from "../../domain/events/user_created_event";

export class UserCreatedHandler implements EventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    console.log(`User created: ${event.user.email} at ${event.occurredOn}`);
  }
}
