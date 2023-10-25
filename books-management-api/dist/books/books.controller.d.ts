import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    create(createBookDto: CreateBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }>;
    findAll(): Promise<{
        tags: {
            name: string;
            color: string;
            id: string;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }[]>;
    findOne(id: string): Promise<{
        tags: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            color: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string;
        price: number;
        publicationDate: string;
        author: string;
    }>;
}
