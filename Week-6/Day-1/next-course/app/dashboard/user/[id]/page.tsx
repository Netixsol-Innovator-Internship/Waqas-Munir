export default function page({ params }: { params: { id: string } }) {
  return <div>User {params.id}</div>;
}
