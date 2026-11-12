import DashboardPage from "@/components/fitme/DashboardPage";

export default function HomePage() {
  return <DashboardPage />;
}
<main style={{ padding: '2rem' }}>
      <h1>Witaj na stronie głównej!</h1>
      <Link href="/about">Przejdź do strony O nas</Link>
    </main>
  );
}
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
async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
  if (!res.ok) throw new Error('Nie udało się pobrać danych');
  return res.json();
}
import { notFound } from 'next/navigation';

async function getPost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Błąd serwera'); // to obsłuży error.js
  return res.json();
}

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound(); // przerywa renderowanie i pokazuje not-found.js
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </main>
  );
}
```

`src/app/posts/[id]/not-found.js`: