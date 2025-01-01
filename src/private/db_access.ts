import "server-only";

export function fetchFromDatabase(): Promise<{ valid: boolean; date: Date }> {
  return new Promise(async (resolve) => {
    setTimeout(() => resolve({ valid: true, date: new Date() }), 3000);
  });
}
