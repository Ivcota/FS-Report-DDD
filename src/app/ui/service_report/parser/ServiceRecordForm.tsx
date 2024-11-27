export function ServiceRecordForm({
  action,
  isLoading,
}: {
  action: (formData: FormData) => void;
  isLoading: boolean;
}) {
  return (
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
          className="mt-2 block w-full rounded-lg border-0 py-4 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 resize-none h-40"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? "Processing..." : "Parse Records"}
      </button>
    </form>
  );
}
