import { ServiceContainer } from "@/service_container";
import { ViewWorkstationMonthUseCase } from "@/modual/service_report/application/use_cases/view_workstation_month/view_workstation_month_use_case";
import WorkstationForm from "@/app/ui/service_report/workstation/WorkstationForm";
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceReportWorkstationProps = any;

const serviceContainer = ServiceContainer.getInstance();
const serviceRecordRepository = serviceContainer.serviceRecordRepository;
const viewWorkstationMonthUseCase = new ViewWorkstationMonthUseCase(
  serviceRecordRepository
);

const ServiceReportWorkstation = async ({
  searchParams,
}: ServiceReportWorkstationProps) => {
  const monthParam = searchParams.month ?? dayjs().format("YYYY-MM-DD");

  const { results, error } = await viewWorkstationMonthUseCase.execute({
    monthStart: monthParam,
  });

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Service Report Workstation
      </h1>
      <WorkstationForm selectedMonth={new Date(monthParam)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((serviceRecord) => (
          <div
            key={serviceRecord.publisher?.id ?? serviceRecord.id}
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg text-gray-700">
                {serviceRecord.publisher?.firstName}{" "}
                {serviceRecord.publisher?.lastName}
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
                {dayjs(
                  Date.UTC(
                    serviceRecord.serviceMonth.monthEnd.getUTCFullYear(),
                    serviceRecord.serviceMonth.monthEnd.getUTCMonth(),
                    1
                  )
                ).format("MMMM YYYY")}
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

              <p className="text-xs text-gray-400 mt-2">
                Created: {dayjs(serviceRecord.createdAt).format("MMM D, YYYY")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceReportWorkstation;
