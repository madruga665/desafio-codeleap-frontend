'use client'

import { useState } from "react";
import { Button } from "../button/button";
import { InputField } from "../input-field/input-field";
import { Heading1 } from "../typography/heading/heading1";

export function SignupForm() {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (username.trim()) {
      sessionStorage.setItem('@codeleap:username', username);
      setUsername(""); // Limpa o input após o envio
    }
  };

  return (
    <section className="w-125 bg-white border border-[#CCCCCC] p-6 rounded-2xl">
      <Heading1 className="mb-6">Welcome to CodeLeap network!</Heading1>

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
    </section>
  )
}