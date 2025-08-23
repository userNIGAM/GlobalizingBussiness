export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}) {
  const baseStyle =
    "px-4 py-2 rounded-xl font-medium transition-all duration-200 focus:outline-none";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
