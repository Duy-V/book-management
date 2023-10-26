import { Chip, Checkbox } from "@material-tailwind/react";
import { useController } from "react-hook-form";
import { color } from "@material-tailwind/react/types/components/chip";

type Props = {
  label: string;
  name: string;
  control: any;
  options: any[];
};
const AppChip = ({ label, control, name, options }: Props) => {
  const { field } = useController({
    name,
    control,
    defaultValue: [],
  });
  return options?.map((option) => (
    <Chip
      key={option.id}
      value={option.name}
      variant="ghost"
      color={option.color as color}
      icon={
        <Checkbox
          value={option.id}
          onChange={() => {
            if (field.value.includes(option.id)) {
              field.onChange(
                field.value.filter(
                  (v: any) => v.toString() !== option.id.toString()
                )
              );
            } else {
              field.onChange([...field.value, option.id]);
            }
          }}
          checked={field.value.includes(option.id)}
          color={option.color as color}
          ripple={false}
          containerProps={{ className: "p-0" }}
          crossOrigin={undefined}
        />
      }
    />
  ));
};
export default AppChip;
