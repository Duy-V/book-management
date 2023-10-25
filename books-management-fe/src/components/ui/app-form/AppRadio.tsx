import { Radio } from '@material-tailwind/react'
import React from 'react'
import { useController } from 'react-hook-form'

type Props = {
    options:any[];
    control:any;
    name: string
}
const AppRadio = ({options, control, name}: Props) => {
    const { field } = useController({
        name,
        control,
      });
  return (
    <div>
      {options.map(option=><Radio key={option.id}
              name={name}
              color={option.color}
              label={option.label}
               crossOrigin={undefined}
               value={field.value} 
               onChange={()=> field.onChange(option.color)}
            />)}
    </div>
  )
}

export default AppRadio
