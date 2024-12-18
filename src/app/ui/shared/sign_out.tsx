import { signOut } from "@/module/user/infrastructure/external_services/auth";

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium lg:text-base">
        Sign Out
      </button>
    </form>
  );
};

export default SignOut;
