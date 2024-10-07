interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  placeholder?: string;
}

export const Input = ({
  label,
  type = "text",
  id,
  name,
  placeholder,
}: InputProps) => {
  return (
    <div className="flex gap-2 items-center">
      {label && (
        <label className="w-1/6" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={`rounded border border-gray-500 p-2 ${
          label ? "w-5/6" : "w-auto"
        }`}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};
