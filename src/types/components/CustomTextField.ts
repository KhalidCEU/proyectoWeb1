export interface CustomTextFieldProps {
    label: string;
    placeholder?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    isPassword?: boolean;
}
