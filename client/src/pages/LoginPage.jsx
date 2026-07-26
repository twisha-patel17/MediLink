import { LoginForm } from "../components/auth/LoginForm";
import { AuthSidePanel } from "../components/auth/AuthSidePanel";

export const LoginPage = () => {
    return (
        <main className="flex min-h-screen bg-[#F5F6FA]">
            <LoginForm />
            <AuthSidePanel type="login" />
        </main>
    );
};