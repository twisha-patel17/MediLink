import { SignUpForm } from "../components/auth/SignUpForm";
import { AuthSidePanel } from "../components/auth/AuthSidePanel";

export const SignupPage = () => {
    return (
        <main className="flex min-h-screen bg-[#F5F6FA]">
            <SignUpForm />
            <AuthSidePanel type="signup" />
        </main>
    );
};