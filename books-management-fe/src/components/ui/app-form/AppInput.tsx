import Input from "@material-tailwind/react/components/Input";
import { useController } from "react-hook-form";
type Props = { label: string; name: string; control: any };
const AppInput = ({ label, control, name }: Props) => {
  const { field } = useController({
    name,
    control,
    
  });
  console.log(field);
  return (
    <Input
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      label={label}
      variant="outlined"
      crossOrigin={true}
    />
  );
};
export default AppInput;
