import { AIService } from "@/module/shared/infrastructure/external_services/ai";
import { CommitServiceRecordsUseCase } from "@/module/service_report/application/use_cases/commit_service_records/commit_service_records_use_case";
import { CreateFieldServiceGroupUseCase } from "@/module/service_report/application/use_cases/create_field_service_group/create_field_service_group_use_case";
import { DeleteServiceRecordUseCase } from "@/module/service_report/application/use_cases/delete_service_record/delete_service_record_use_case";
import { FieldServiceGroupRepository } from "@/module/service_report/infrastructure/repositories/field_service_group_repository";
import { IFieldServiceGroupRepository } from "@/module/service_report/domain/infra_ports/field_service_group_repository";
import { IServiceRecordRepository } from "@/module/service_report/domain/infra_ports/service_record_repository";
import { ParseServiceRecordsUseCase } from "./application/use_cases/parse_service_records/parse_service_records_use_case";
import { PrismaClient } from "@prisma/client";
import { ServiceRecordRepository } from "./infrastructure/repositories/service_record_repository";
import { ServiceRecordService } from "./domain/service/service_record_service";
import { UserCreatedHandler } from "@/module/service_report/application/event_handlers/user_created_handler";
import { ViewWorkstationMonthUseCase } from "@/module/service_report/application/use_cases/view_workstation_month/view_workstation_month_use_case";

export class ServiceReportModule {
  private fieldServiceGroupRepository: IFieldServiceGroupRepository;
  private serviceRecordRepository: IServiceRecordRepository;
  private aiService: AIService;
  private serviceRecordService: ServiceRecordService;
  private userCreatedHandler: UserCreatedHandler;
  private commitServiceRecordsUseCase: CommitServiceRecordsUseCase;
  private createFieldServiceGroupUseCase: CreateFieldServiceGroupUseCase;
  private parseServiceRecordsUseCase: ParseServiceRecordsUseCase;
  private deleteServiceRecordUseCase: DeleteServiceRecordUseCase;
  private viewWorkstationMonthUseCase: ViewWorkstationMonthUseCase;

  constructor(private prismaClient: PrismaClient, aiService: AIService) {
    this.aiService = aiService;
    this.parseServiceRecordsUseCase = new ParseServiceRecordsUseCase(
      this.aiService
    );
    this.fieldServiceGroupRepository = new FieldServiceGroupRepository(
      this.prismaClient
    );
    this.serviceRecordRepository = new ServiceRecordRepository(
      this.prismaClient
    );
    this.serviceRecordService = new ServiceRecordService();
    this.createFieldServiceGroupUseCase = new CreateFieldServiceGroupUseCase(
      this.fieldServiceGroupRepository
    );
    this.userCreatedHandler = new UserCreatedHandler(
      this.createFieldServiceGroupUseCase
    );
    this.deleteServiceRecordUseCase = new DeleteServiceRecordUseCase(
      this.serviceRecordRepository,
      this.fieldServiceGroupRepository,
      this.serviceRecordService
    );
    this.commitServiceRecordsUseCase = new CommitServiceRecordsUseCase(
      this.serviceRecordRepository,
      this.fieldServiceGroupRepository
    );
    this.viewWorkstationMonthUseCase = new ViewWorkstationMonthUseCase(
      this.serviceRecordRepository,
      this.fieldServiceGroupRepository
    );
  }

  getDeleteServiceRecordUseCase(): DeleteServiceRecordUseCase {
    return this.deleteServiceRecordUseCase;
  }

  getCreateFieldServiceGroupUseCase(): CreateFieldServiceGroupUseCase {
    return this.createFieldServiceGroupUseCase;
  }

  getUserCreatedHandler(): UserCreatedHandler {
    return this.userCreatedHandler;
  }

  getParseServiceRecordsUseCase(): ParseServiceRecordsUseCase {
    return this.parseServiceRecordsUseCase;
  }

  getCommitServiceRecordsUseCase(): CommitServiceRecordsUseCase {
    return this.commitServiceRecordsUseCase;
  }

  getViewWorkstationMonthUseCase(): ViewWorkstationMonthUseCase {
    return this.viewWorkstationMonthUseCase;
  }
}
