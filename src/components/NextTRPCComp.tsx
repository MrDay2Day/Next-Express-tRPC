import { trpcNextAPIClient } from "@/app/_trpc/client";

export default async function NextTRPCComp() {
  const hello = trpcNextAPIClient.hello.useQuery({ name: "Client" });
  const addNumbersMutation = trpcNextAPIClient.addNumbers.useMutation();

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{hello.data.greeting}</h1>
      <button
        onClick={() => {
          addNumbersMutation.mutate(
            {
              num1: 5,
              num2: 10,
            },
            {
              onSuccess: (result) => {
                console.log("Sum:", result);
              },
            }
          );
        }}
      >
        Add Numbers
      </button>
    </div>
  );
}
