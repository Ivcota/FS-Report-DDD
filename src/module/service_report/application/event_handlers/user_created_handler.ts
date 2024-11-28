import { CreateFieldServiceGroupUseCase } from "../use_cases/create_field_service_group/create_field_service_group_use_case";
import { EventHandler } from "@/module/shared/domain/events/event_handler";
import { UserCreatedEvent } from "@/module/user/domain/events/user_created_event";

export class UserCreatedHandler implements EventHandler<UserCreatedEvent> {
  constructor(
    private readonly createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase
  ) {}
  async handle(event: UserCreatedEvent): Promise<void> {
    const fieldServiceGroup = await this.createFieldServiceGroupUseCase.execute(
      {
        name: `${event.user.firstName} ${event.user.lastName} Field Service Group`,
        userOwnerId: event.user.id,
      }
    );
    if (fieldServiceGroup.error || !fieldServiceGroup.success) {
      console.error(fieldServiceGroup.error);
      return;
    }

    console.log(
      `Field Service Group created for ${event.user.firstName} ${event.user.lastName}: ${fieldServiceGroup.fieldServiceGroup?.id}`
    );
  }
}
