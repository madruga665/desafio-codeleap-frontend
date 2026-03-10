import { Metadata } from "next";
import { SignupForm } from "../components/signup-form/signup-form";
import { Heading1 } from "../components/typography/heading/heading1";

export const metadata: Metadata = {
  title: 'CodeLeap Network | signup',
};

export default function Signup() {
  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center bg-[#DDDDDD]">
      <section className="w-[90%] max-w-125 bg-white border border-[#CCCCCC] p-6 rounded-2xl">
        <Heading1 className="mb-6">Welcome to CodeLeap network!</Heading1>
        <SignupForm />
      </section>
    </main>
  );
}
