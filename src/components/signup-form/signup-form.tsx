import { Button } from "../button/button";
import { InputField } from "../input-field/input-field";
import { Heading1 } from "../typography/heading/heading1";

export function SignupForm() {
  return (
    <section className="w-125 bg-white border border-[#CCCCCC] p-6 rounded-2xl">
      <Heading1 className="mb-6">Welcome to CodeLeap network!</Heading1>
      <InputField id="username" label="Please enter your username" placeholder="John doe" />
      <div className="flex flex-row justify-end w-full mt-4">
        <Button variant="primary">ENTER</Button>
      </div>
    </section>
  )
}