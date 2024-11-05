"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - year
 *        - genre
 *      properties:
 *       title:
 *        type: string
 *       description: The title of the book
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
// Model
const mongoose_1 = require("mongoose");
const BookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
});
exports.Book = (0, mongoose_1.model)("Book", BookSchema);
