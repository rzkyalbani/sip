import prisma from "@/lib/prisma";

export async function getAuthors() {
  return prisma.author.findMany();
}

export async function getAuthorById(id) {
  return prisma.author.findUnique({
    where: { id },
  });
}

export async function createAuthor(data) {
  return prisma.author.create({
    data: {
      name: data.name,
      bio: data.bio || null,
    },
  });
}

export async function updateAuthor(id, data) {
  return prisma.author.update({
    where: { id },
    data: {
      name: data.name,
      bio: data.bio || null,
    },
  });
}

export async function deleteAuthor(id) {
  return prisma.author.delete({
    where: { id },
  });
}
