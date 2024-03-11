import connectDB from "./lib/connectDB";

export default async function Home() {
  await connectDB();

  return (
    <main className="flex h-full">
      <h1 className="font-mono text-3xl font-bold">Landing page!</h1>
    </main>
  );
}
