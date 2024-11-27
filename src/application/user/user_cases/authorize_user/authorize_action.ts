"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/infrastructure/external_services/auth";

type ActionState = {
  error: string | null;
};

export const authorizeUserAction = async (
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  try {
    await signIn("credentials", formData);
    return { error: null };
  } catch (error: any) {
    // Check if this is a redirect error from NextAuth
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      redirect(error.digest.split(";")[2]);
    }

    // Handle CredentialsSignin error specifically
    if (error?.message === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }

    console.error("Authentication error:", error);
    return { error: "An unexpected error occurred" };
  }
};
