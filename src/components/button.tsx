type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  type?: ButtonType;
  children?: React.ReactNode;
}

export const Button = ({ type = "submit", children }: ButtonProps) => {
  return (
    <button className="rounded border border-green-500 p-1.5" type={type}>
      {children}
    </button>
  );
};
