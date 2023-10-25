import {
  Card,
  CardBody,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";
import { TBook } from "../types/book";
import { TTag } from "../types/tag";
import { type color } from "@material-tailwind/react/types/components/chip";
import useBookStore from "../store/book";
import useFormModalStore from "../store/form-modal";
import { useItems } from "../hooks/useItems";
type Props = {
  book: TBook;
};
const Book = ({ book }: Props) => {
  const { deleteItem } = useItems();

  const { setSelectedBook } = useBookStore();
  const { setForm } = useFormModalStore();
  const handleClickEdit = () => {
    setForm("book");
    setSelectedBook(book);
  };
  const handleClickDelete = async () => {
    await deleteItem(book);
  };
  return (
    <Card>
      <CardBody>
        <Typography variant="small">Name: {book.name} </Typography>
        <Typography variant="small">Description: {book.description}</Typography>
        <Typography variant="small">Price: {book.price}</Typography>
        <Typography variant="small">
          Publication Year: {book.publicationDate}
        </Typography>
        <Typography variant="small">Author: {book.author}</Typography>
        <div className="flex items-center gap-2 flex-wrap">
          <Typography variant="small">Tags:</Typography>
          {book.tags.map((tag) => (
            <Chip color={tag.color as color} value={tag?.name} key={tag?.id} />
          ))}
        </div>
        <div className="space-x-2">
          <Button
            onClick={handleClickEdit}
            size="sm"
            className="mt-4"
            color="yellow"
          >
            Edit
          </Button>{" "}
          <Button
            onClick={handleClickDelete}
            size="sm"
            className="mt-4"
            color="red"
          >
            Delete
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Book;
