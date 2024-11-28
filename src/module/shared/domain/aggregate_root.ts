import { DomainEvent } from "./events/domain_event";
import { Entity } from "./entity";

export class AggregateRoot extends Entity {
  private domainEvents: DomainEvent[];
  constructor(id: string) {
    super(id);
    this.domainEvents = [];
  }

  addDomainEvent(event: DomainEvent) {
    this.domainEvents.push(event);
  }

  getDomainEvents(): DomainEvent[] {
    return this.domainEvents;
  }

  clearDomainEvents() {
    this.domainEvents = [];
  }
}
