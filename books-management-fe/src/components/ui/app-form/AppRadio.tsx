import { Radio } from "@material-tailwind/react";
import React from "react";
import { useController } from "react-hook-form";
import { TOption } from "../../TagForm";
import { color } from "@material-tailwind/react/types/components/checkbox";

type Props = {
  options: TOption;
  control: any;
  name: string;
};
const AppRadio = ({ options, control, name }: Props) => {
  const { field } = useController({
    name,
    control,
  });
  return (
    <div>
      {options.map((option) => (
        <Radio
          key={option.id}
          name={name}
          color={option.color as color}
          label={option.label}
          crossOrigin={undefined}
          value={field.value}
          defaultChecked={option.color === field.value}
          onChange={() => field.onChange(option.color)}
        />
      ))}
    </div>
  );
};

export default AppRadio;
