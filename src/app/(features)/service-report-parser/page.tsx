import { ServiceReportContainer } from "@/app/ui/service_report/parser/ServiceReportContainer";
import { auth } from "@/module/user/infrastructure/external_services/auth";

export default async function ServiceReportParser() {
  const user = await auth();

  const userId = user?.user?.id;

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  return <ServiceReportContainer user={{ id: userId }} />;
}
