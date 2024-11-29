"use client";

import { SimplifiedServiceRecord } from "@/module/service_report/application/use_cases/parse_service_records/parse-service_records_dto";
import dayjs from "dayjs";
import { deleteServiceRecordAction } from "@/module/service_report/application/use_cases/delete_service_record/delete_service_record_action";
import { useActionState } from "react";

type WorkstationCardProps = {
  serviceRecord: SimplifiedServiceRecord;
  userId: string;
};

export function WorkstationCard({
  serviceRecord,
  userId,
}: WorkstationCardProps) {
  const [deleteResult, deleteServiceRecord, isDeleting] = useActionState(
    deleteServiceRecordAction,
    {
      success: false,
      error: undefined,
    }
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-lg text-gray-700">
          {serviceRecord.firstName} {serviceRecord.lastName}
        </h2>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${
            !serviceRecord.placeholder
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {!serviceRecord.placeholder ? "Submitted ✅" : "Pending ❌"}
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-gray-500">
          <span className="font-medium">Month:</span>{" "}
          {dayjs(serviceRecord.serviceMonth).format("MMMM YYYY")}
        </p>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="text-gray-600">
            <span className="font-medium">Service Hours:</span>{" "}
            {serviceRecord.serviceHours ?? "Not reported"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Credit Hours:</span>{" "}
            {serviceRecord.creditHours ?? "Not reported"}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Bible Studies:</span>{" "}
            {serviceRecord.bibleStudies}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span>{" "}
            {serviceRecord.isResolved ? "Resolved" : "Unresolved"}
          </p>
        </div>

        {serviceRecord.comments && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Comments:</span>
              <br />
              <span className="italic">{serviceRecord.comments}</span>
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Created: {dayjs(serviceRecord.createdAt).format("MMM D, YYYY")}
          </p>
          <form action={deleteServiceRecord}>
            <input type="hidden" name="id" value={serviceRecord.id} />
            <input type="hidden" name="userId" value={userId} />
            {!serviceRecord.placeholder && (
              <button
                type="submit"
                disabled={isDeleting}
                className="text-sm text-red-600 hover:text-red-800 disabled:text-gray-400"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
            {deleteResult.error && (
              <p className="text-sm text-red-600 mt-2">{deleteResult.error}</p>
            )}
          </form>
        </div>

        {deleteResult.error && (
          <p className="text-sm text-red-600 mt-2">{deleteResult.error}</p>
        )}
      </div>
    </div>
  );
}
