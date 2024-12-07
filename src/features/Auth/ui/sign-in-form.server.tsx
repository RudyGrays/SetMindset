import { getProviders } from "next-auth/react";
import { cn } from "@/shared/lib/utils";
import { EmailSignInForm } from "./email-sign-in-form";
import { Divider } from "./divider";
import { ProviderButton } from "./provider-button";

export async function SignInForm({ className }: { className?: string }) {
  const providers = await getProviders();
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
