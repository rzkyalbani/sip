import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@library.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@library.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create categories
  const fiction = await prisma.category.create({
    data: { name: "Fiction", description: "Fictional literature" },
  });

  const nonFiction = await prisma.category.create({
    data: {
      name: "Non-Fiction",
      description: "Based on facts and real events",
    },
  });

  // Create authors
  const author1 = await prisma.author.create({
    data: { name: "J.K. Rowling", bio: "British author" },
  });

  const author2 = await prisma.author.create({
    data: { name: "George Orwell", bio: "English novelist" },
  });

  // Create publishers
  const publisher1 = await prisma.publisher.create({
    data: { name: "Bloomsbury", contact: "contact@bloomsbury.com" },
  });

  const publisher2 = await prisma.publisher.create({
    data: { name: "Secker & Warburg", contact: "info@seckerandwarburg.com" },
  });

  // Create books
  await prisma.book.create({
    data: {
      title: "Harry Potter and the Philosopher's Stone",
      authorId: author1.id,
      publisherId: publisher1.id,
      isbn: "9780747532699",
      publicationYear: 1997,
      categoryId: fiction.id,
      description: "The first book in the Harry Potter series",
      quantity: 5,
      availableQuantity: 5,
      location: "Shelf A1",
    },
  });

  await prisma.book.create({
    data: {
      title: "1984",
      authorId: author2.id,
      publisherId: publisher2.id,
      isbn: "9780451524935",
      publicationYear: 1949,
      categoryId: fiction.id,
      description: "A dystopian novel by George Orwell",
      quantity: 3,
      availableQuantity: 3,
      location: "Shelf B2",
    },
  });

  // Create member
  await prisma.member.create({
    data: {
      memberCode: "MEM001",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St",
      status: "ACTIVE",
    },
  });

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
