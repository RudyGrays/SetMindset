import { getProviders } from "next-auth/react";
import { cn } from "@/shared/lib/utils";
import { EmailSignInForm } from "./email-sign-in-form";
import { Divider } from "./divider";
import { ProviderButton } from "./provider-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getAppSessionServer } from "../model/lib/get-server-session";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
  const session = await getAppSessionServer();

  if (session) {
    redirect("/");
  }
  const oauthProviders = Object.values(providers ?? {}).filter(
    (provider) => provider.type === "oauth"
  );

  return (
    <div className={cn("grid gap-6", className)}>
      <EmailSignInForm />
      <Divider />
      {oauthProviders.map((provider) => (
        <ProviderButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
