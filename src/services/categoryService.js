import prisma from "@/lib/prisma";

export async function getCategories() {
  return prisma.category.findMany();
}

export async function getCategoryById(id) {
  return prisma.category.findUnique({ where: { id } });
}

export async function createCategory(data) {
  return prisma.category.create({
    data: {
      name: data.name,
      description: data.description || null,
    },
  });
}

export async function updateCategory(id, data) {
  return prisma.category.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description || null,
    },
  });
}

export async function deleteCategory(id) {
  return prisma.category.delete({ where: { id } });
}
