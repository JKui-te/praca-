import DashboardPage from "@/components/fitmenienaocene/DashboardPage";

export default function HomePage() {
  return <DashboardPage />;
}
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!res.ok) {
    throw new Error('Nie udało się pobrać danych');
  }
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Lista postów</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </main>
  );
}
async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return res.json();
}

export default async function PostPage({ params }) {
  // w Next.js 15+ `params` to Promise — trzeba go "odczekać"
  const { id } = await params;
  const post = await getPost(id);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}