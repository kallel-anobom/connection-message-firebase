import { Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export interface FormInputTextProps {
  name: string;
  control: any;
  label: string;
  type?: string;
}

const FormInputText = ({
  name,
  control,
  label,
  type = "text",
}: FormInputTextProps) => {
  return (
    <Stack spacing={1} sx={{ marginBottom: 2 }}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            variant="outlined"
            type={type}
          />
        )}
      />
    </Stack>
  );
};
export default FormInputText;
