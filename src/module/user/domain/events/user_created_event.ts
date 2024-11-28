import { DomainEvent } from "@/module/shared/domain/events/domain_event";
import { User } from "../entities/User";

export class UserCreatedEvent implements DomainEvent {
  eventName: string = "user.created";
  occurredOn: Date;

  constructor(public readonly user: User) {
    this.occurredOn = new Date();
  }
}
