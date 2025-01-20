const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default async function Home() {
  /* await delay(3000); */
  return <div>SUCA</div>;
}
