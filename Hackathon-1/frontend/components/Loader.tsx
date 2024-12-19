"use client";

export default function Loader({ loading }: { loading: boolean }) {
  return (
    <div className="w-full py-8 flex justify-center items-center">
      <div className="animate-spin w-8 h-8 border-2 border-primary rounded-full border-t-0" />
    </div>
  );
}
