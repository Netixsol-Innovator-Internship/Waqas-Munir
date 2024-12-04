import Hello from "@/components/Hello";

export default function Home() {
  console.log("Its server component");
  return (
    <h1 className="text-3xl">
      <Hello />
    </h1>
  );
}
