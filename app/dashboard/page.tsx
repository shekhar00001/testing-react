import { FormProvider } from "@/context/FormContext";
import OnboardingForm from "@/components/onboarding/OnboardingForm";

export default function DashboardPage() {
  return (
    <FormProvider>
      <OnboardingForm />
    </FormProvider>
  );
}
