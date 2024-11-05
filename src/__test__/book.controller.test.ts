import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import { Book } from "../models/Book";

describe("Book Controller", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI || "");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Book.deleteMany({});

    await Book.create([
      {
        title: "Laskar Pelangi",
        code: "INIT002",
        author: "Fery",
        year: 2020,
      },
      {
        title: "Test Book1",
        code: "TEST001",
        author: "Author1",
        year: 2021,
      },
    ]);
  });

  describe("GET /books", () => {
    test("should get all books", async () => {
      const response = await request(app).get("/books");
      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveLength(2);
    });
  });

  describe("GET /books/:id", () => {
    test("should get a book by ID", async () => {
      // Buat buku untuk diambil
      const book = await Book.create({
        title: "Sample Book",
        code: "SAMPLE001",
        author: "Sample Author",
        year: 2022,
      });

      const response = await request(app).get(`/books/${book._id}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.title).toBe("Sample Book");
    });
  });
});
