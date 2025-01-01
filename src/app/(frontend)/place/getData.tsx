"use server";

import { fetchFromDatabase } from "../../../private/db_access";

async function GetData() {
  const data = await fetchFromDatabase();

  return (
    <div className="p-4  border-2 border-sky-400">
      <h3>This is a server component</h3>
      <p>
        {
          "All top level components have to wait on this to render because of        'fetchFromDatabase' before they can load."
        }
      </p>
      <div className="p-4">
        <p>Valid: {String(data.valid)}</p>
        <p>Date: {data.date.toISOString()}</p>
      </div>
    </div>
  );
}

export default GetData;
