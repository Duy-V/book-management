import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
  Option,
  Select,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { TTag } from "../types/tag";
import { useLoading } from "../hooks/useLoading";
import { color } from "@material-tailwind/react/types/components/chip";
import { TBook } from "../types/book";
import { useItems } from "../hooks/useItems";
import { useForm } from "react-hook-form";
import { AppInput, AppTextarea, AppChip } from "./ui/app-form";
import useFormModalStore from "../store/form-modal";

type Props = {
  onCancel: () => void;
  book: TBook | null;
  onClose: () => void;
};
const BookForm = ({ onCancel, book, onClose }: Props) => {
  const { books, addItem, editItem } = useItems();
  const { form, setForm } = useFormModalStore();

  const formState = useForm();
  const { control, handleSubmit: handleSubmitForm, reset } = formState;
  console.log();
  const [tags, setTags] = useState<TTag[]>([]);
  const [loading, { showLoading, hideLoading }] = useLoading();
  const handleSubmit = async (values: any) => {
    let convertValues = {
      ...values,
      price: +values.price,
    };
    if (book) {
      editItem.mutate({ bookId: book.id, convertValues });
    } else {
      addItem.mutate(convertValues);
    }
    onClose();
  };
  const getTags = async () => {
    showLoading();
    const response = await axiosClient.get("/tags");
    setTags(response.data);
    hideLoading();
  };
  useEffect(() => {
    getTags();
  }, []);
  useEffect(() => {
    if (!book || form === "book") {
      reset();
    } else {
      reset({ ...book, tags: book.tags.map((tag) => tag.id) });
    }
  }, [book, reset]);
  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        {!!book ? "Edit" : "Creating book"}
      </Typography>

      <form
        className="max-w-screen-lg mt-8 mb-2"
        onSubmit={handleSubmitForm(handleSubmit)}
      >
        <div className="mb-4 flex flex-col gap-6">
          <AppInput name="name" label="Name" control={control} />

          <AppTextarea
            label="Description"
            name="description"
            control={control}
          />
          <AppInput name="price" label="Price" control={control} />
          <AppInput
            name="publicationDate"
            control={control}
            label="Publication Year"
          />
          <AppInput name="author" label="Author" control={control} />
          <div className="flex gap-2 flex-wrap">
            <AppChip options={tags} name="tags" control={control} label={""} />
          </div>
        </div>
        <div className="mb-4 flex  gap-6">
          <Button className="mt-6" fullWidth>
            Cancel
          </Button>
          <Button className="mt-6" fullWidth type="submit">
            {book ? "Edit" : "Submit"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default BookForm;
