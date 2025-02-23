let count = 0;
export function getCount() {
  count++;
  return String(count);
}

export const users: {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
}[] = [];
