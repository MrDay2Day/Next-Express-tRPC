let superjsonExport;

async function loadSuperjson() {
  superjsonExport = await import("superjson");
}

export { superjsonExport, loadSuperjson };
