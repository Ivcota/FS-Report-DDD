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
};

export class ServiceRecord {
  id: string;
  serviceMonth: Month;
  createdAt: Date;
  bibleStudies: number;
  isResolved: boolean;
  publisher?: Publisher;
  creditHours?: number;
  serviceHours?: number;
  comments?: string;

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
  }) {
    this.id = input.id ?? uuidv4();
    this.bibleStudies = input.bibleStudies;
    this.creditHours = input.creditHours;
    this.serviceHours = input.serviceHours;
    this.comments = input.comments;
    this.isResolved = input.isResolved ?? false;
    this.createdAt = input.createdAt ?? new Date();
    this.serviceMonth = new Month(input.serviceMonth);
    this.publisher = input.publisher ?? undefined;
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

  resolve(): void {
    this.isResolved = true;
  }

  unresolve(): void {
    this.isResolved = false;
  }
}
