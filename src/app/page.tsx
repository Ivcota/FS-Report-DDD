"use client";

import { ServiceRecordForm } from "@/infrastructure/ui/service_report/components/ServiceRecordForm";
import { ServiceRecordList } from "@/infrastructure/ui/service_report/components/ServiceRecordList";
import { ServiceRecordParserError } from "@/infrastructure/ui/service_report/components/ServiceRecordParserError";
import { ServiceRecordParserHeader } from "@/infrastructure/ui/service_report/components/ServiceRecordParserHeader";
import { commitServiceRecordsAction } from "@/application/service_report/use_cases/commit_service_records/commit_service_records_action";
import { parseServiceRecordsAction } from "@/application/service_report/use_cases/parse_service_records/parse_service_records_action";
import { useActionState } from "react";

export default function Home() {
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

          <form action={commitServiceRecords}>
            <input
              type="hidden"
              name="serviceRecords"
              value={JSON.stringify(result.serviceRecords)}
            />
            <button
              type="submit"
              disabled={isCommitting || result.serviceRecords.length === 0}
              className="mt-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
            >
              {isCommitting ? "Committing..." : "Commit Service Records"}
            </button>
          </form>

          {result.serviceRecords.length > 0 && (
            <ServiceRecordList serviceRecords={result.serviceRecords} />
          )}
        </div>
      </div>
    </div>
  );
}
