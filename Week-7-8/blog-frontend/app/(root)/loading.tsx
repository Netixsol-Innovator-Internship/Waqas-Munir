import Spinner from "@/components/Spinner";

export default function loading() {
  return (
    <div className="h-[85vh] flex items-center justify-center">
      <Spinner />
    </div>
  );
}
