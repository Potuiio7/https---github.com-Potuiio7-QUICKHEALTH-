import AuthTabs from "@/components/auth/auth-tabs";

export default function SignupPage() {
  return (
    <div className="container flex items-center justify-center py-12">
      <AuthTabs mode="signup" />
    </div>
  );
}
