"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Model
const Book_1 = require("../models/Book");
// CRUD
const bookController = {
    // Get all books
    getBooks: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const books = yield Book_1.Book.find();
            return res.status(200).json({
                status: "success",
                message: "Daftar buku berhasil diambil",
                data: books,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }),
    // Create a book
    createBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, code, author, year } = req.body;
            // Validasi untuk mengecek apakah code sudah ada
            const existingBook = yield Book_1.Book.findOne({ code });
            if (existingBook) {
                return res.status(400).json({ message: "Code already exists" });
            }
            const book = new Book_1.Book({
                title,
                author,
                code,
                year,
            });
            yield book.save();
            return res.status(201).json({
                status: "success",
                message: "Buku berhasil ditambahkan",
                data: book,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }),
    getBookById: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book_1.Book.findById(id);
            if (!book) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku tidak ditemukan",
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Buku berhasil ditemukan",
                data: book,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }),
    updateBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { title, author, code, year } = req.body;
            // Validasi untuk mengecek apakah code sudah ada pada buku lain
            const existingBook = yield Book_1.Book.findOne({ code, _id: { $ne: id } });
            if (existingBook) {
                return res.status(400).json({ message: "Kode buku sudah terdaftar" });
            }
            const book = yield Book_1.Book.findByIdAndUpdate(id, { title, author, code, year }, { new: true });
            if (!book) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku tidak ditemukan",
                });
            }
            return res.status(200).json({
                status: "success",
                message: "Buku berhasil perbarui",
                data: book,
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }),
    deleteBook: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const book = yield Book_1.Book.findByIdAndDelete(id);
            if (!book) {
                return res.status(404).json({
                    status: "error",
                    message: "Buku tidak ditemukan",
                });
            }
            return res.status(200).json({
                status: "success",
                message: "buku berhasil dihapus",
            });
        }
        catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }),
};
module.exports = bookController;
