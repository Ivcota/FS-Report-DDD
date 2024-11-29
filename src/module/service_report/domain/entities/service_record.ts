import { AggregateRoot } from "@/module/shared/domain/aggregate_root";
import { Month } from "../value_objects/month";
import { Publisher } from "./publisher";
import { v4 as uuidv4 } from "uuid";

type ServiceRecordProps = {
  id?: string;
  creditHours?: number;
  serviceHours?: number;
  comments?: string;
  bibleStudies: number;
  serviceMonth: Date;
  isResolved?: boolean;
  createdAt?: Date;
  publisher?: Publisher;
  placeholder?: boolean;
  fieldServiceGroupId?: string;
};

/**
 * ServiceRecord Aggregate Root
 *
 * Represents a monthly service report submitted by a publisher.
 * Acts as the aggregate root for the service report bounded context,
 * maintaining consistency and enforcing business rules around service reporting.
 */
export class ServiceRecord extends AggregateRoot {
  serviceMonth: Month;
  createdAt: Date;
  bibleStudies: number;
  isResolved: boolean;
  publisher?: Publisher;
  creditHours?: number;
  serviceHours?: number;
  comments?: string;
  placeholder?: boolean;
  fieldServiceGroupId?: string;
  private constructor(input: {
    id?: string;
    bibleStudies: number;
    creditHours?: number;
    serviceHours?: number;
    comments?: string;
    serviceMonth: Date;
    publisher?: Publisher;
    isResolved?: boolean;
    createdAt?: Date;
    placeholder?: boolean;
    fieldServiceGroupId?: string;
  }) {
    super(input.id ?? uuidv4());
    this.bibleStudies = input.bibleStudies;
    this.creditHours = input.creditHours;
    this.serviceHours = input.serviceHours;
    this.comments = input.comments;
    this.isResolved = input.isResolved ?? false;
    this.createdAt = input.createdAt ?? new Date();
    this.serviceMonth = new Month(input.serviceMonth);
    this.publisher = input.publisher ?? undefined;
    this.placeholder = input.placeholder ?? false;
    this.fieldServiceGroupId = input.fieldServiceGroupId ?? undefined;
  }

  static create(input: ServiceRecordProps): ServiceRecord {
    if (input.bibleStudies < 0) {
      throw new Error("Bible studies cannot be negative");
    }

    if (input.creditHours && input.creditHours < 0) {
      throw new Error("Credit hours cannot be negative");
    }

    if (input.serviceHours && input.serviceHours < 0) {
      throw new Error("Service hours cannot be negative");
    }

    if (!input.serviceMonth) {
      throw new Error("Service month is required");
    }

    return new ServiceRecord(input);
  }

  assignPublisher(publisher: Publisher): void {
    this.publisher = publisher;
  }

  assignFieldServiceGroup(fieldServiceGroupId: string): void {
    this.fieldServiceGroupId = fieldServiceGroupId;
  }

  resolve(): void {
    this.isResolved = true;
  }

  unresolve(): void {
    this.isResolved = false;
  }
}
