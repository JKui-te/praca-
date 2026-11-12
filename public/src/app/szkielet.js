export default function PostsLoading() {
  return (
    <main className="p-8 space-y-3">
      {[1, 2, 3, 4, 5].map((n) => (
        <div key={n} className="h-5 w-2/3 animate-pulse rounded bg-zinc-200" />
      ))}
    </main>
  );
}