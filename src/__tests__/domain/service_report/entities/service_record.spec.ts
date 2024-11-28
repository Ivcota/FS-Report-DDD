import { describe, expect, it } from "vitest";

import { Publisher } from "@/modual/service_report/domain/entities/publisher";
import { ServiceRecord } from "@/modual/service_report/domain/entities/service_record";

describe("ServiceRecord", () => {
  it("should create a service record", () => {
    const publisher = Publisher.create({
      firstName: "John",
      lastName: "Doe",
    });

    const serviceRecord = ServiceRecord.create({
      bibleStudies: 1,
      creditHours: 1,
      serviceHours: 1,
      serviceMonth: new Date(),
    });

    serviceRecord.assignPublisher(publisher);

    expect(serviceRecord).toBeDefined();
    expect(serviceRecord.id).toBeDefined();
    expect(serviceRecord.bibleStudies).toBe(1);
    expect(serviceRecord.creditHours).toBe(1);
    expect(serviceRecord.serviceHours).toBe(1);
    expect(serviceRecord.serviceMonth).toBeDefined();
    expect(serviceRecord.publisher).toEqual(publisher);
  });
});
