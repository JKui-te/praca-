"use client";

export default function PostsError({ error, retry }) {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Ups, coś poszło nie tak</h1>
      <p>Nie udało się wczytać listy postów.</p>
      <button type="button" onClick={() => retry()}>
        Spróbuj ponownie
      </button>
      {error ? <p>{error.message}</p> : null}
    </main>
  );
}