import { Month } from "@/domain/service_report/value_objects/month";
import { ServiceContainer } from "@/application/service_report/service_container";
import WorkstationForm from "@/app/ui/service_report/workstation/WorkstationForm";
import dayjs from "dayjs";

type ServiceReportWorkstationProps = {
  searchParams: {
    month: string;
  };
};

const ServiceReportWorkstation = async ({
  searchParams,
}: ServiceReportWorkstationProps) => {
  const serviceContainer = ServiceContainer.getInstance();
  const serviceRecordRepository = serviceContainer.serviceRecordRepository;

  const monthParam = searchParams.month;
  const date = new Date(monthParam ?? new Date().toISOString());
  const month = new Month(date);

  const serviceRecords =
    await serviceRecordRepository.findAllEmptyAndPopulatedRecordsForGivenMonth(
      month
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Service Report Workstation
      </h1>
      <WorkstationForm selectedMonth={month.monthStart} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceRecords.map((serviceRecord) => (
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
            <p className="text-sm text-gray-500">
              {dayjs(
                Date.UTC(
                  serviceRecord.serviceMonth.monthEnd.getUTCFullYear(),
                  serviceRecord.serviceMonth.monthEnd.getUTCMonth(),
                  1
                )
              ).format("MMM YYYY")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceReportWorkstation;
