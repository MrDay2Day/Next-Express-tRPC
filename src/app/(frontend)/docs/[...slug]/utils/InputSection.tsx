"use client";
import { trpcClient } from "@/utils/trpcClientSide";
// import { trpc } from "@/utils/trpc";
import { useState } from "react";

export default function InputSection() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // some data query/fetch
      const response = await trpcClient.userManagement.createUser.mutate({
        name: "Dwight",
        email: "dwight@email.co",
      });
      console.log({ response });
    } catch (error: unknown) {
      console.log({ error });
      setResponse("Error occurred while submitting input.");
    }
  };

  return (
    <div>
      <h1>Server-Only Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="inputField">Enter something:</label>
        <input
          type="text"
          id="inputField"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send to Server</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
}
