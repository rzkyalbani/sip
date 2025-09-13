import prisma from "@/lib/prisma";

export async function getBooks({ search, categoryId, page = 1, limit = 10 }) {
  const where = {
    ...(search
      ? {
          title: {
            contains: search,
          },
        }
      : {}),
    ...(categoryId ? { categoryId: parseInt(categoryId) } : {}),
  };

  const [data, total] = await Promise.all([
    prisma.book.findMany({
      where,
      include: {
        author: true,
        publisher: true,
        category: true,
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.book.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getBookById(id) {
  return prisma.book.findUnique({
    where: { id },
    include: {
      author: true,
      publisher: true,
      category: true,
    },
  });
}

export async function createBook(data) {
  return prisma.book.create({
    data: {
      title: data.title,
      authorId: parseInt(data.authorId),
      publisherId: parseInt(data.publisherId),
      isbn: data.isbn,
      publicationYear: data.publicationYear
        ? parseInt(data.publicationYear)
        : null,
      categoryId: parseInt(data.categoryId),
      description: data.description,
      quantity: parseInt(data.quantity) || 1,
      availableQuantity: parseInt(data.quantity) || 1,
      location: data.location,
    },
  });
}

export async function updateBook(id, data) {
  return prisma.book.update({
    where: { id },
    data: {
      title: data.title,
      authorId: parseInt(data.authorId),
      publisherId: parseInt(data.publisherId),
      isbn: data.isbn,
      publicationYear: data.publicationYear
        ? parseInt(data.publicationYear)
        : null,
      categoryId: parseInt(data.categoryId),
      description: data.description,
      quantity: parseInt(data.quantity) || 1,
      availableQuantity: parseInt(data.quantity) || 1,
      location: data.location,
    },
  });
}

export async function deleteBook(id) {
  return prisma.book.delete({
    where: { id },
  });
}
