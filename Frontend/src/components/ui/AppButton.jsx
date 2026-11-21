import { Button } from "@heroui/react";
import { FiLoader } from "react-icons/fi";

function AppButton({
  children,
  type = "button",
  variant = "solid",
  color = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  startIcon,
  endIcon,
  onPress,
  className = "",
}) {
  const isDisabled = disabled || loading;

  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      size={size}
      isDisabled={isDisabled}
      onPress={onPress}
      className={`max-w-full font-semibold transition-all duration-200 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      startContent={
        loading ? (
          <FiLoader
            className="h-4 w-4 animate-spin"
            style={{ color: "currentColor" }}
          />
        ) : (
          startIcon
        )
      }
      endContent={!loading ? endIcon : undefined}
    >
      {loading ? "Please wait..." : children}
    </Button>
  );
}

export default AppButton;
