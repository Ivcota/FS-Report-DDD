"use client";

import { ServiceRecordCommitForm } from "@/app/ui/service_report/components/ServiceRecordCommitForm";
import { ServiceRecordForm } from "@/app/ui/service_report/components/ServiceRecordForm";
import { ServiceRecordList } from "@/app/ui/service_report/components/ServiceRecordList";
import { ServiceRecordParserError } from "@/app/ui/service_report/components/ServiceRecordParserError";
import { ServiceRecordParserHeader } from "@/app/ui/service_report/components/ServiceRecordParserHeader";
import { commitServiceRecordsAction } from "@/application/service_report/use_cases/commit_service_records/commit_service_records_action";
import { parseServiceRecordsAction } from "@/application/service_report/use_cases/parse_service_records/parse_service_records_action";
import { useActionState } from "react";

export default function ServiceReportParser() {
  const [result, parseServiceRecord, isLoading] = useActionState(
    parseServiceRecordsAction,
    {
      error: "",
      serviceRecords: [],
    }
  );

  const [commitServiceRecordsResult, commitServiceRecords, isCommitting] =
    useActionState(commitServiceRecordsAction, {
      success: false,
      error: "",
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <ServiceRecordParserHeader />
          <ServiceRecordForm
            action={parseServiceRecord}
            isLoading={isLoading}
          />

          {!!result.error && <ServiceRecordParserError error={result.error} />}

          <ServiceRecordCommitForm
            commitServiceRecords={commitServiceRecords}
            isCommitting={isCommitting}
            serviceRecords={result.serviceRecords}
          />

          {!!commitServiceRecordsResult.error && (
            <ServiceRecordParserError
              error={commitServiceRecordsResult.error}
            />
          )}

          {result.serviceRecords.length > 0 && (
            <ServiceRecordList serviceRecords={result.serviceRecords} />
          )}
        </div>
      </div>
    </div>
  );
}
