'use client'

import { useState } from "react";
import { Button } from "../button/button";
import { InputField } from "../inputs/input-field/input-field";
import { useRouter } from "next/navigation";


export function SignupForm() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (username.trim()) {
      sessionStorage.setItem('@codeleap:username', username);
      setUsername("");
    }

    router.push('/home');
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="username"
        label="Please enter your username"
        placeholder="John doe"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div className="flex flex-row justify-end w-full mt-4">
        <Button
          variant="primary"
          type="submit"
          disabled={!username.trim()}
        >
          ENTER
        </Button>
      </div>
    </form>
  )
}