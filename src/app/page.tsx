"use client";

import { ServiceRecordForm } from "@/infrastructure/ui/service_report/components/ServiceRecordForm";
import { ServiceRecordList } from "@/infrastructure/ui/service_report/components/ServiceRecordList";
import { ServiceRecordParserError } from "@/infrastructure/ui/service_report/components/ServiceRecordParserError";
import { ServiceRecordParserHeader } from "@/infrastructure/ui/service_report/components/ServiceRecordParserHeader";
import { parseServiceRecordsAction } from "@/application/service_report/use_cases/parse_service_records/parse_service_records_action";
import { useActionState } from "react";

export default function Home() {
  const [result, parseServiceRecordAction, isLoading] = useActionState(
    parseServiceRecordsAction,
    {
      error: "",
      serviceRecords: [],
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <ServiceRecordParserHeader />
          <ServiceRecordForm
            action={parseServiceRecordAction}
            isLoading={isLoading}
          />

          {!!result.error && <ServiceRecordParserError error={result.error} />}

          {result.serviceRecords.length > 0 && (
            <ServiceRecordList serviceRecords={result.serviceRecords} />
          )}
        </div>
      </div>
    </div>
  );
}
