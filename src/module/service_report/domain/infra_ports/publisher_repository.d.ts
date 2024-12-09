import { Publisher } from "@/module/service_report/domain/entities/publisher";

export interface IPublisherRepository {
  save(publisher: Publisher): Promise<void>;
  findById(id: string): Promise<Publisher | undefined>;
  findByEmail(email: Email): Promise<Publisher | undefined>;
  findByFirstNameAndLastName(
    firstName: string,
    lastName: string
  ): Promise<Publisher | undefined>;
  delete(publisher: Publisher): Promise<void>;
}
