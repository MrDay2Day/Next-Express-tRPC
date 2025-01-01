export const metadata = {
  title: "D2D Demo Documents",
  description: "This is where documents are presented",
};

// function getRandom(count: number) {
//   return Math.floor(Math.random() * count);
// }

// interface PropsType {
//   children: React.ReactNode;
// }
type PropsType = {
  children: React.ReactNode;
};

export default function DocsLayout(props: PropsType) {
  // const random = getRandom(10);
  // console.log({ random });
  // if (random <= 1) {
  //   throw new Error("Intentional Error Thrown In Layout for /docs!");
  // }

  return (
    <>
      {props.children}
      <p>Docs Layout</p>
    </>
  );
}
