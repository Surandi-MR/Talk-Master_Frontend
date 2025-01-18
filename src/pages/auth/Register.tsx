import { useState } from 'react';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { CredentialsForm } from '@/components/auth/CredentialsForm';

export function Register() {
  const [step, setStep] = useState(1);
  const [userDetails, setUserDetails] = useState({});
  

  return (
    <div className="min-h-screen bg-[#0A192F] text-white grid md:grid-cols-2 grid-cols-1">
      {step === 1 ? (
        <>
          <div className="p-6 md:p-12 space-y-6 flex flex-col">
            <Logo size="fit" className="mx-auto md:mx-0" />
            <div className="flex-grow flex items-center justify-center flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-center ">
                Hello.
              </h1>
              <p className="text-gray-300 text-center">
                Enter your personal details and start your journey with us
              </p>
            </div>
          </div>
          <div className="bg-white/10 p-6 md:p-12 backdrop-blur-lg flex items-center justify-center">
            <div className="max-w-md mx-auto">
              <RegisterForm
                setStep={setStep}
                setUserDetails={setUserDetails}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-6 md:p-12 space-y-6">
            <Logo size="lg" className="mx-auto md:mx-0" />
            <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
              Welcome!
            </h1>
            <p className="text-gray-300 text-center md:text-left">
              To keep connected with us, please choose your password
            </p>
            <Button
              variant="outline"
              className="flex-1 text-[#0A192F] hover:bg-slate-300"
              onClick={() => setStep(1)}
            >
              ← PREVIOUS
            </Button>
          </div>
          <div className="bg-white/10 p-6 md:p-12 backdrop-blur-lg ">
            <div className="max-w-md mx-auto">
              <CredentialsForm
                userDetails={userDetails}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
