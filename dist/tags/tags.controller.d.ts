import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
    }>;
    findAll(): Promise<{
        name: string;
        color: string;
        id: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TagClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        color: string;
    }>;
    getBooks(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }[]>;
}
