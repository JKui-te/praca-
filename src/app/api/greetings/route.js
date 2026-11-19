import { prisma } from '@/lib/prisma';

export async function GET() {
  const zadania = await prisma.zadanie.findMany();
  return Response.json(zadania);
}
export async function GET() {
  const data = [
    { id: 1, message: 'Cześć!' },
    { id: 2, message: 'Miłej nauki Next.js!' },
  ];

  return Response.json(data);
}
export async function GET() {
  return Response.json([{ id: 1, message: 'Cześć!' }]);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.message) {
    return Response.json({ error: 'Pole message jest wymagane' }, { status: 400 });
  }

  return Response.json({ id: Date.now(), message: body.message }, { status: 201 });
}