import {
  CreateFieldServiceGroupUseCaseInputDTO,
  CreateFieldServiceGroupUseCaseOutputDTO,
} from "./create_field_service_group_dto";

import { FieldServiceGroup } from "@/module/service_report/domain/entities/field_service_group";
import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { UseCase } from "@/module/shared/application/use_case";

export class CreateFieldServiceGroupUseCase
  implements
    UseCase<
      CreateFieldServiceGroupUseCaseInputDTO,
      CreateFieldServiceGroupUseCaseOutputDTO
    >
{
  constructor(
    private fieldServiceGroupRepository: IFieldServiceGroupRepository
  ) {}

  async execute(
    input: CreateFieldServiceGroupUseCaseInputDTO
  ): Promise<CreateFieldServiceGroupUseCaseOutputDTO> {
    const fieldServiceGroup = FieldServiceGroup.create({
      name: input.name,
      userOwnerId: input.userOwnerId,
    });

    try {
      const fieldServiceGroupSaved =
        await this.fieldServiceGroupRepository.save(fieldServiceGroup);

      return {
        success: true,
        fieldServiceGroup: fieldServiceGroupSaved,
      };
    } catch (error) {
      return {
        success: false,
        error: `Error creating field service group: ${JSON.stringify(error)}`,
      };
    }
  }
}
