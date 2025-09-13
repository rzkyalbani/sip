import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Bersihin dulu
  await prisma.borrowing.deleteMany();
  await prisma.member.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.publisher.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminPassword = await hash("admin123", 10);
  await prisma.user.upsert({
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
  const categories = await prisma.category.createMany({
    data: [
      { name: "Fiction", description: "Fictional literature" },
      { name: "Non-Fiction", description: "Based on facts and real events" },
      { name: "Science", description: "Scientific books" },
      { name: "History", description: "Books about history" },
    ],
  });

  const allCategories = await prisma.category.findMany();

  // Create authors
  const authors = await prisma.author.createMany({
    data: [
      { name: "J.K. Rowling", bio: "British author" },
      { name: "George Orwell", bio: "English novelist" },
      { name: "Isaac Asimov", bio: "Science fiction writer" },
      { name: "Yuval Noah Harari", bio: "Historian and philosopher" },
    ],
  });

  const allAuthors = await prisma.author.findMany();

  // Create publishers
  const publishers = await prisma.publisher.createMany({
    data: [
      { name: "Bloomsbury", contact: "contact@bloomsbury.com" },
      { name: "Secker & Warburg", contact: "info@seckerandwarburg.com" },
      { name: "Penguin Random House", contact: "info@penguin.com" },
      { name: "HarperCollins", contact: "contact@harpercollins.com" },
    ],
  });

  const allPublishers = await prisma.publisher.findMany();

  // Generate banyak buku (contoh 100 buku)
  const booksData = Array.from({ length: 100 }).map((_, i) => {
    const author = allAuthors[i % allAuthors.length];
    const publisher = allPublishers[i % allPublishers.length];
    const category = allCategories[i % allCategories.length];

    return {
      title: `Sample Book ${i + 1}`,
      authorId: author.id,
      publisherId: publisher.id,
      isbn: `978000000${i.toString().padStart(4, "0")}`,
      publicationYear: 2000 + (i % 20),
      categoryId: category.id,
      description: `This is a description for Sample Book ${i + 1}`,
      quantity: (i % 5) + 1,
      availableQuantity: (i % 5) + 1,
      location: `Shelf ${String.fromCharCode(65 + (i % 5))}${(i % 10) + 1}`,
    };
  });

  await prisma.book.createMany({ data: booksData });

  // Create member dummy
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

  console.log("Seed data created successfully 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
