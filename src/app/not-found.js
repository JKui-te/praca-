import Link from 'next/link';

export default function PostNotFound() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Nie znaleziono posta</h1>
      <p>Post o podanym numerze nie istnieje.</p>
      <Link href="/posts">Wróć do listy postów</Link>
    </main>
  );
}