import {
  Alert,
  Button,
  Card,
  Chip,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { type color } from "@material-tailwind/react/types/components/chip";
import { useEffect, useState } from "react";
import axiosClient from "../services/axios-client";
import { TTag } from "../types/tag";
import { useLoading } from "../hooks/useLoading";
import { useForm } from "react-hook-form";
import { AppInput, AppRadio } from "./ui/app-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTags } from "../hooks/useTags";

type Props = {
  onCancel: () => void;
};
type FormValues = {
  name: string;
  color: string;
};
export type TOption = typeof options;
const options = [
  {
    color: "red",
    label: "Red",
  },
  {
    color: "teal",
    label: "Teal",
  },
  {
    color: "blue",
    label: "blue",
  },
  {
    color: "orange",
    label: "Orange",
  },
  {
    color: "green",
    label: "Green",
  },
];
const validationSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
type TagFormSchema = z.infer<typeof validationSchema>;
const TagForm = ({ onCancel }: Props) => {
  const [tagName, setTagName] = useState("");
  const { tags, isLoading } = useTags();

  const form = useForm({
    defaultValues: {
      name: "",
      color: options[0].color,
    },
    resolver: zodResolver(validationSchema),
  });

  const { control, handleSubmit: handleSubmitForm, formState } = form;
  console.log(formState.errors);
  const [tagColor, setTagColor] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  
  const handleSubmit = async (values: FormValues) => {
    const response = await axiosClient.post("/tags", {
      name: values.name,
      color: values.color,
    });
    setShowAlert(true);
    setTagName("");
    setTagColor("");
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <Card className="p-4">
      <Typography variant="h4" color="blue-gray">
        Tag Form
      </Typography>
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <Spinner color="red" />
        ) : (
          tags.map((tag: TTag) => (
            <Chip
              key={tag.id}
              color={tag.color as color}
              size="sm"
              value={tag.name}
            />
          ))
        )}
      </div>
      <form
        className="max-w-screen-lg mt-8 mb-2"
        onSubmit={handleSubmitForm(handleSubmit)}
      >
        <div className="flex flex-col gap-6 mb-4">
          <AppInput
            name="name"
            label="Name"
            control={control}
            error={!!formState?.errors?.name}
          />
          {formState?.errors?.name && (
            <Typography variant="small" color="red">
              {formState?.errors?.name?.message}
            </Typography>
          )}
          <div className="flex flex-wrap gap-4">
            <AppRadio name="color" control={control} options={options} />
          </div>
        </div>
        {showAlert && <Alert color="green">Tag submit successfully</Alert>}
        <div className="flex gap-2">
          <Button fullWidth onClick={onCancel}>
            Cancel
          </Button>
          <Button fullWidth color="blue" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default TagForm;
