// import request from "supertest";
// import app from "../app"; // Sesuaikan path sesuai kebutuhan
// import mongoose from "mongoose";
// import { Book } from "../models/Book";

// describe("Book Controller", () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URI || "");
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   beforeEach(async () => {
//     // Menghapus semua buku sebelum setiap pengujian
//     await Book.deleteMany({});

//     // Menambahkan data buku awal
//     await Book.create([
//       {
//         title: "Laskar pelangi",
//         code: "INIT002",
//         author: "Fery",
//         year: 2020,
//       },
//       {
//         title: "Test Book1",
//         code: "TEST001",
//         author: "Author1",
//         year: 2021,
//       },
//     ]);
//   });

//   test("should get all books", async () => {
//     const response = await request(app).get("/books");
//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe("success");
//     expect(response.body.data).toHaveLength(2); // Pastikan ada 2 buku
//   });

//   test("should create a new book", async () => {
//     const bookData = {
//       title: "Another ",
//       code: "TEST009",
//       author: "fery sadw",
//       year: 2098,
//     };

//     const response = await request(app).post("/books").send(bookData);

//     // Log respons untuk debug
//     console.log(response.body);
//     console.log("Response Status:", response.status);
//     console.log("Response Body:", response.body);

//     expect(response.status).toBe(201);
//     expect(response.body.message).toBe("Buku berhasil ditambahkan");
//   });

//   // Tambahkan pengujian untuk metode lain (getBookById, updateBook, deleteBook)...
// });
// // ????

import request from "supertest";
import app from "../app"; // Adjust path as needed
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
    // Delete all books before each test
    await Book.deleteMany({});

    // Add initial book data
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
      expect(response.body.data).toHaveLength(2); // Ensure there are 2 books
    });
  });

  describe("POST /books", () => {
    test("should create a new book", async () => {
      const bookData = {
        title: "Another Book",
        code: "TEST009",
        author: "Fery Sadw",
        year: 2098,
      };

      const response = await request(app).post("/books").send(bookData);

      // Log response for debug
      console.log(response.body);
      console.log("Response Status:", response.status);
      console.log("Response Body:", response.body);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Buku berhasil ditambahkan");
    });
  });

  describe("GET /books/:id", () => {
    test("should get a book by ID", async () => {
      // Create a book to retrieve
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

  describe("PUT /books/:id", () => {
    test("should update a book by ID", async () => {
      const book = await Book.create({
        title: "Update Me",
        code: "UPDATE001",
        author: "Updater",
        year: 2023,
      });

      const updatedData = {
        title: "Updated Book",
        code: "UPDATE001",
        author: "Updated Author",
        year: 2024,
      };

      const response = await request(app)
        .put(`/books/${book._id}`)
        .send(updatedData);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Buku berhasil perbarui");
    });
  });

  describe("DELETE /books/:id", () => {
    test("should delete a book by ID", async () => {
      const book = await Book.create({
        title: "Book to Delete",
        code: "DELETE001",
        author: "Deletor",
        year: 2025,
      });

      const response = await request(app).delete(`/books/${book._id}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("buku berhasil dihapus");
    });

    test("should return 404 if book not found on delete", async () => {
      const response = await request(app).delete("/books/invalid-id");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Buku tidak ditemukan");
    });
  });
});
