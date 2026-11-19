import { prisma } from '@/lib/prisma';

export async function GET() {
  const zadania = await prisma.zadanie.findMany();
  return Response.json(zadania);
}