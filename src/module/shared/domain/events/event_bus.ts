import { DomainEvent } from "@/module/shared/domain/events/domain_event";
import { EventHandler } from "@/module/shared/domain/events/event_handler";

export interface IEventBus {
  publish(event: DomainEvent): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): void;
}

export class EventBus implements IEventBus {
  private handlers: Map<string, EventHandler<DomainEvent>[]> = new Map();

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.eventName) || [];
    await Promise.all(handlers.map((handler) => handler.handle(event)));
  }

  subscribe<T extends DomainEvent>(
    eventName: string,
    handler: EventHandler<T>
  ): void {
    const handlers = this.handlers.get(eventName) || [];
    handlers.push(handler as EventHandler<DomainEvent>);
    this.handlers.set(eventName, handlers);
  }
}
