import { Input } from "./input";

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (value: string) => void;
}

export function CurrencyInput({
  value,
  onChange,
  ...props
}: CurrencyInputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^0-9]/g, '');
    onChange(value);
  };

  const formattedValue = value
    ? `₹${Number(value).toLocaleString('en-IN')}`
    : '₹0';

  return (
    <Input
      {...props}
      value={formattedValue}
      onChange={handleChange}
      className="font-mono"
    />
  );
}