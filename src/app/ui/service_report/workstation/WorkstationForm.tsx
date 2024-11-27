"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useCallback } from "react";

const WorkstationForm = ({ selectedMonth }: { selectedMonth: Date }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const params = new URLSearchParams(searchParams);

      const formData = new FormData(e.currentTarget);

      formData.forEach((value, key) => {
        params.set(key, value.toString());
      });

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="month"
        name="month"
        defaultValue={
          searchParams.get("month") ??
          new Date(selectedMonth.setDate(1)).toISOString()
        }
        className="flex-1 rounded-lg border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        View Month
      </button>
    </form>
  );
};

export default WorkstationForm;
