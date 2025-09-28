import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold tracking-tight">Log in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
