import { TextField } from "@mui/material";
import { CustomTextFieldProps } from "@/types";

const CustomTextField = ({ label, placeholder, ...props }: CustomTextFieldProps) => (
    <div className="w-full mb-4">
      <p className="block text-lg font-semibold mb-2">{label}</p>
      <TextField
        fullWidth
        placeholder={placeholder}
        className="border border-gray-400 rounded-md bg-white"
        slotProps={{
          input: {
            className: "pl-3",
            style: { height: '40px', borderRadius: '4px' },
          }
        }}
        {...props}
      />
    </div>
  );

export default CustomTextField;