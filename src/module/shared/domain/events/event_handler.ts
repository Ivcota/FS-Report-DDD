import { DomainEvent } from "./domain_event";

export interface EventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}
