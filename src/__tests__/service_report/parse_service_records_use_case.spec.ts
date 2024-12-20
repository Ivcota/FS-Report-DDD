import { describe, expect, it } from "vitest";

import { CompositionRoot } from "@/composition_root";
import { Config } from "@/config";

describe("ParseServiceRecordsUseCase", () => {
  const config = new Config("start:test");
  const serviceContainer = CompositionRoot.getInstance(config);

  const parseServiceRecordsUseCase =
    serviceContainer.serviceReportModule.getParseServiceRecordsUseCase();

  it("should return an error if the AI service returns an error", async () => {
    const result = await parseServiceRecordsUseCase.execute({
      rawString: "test",
    });

    expect(result.serviceRecords).toHaveLength(0);
    expect(result.error).toBeDefined();
  });

  it("should return the service records if the AI service returns a valid response", async () => {
    const input = `
    Iverson Diles
    January 2024

    50 hours

    Comments: Some comments

    Holly Diles
    February 2024

    10 hours

    Comments: Some comments
    `;

    const result = await parseServiceRecordsUseCase.execute({
      rawString: input,
    });

    expect(result.serviceRecords).toHaveLength(2);
    expect(result.error).toBeUndefined();
    expect(result.serviceRecords[0].firstName).toBe("Iverson");
    expect(result.serviceRecords[0].lastName).toBe("Diles");
    expect(result.serviceRecords[0].comments).toBe("Some comments");
    expect(result.serviceRecords[1].firstName).toBe("Holly");
    expect(result.serviceRecords[1].lastName).toBe("Diles");
    expect(result.serviceRecords[1].comments).toBe("Some comments");
  });
});
