import { CreateFieldServiceGroupUseCase } from "@/module/service_report/application/use_cases/create_field_service_group/create_field_service_group_use_case";
import { IEventBus } from "@/module/shared/domain/events/event_bus";
import { UserCreatedHandler } from "@/module/service_report/application/event_handlers/user_created_handler";

export function registerUserEvents(
  eventBus: IEventBus,
  createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase
) {
  eventBus.subscribe(
    "user.created",
    new UserCreatedHandler(createFieldServiceGroupUseCase)
  );
}
