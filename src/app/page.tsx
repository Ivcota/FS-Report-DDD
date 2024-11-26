"use client";

import { parseServiceRecordsAction } from "@/application/service_report/use_cases/parse_service_records/parse_service_records_action";
import { useActionState } from "react";

export default function Home() {
  const [result, action, isLoading] = useActionState(
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Field Service Report Parser
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Convert your raw service records into a structured format.
          </p>

          <form
            action={action}
            aria-labelledby="form-title"
            className="mt-8 space-y-6"
          >
            <div className="relative">
              <label
                htmlFor="unparsedRecords"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Unparsed Records
              </label>
              <textarea
                id="unparsedRecords"
                name="unparsedRecords"
                aria-required="true"
                placeholder="Enter your unparsed records here..."
                required
                className="mt-2 block w-full rounded-lg border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 resize-none h-40"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Processing..." : "Parse Records"}
            </button>
          </form>

          {result.error && (
            <div className="mt-6 rounded-lg bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {result.error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {result.serviceRecords.length > 0 && (
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <div className="divide-y divide-gray-200 bg-white flex flex-col">
                      {result.serviceRecords.map((serviceRecord) => (
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
                              {serviceRecord.isResolved
                                ? "Resolved"
                                : "Pending"}
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
                                {new Date(
                                  serviceRecord.createdAt
                                ).toLocaleDateString()}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                Bible Studies
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {serviceRecord.bibleStudies}
                              </dd>
                            </div>
                            {serviceRecord.comments && (
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
          )}
        </div>
      </div>
    </div>
  );
}
