import {Textarea} from "@material-tailwind/react";
import { useController } from "react-hook-form";
type Props = { label: string; name: string; control: any };
const AppTextarea = ({ label, control, name }: Props) => {
  const { field } = useController({
    name,
    control,
    
  });
  return (
    <Textarea size="lg"
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      label={label}
      variant="outlined"
    />
  );
};
export default AppTextarea;
