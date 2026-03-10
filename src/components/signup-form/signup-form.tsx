'use client'

import { useState } from "react";
import { Button } from "../button/button";
import { InputField } from "../inputs/input-field/input-field";
import { useRouter } from "next/navigation";
import { useUsername } from "@/src/hooks/use-username";


export function SignupForm() {
  const [usernameInput, setUsernameInput] = useState("");
  const { saveUsername } = useUsername();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameInput.trim()) {
      saveUsername(usernameInput.trim());
      setUsernameInput("");
      router.push('/home');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Please enter your username"
        placeholder="John doe"
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
      />
      <div className="flex flex-row justify-end w-full mt-4">
        <Button
          variant="primary"
          type="submit"
          disabled={!usernameInput.trim()}
        >
          ENTER
        </Button>
      </div>
    </form>
  )
}