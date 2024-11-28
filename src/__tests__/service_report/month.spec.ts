import { describe, expect, it } from "vitest";

import { Month } from "@/module/service_report/domain/value_objects/month";

describe("Month", () => {
  it("should create a month object with a range based on a date within the month", () => {
    const month = new Month(new Date(Date.UTC(2024, 0, 15)));
    const monthStart = new Date(Date.UTC(2024, 0, 1));
    const monthEnd = new Date(Date.UTC(2024, 1, 1));

    expect(month.monthStart).toEqual(monthStart);
    expect(month.monthEnd).toEqual(monthEnd);
  });
});
