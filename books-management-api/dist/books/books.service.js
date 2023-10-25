"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createBookDto) {
        const { tags, ...data } = createBookDto;
        let existingTags = [];
        if (tags?.length > 0) {
            existingTags = await this.prisma.tag.findMany({
                where: {
                    id: {
                        in: tags,
                    },
                },
            });
        }
        const newBook = await this.prisma.book.create({
            data: {
                ...data,
                ...(tags && {
                    tags: {
                        connect: existingTags.map((tag) => ({
                            id: tag.id,
                        })),
                    },
                }),
            },
        });
        return newBook;
    }
    async findAll() {
        const books = await this.prisma.book.findMany({
            include: {
                tags: true,
            },
        });
        return books.map((book) => ({
            ...book,
            tags: book.tags.map(({ name, color, id }) => ({ name, color, id })),
        }));
    }
    async findOne(id) {
        return this.prisma.book.findUnique({
            where: { id },
            include: {
                tags: true,
            },
        });
    }
    async update(id, updateBookDto) {
        const { tags, ...data } = updateBookDto;
        let existingTags = [];
        if (tags && tags.length > 0) {
            existingTags = await this.prisma.tag.findMany({
                where: {
                    id: {
                        in: tags,
                    },
                },
            });
        }
        return this.prisma.book.update({
            where: { id },
            data: {
                ...data,
                ...(tags && {
                    tags: {
                        set: existingTags.map((tag) => ({
                            id: tag.id,
                        })),
                    },
                }),
            },
        });
    }
    async remove(id) {
        return this.prisma.book.delete({
            where: { id },
        });
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map