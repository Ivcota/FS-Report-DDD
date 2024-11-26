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
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Field Service Report Parser</h1>
      <form
        action={action}
        aria-labelledby="form-title"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <label
          htmlFor="unparsedRecords"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Unparsed Records
        </label>
        <textarea
          id="unparsedRecords"
          name="unparsedRecords"
          aria-required="true"
          placeholder="Enter your unparsed records here..."
          required
          className="resize-none border border-gray-300 rounded w-full h-32 p-2 mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Parse
        </button>
      </form>
      {result.error && <p className="text-red-500">{result.error}</p>}
      {result.serviceRecords.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(result.serviceRecords, null, 2)}
        </pre>
      )}
    </div>
  );
}
