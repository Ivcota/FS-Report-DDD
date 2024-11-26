import { Month } from "@/domain/service_report/value_objects/month";
import { ServiceContainer } from "@/application/service_report/service_container";

const ServiceReportWorkstation = async () => {
  const serviceContainer = ServiceContainer.getInstance();
  const serviceRecordRepository = serviceContainer.serviceRecordRepository;

  const serviceRecords =
    await serviceRecordRepository.findAllEmptyAndPopulatedRecordsForAGivenMonth(
      new Month(new Date("2024-10-01"))
    );

  console.log(serviceRecords);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Service Report Workstation
      </h1>
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
              {new Date(
                serviceRecord.serviceMonth.monthStart
              ).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceReportWorkstation;
