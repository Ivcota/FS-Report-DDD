import { SimplifiedServiceRecord } from "@/modual/service_report/application/use_cases/parse_service_records/parse-service_records_dto";

export function ServiceRecordList({
  serviceRecords,
}: {
  serviceRecords: SimplifiedServiceRecord[];
}) {
  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
            <div className="divide-y divide-gray-200 bg-white flex flex-col">
              {serviceRecords.map((serviceRecord) => (
                <div
                  key={serviceRecord.id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {serviceRecord.firstName} {serviceRecord.lastName}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        serviceRecord.isResolved
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {serviceRecord.isResolved ? "Resolved" : "Pending"}
                    </span>
                  </div>
                  <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Service Month
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {serviceRecord.serviceMonth}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Created At
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {new Date(serviceRecord.createdAt).toLocaleDateString()}
                      </dd>
                    </div>
                    {!!serviceRecord.serviceHours && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Service Hours
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {serviceRecord.serviceHours}
                        </dd>
                      </div>
                    )}
                    {!!serviceRecord.creditHours && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Credit Hours
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {serviceRecord.creditHours}
                        </dd>
                      </div>
                    )}
                    {!!serviceRecord.bibleStudies && (
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Bible Studies
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {serviceRecord.bibleStudies}
                        </dd>
                      </div>
                    )}
                    {!!serviceRecord.comments && (
                      <div className="sm:col-span-2">
                        <dt className="text-sm font-medium text-gray-500">
                          Comments
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {serviceRecord.comments}
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
