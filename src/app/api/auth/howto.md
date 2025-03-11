How to access for both client and server components

## Server Component

```typescript
import { getServerSession } from "next-auth";
import authOptions from "@/path/to/authOptions";

const session = (await getServerSession(authOptions)) as Session | null;
console.log(session?.accessToken);
```

## Client Component

```typescript
import { useSession } from "next-auth/react";

const session = useSession() as {
  update: UpdateSession;
  data: Session;
  status: "loading" | "authenticated" | "unauthenticated";
};
console.log(session?.data.accessToken);
```
