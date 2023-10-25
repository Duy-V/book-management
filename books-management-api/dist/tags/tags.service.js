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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TagsService = class TagsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTagDto) {
        const { name, color } = createTagDto;
        const existingTag = await this.prisma.tag.findFirst({
            where: { name },
        });
        if (existingTag) {
            throw new common_1.HttpException('Tag already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.prisma.tag.create({
            data: { name, color },
        });
    }
    async findAll() {
        return this.prisma.tag.findMany({
            select: { id: true, name: true, color: true },
            orderBy: { name: 'asc' },
        });
    }
    findOne(id) {
        return this.prisma.tag.findUnique({
            where: { id },
        });
    }
    async update(id, updateTagDto) {
        const { name, color } = updateTagDto;
        const existingTag = await this.prisma.tag.findUnique({
            where: { id },
        });
        if (!existingTag) {
            throw new common_1.HttpException('Tag not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.tag.update({
            where: { id },
            data: { name, color },
        });
    }
    async remove(id) {
        const existingTag = await this.prisma.tag.findUnique({
            where: { id },
        });
        if (!existingTag) {
            throw new common_1.HttpException('Tag not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.prisma.tag.delete({
            where: { id },
        });
    }
    async getBooks(id) {
        const tag = await this.prisma.tag.findUnique({
            where: { id },
            include: {
                books: true,
            },
        });
        if (!tag) {
            throw new common_1.HttpException('Tag not found', common_1.HttpStatus.NOT_FOUND);
        }
        return tag.books;
    }
};
exports.TagsService = TagsService;
exports.TagsService = TagsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagsService);
//# sourceMappingURL=tags.service.js.map