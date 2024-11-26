import { ServiceContainer } from "@/application/service_report/service_container";
import { UseCase } from "@/shared/use_case";

type ParseServiceRecordsUseCaseInputDTO = {
  rawString: string;
};

export class ParseServiceRecordsUseCase implements UseCase<ParseServiceRecordsUseCaseInputDTO, void> {
  constructor(private serviceContainer: ServiceContainer) {
  }
  async execute(input: ParseServiceRecordsUseCaseInputDTO): Promise<void> {
    input.
  }
}
