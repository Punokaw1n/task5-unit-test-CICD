"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Book Management API",
            version: "1.0.0",
            description: "API for managing books with CRUD operations and authentication.",
        },
        servers: [
            {
                url: "http://localhost:8000/",
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "token",
                },
            },
            schemas: {
                Book: {
                    type: "object",
                    required: ["title", "author", "year"],
                    properties: {
                        title: {
                            type: "string",
                            description: "The title of the book",
                            example: "Naruto",
                        },
                        code: {
                            type: "string",
                            description: "The code of the book",
                            example: "123",
                        },
                        author: {
                            type: "string",
                            description: "The author of the book",
                            example: "Masashi Kishimoto",
                        },
                        year: {
                            type: "number",
                            description: "The year the book was published",
                            example: 2001,
                        },
                    },
                },
            },
            parameters: {
                bookId: {
                    name: "id",
                    in: "path",
                    required: true,
                    description: "ID of the book",
                    schema: {
                        type: "string",
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.ts"], // Mengambil anotasi dari file route
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const swaggerDocs = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
};
exports.default = swaggerDocs;
