import prisma from "@/lib/prisma";

export async function getPublishers() {
  return prisma.publisher.findMany();
}

export async function getPublisherById(id) {
  return prisma.publisher.findUnique({ where: { id } });
}

export async function createPublisher(data) {
  return prisma.publisher.create({
    data: {
      name: data.name,
      address: data.address || null,
      contact: data.contact || null,
    },
  });
}

export async function updatePublisher(id, data) {
  return prisma.publisher.update({
    where: { id },
    data: {
      name: data.name,
      address: data.address || null,
      contact: data.contact || null,
    },
  });
}

export async function deletePublisher(id) {
  return prisma.publisher.delete({ where: { id } });
}
