import { CompositionRoot } from "@/service_container";
import { ServiceRecordMapper } from "@/module/service_report/application/mappers/service_record_mapper";
import { WorkstationCard } from "@/app/ui/service_report/workstation/WorkstationCard";
import WorkstationForm from "@/app/ui/service_report/workstation/WorkstationForm";
import { auth } from "@/module/user/infrastructure/external_services/auth";
import dayjs from "dayjs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ServiceReportWorkstationProps = any;

const serviceContainer = CompositionRoot.getInstance();
const viewWorkstationMonthUseCase =
  serviceContainer.serviceReportModule.getViewWorkstationMonthUseCase();

const ServiceReportWorkstation = async ({
  searchParams,
}: ServiceReportWorkstationProps) => {
  const session = await auth();
  const monthParam = searchParams.month ?? dayjs().format("YYYY-MM-DD");

  const userId = session?.user?.id;

  const { results, error } = await viewWorkstationMonthUseCase.execute({
    monthStart: monthParam,
  });

  if (error) {
    return <div>{error}</div>;
  }

  if (userId === undefined) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Service Report Workstation
      </h1>
      <WorkstationForm selectedMonth={new Date(monthParam)} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((serviceRecord) => (
          <WorkstationCard
            key={serviceRecord.publisher?.id ?? serviceRecord.id}
            serviceRecord={ServiceRecordMapper.toSimplifiedServiceRecord(
              serviceRecord
            )}
            userId={userId}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceReportWorkstation;
