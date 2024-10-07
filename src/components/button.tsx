type ButtonType = "submit" | "reset" | "button";

interface ButtonProps {
  type?: ButtonType;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button = ({ type = "button", onClick, children }: ButtonProps) => {
  return (
    <button
      className="rounded border border-green-500 p-1.5"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
