"use client";
export default function Demo(props: { name?: string }) {
  return (
    <div className="p-4  border-2 border-sky-400">
      <p>{`This is a use of a component that passes props -> { name: ${
        props.name || "Unknown"
      } }`}</p>
    </div>
  );
}
