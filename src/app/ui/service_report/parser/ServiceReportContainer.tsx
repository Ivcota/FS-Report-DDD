"use client";

import { ServiceRecordCommitForm } from "./ServiceRecordCommitForm";
import { ServiceRecordForm } from "./ServiceRecordForm";
import { ServiceRecordList } from "./ServiceRecordList";
import { ServiceRecordParserError } from "./ServiceRecordParserError";
import { ServiceRecordParserHeader } from "./ServiceRecordParserHeader";
import { commitServiceRecordsAction } from "@/module/service_report/application/use_cases/commit_service_records/commit_service_records_action";
import { parseServiceRecordsAction } from "@/module/service_report/application/use_cases/parse_service_records/parse_service_records_action";
import { useActionState } from "react";

type ServiceReportContainerProps = {
  user: {
    id: string;
  };
};

export function ServiceReportContainer({ user }: ServiceReportContainerProps) {
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
            success={commitServiceRecordsResult.success}
            userId={user.id}
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
