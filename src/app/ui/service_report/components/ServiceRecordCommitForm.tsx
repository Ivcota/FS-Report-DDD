type ServiceRecordCommitFormProps = {
  commitServiceRecords: (formData: FormData) => void;
  isCommitting: boolean;
  serviceRecords: unknown[];
};

export function ServiceRecordCommitForm({
  commitServiceRecords,
  isCommitting,
  serviceRecords,
}: ServiceRecordCommitFormProps) {
  return (
    <form action={commitServiceRecords}>
      <input
        type="hidden"
        name="serviceRecords"
        value={JSON.stringify(serviceRecords)}
      />
      <button
        type="submit"
        disabled={isCommitting || serviceRecords.length === 0}
        className="mt-4 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
      >
        {isCommitting ? "Committing..." : "Commit Service Records"}
      </button>
    </form>
  );
}
