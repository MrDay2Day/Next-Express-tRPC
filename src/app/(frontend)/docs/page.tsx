"use client";
import { useState } from "react";

export default function Docs() {
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");

  // Intentionally throwing error to load error layout
  // function getRandom(count: number) {
  //   return Math.floor(Math.random() * count);
  // }
  // const random = getRandom(8);
  // if (random == 1) {
  //   throw new Error("Intentional Error Thrown!");
  // }

  return (
    <>
      <div>
        <h1>Docs</h1>
        <div style={{ display: "flex" }}>
          <input
            className="my-2 rounded-md p-1 border-orange-800 border-2"
            placeholder="Link 1"
            onChange={(e) => setLink1(e.target.value)}
            value={link1}
          />
          {!!link1 ? (
            <>
              <p>/</p>
              <input
                className="my-2 rounded-md p-1 border-orange-800 border-2"
                placeholder="Link 2"
                onChange={(e) => setLink2(e.target.value)}
                value={link2}
              />
            </>
          ) : null}
        </div>
        <br />

        <a
          aria-disabled={!!link1}
          href={`/docs${
            link1 ? `/${link1}${link2 ? `/${link2}` : ""}` : ""
          }?string=Dwight Thorpe&boolean=true&number=23`}
        >
          Go to
        </a>
      </div>
    </>
  );
}
