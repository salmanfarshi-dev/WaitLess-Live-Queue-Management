import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { FiCopy, FiCheck } from "react-icons/fi";

function AppCopyButton({
  text = "",
  label = "Copy",
  size = "small",
  disabled = false,
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) return;

    try {
      await navigator.clipboard.writeText(String(text));
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <Tooltip title={copied ? "Copied!" : label} arrow>
      <span className={`inline-flex ${className}`}>
        <IconButton
          size={size}
          onClick={handleCopy}
          disabled={disabled || !text}
          aria-label={copied ? "Copied" : label}
          sx={{
            color: copied ? "var(--wl-status-completed)" : "var(--wl-muted)",
            "&:hover": {
              backgroundColor: "var(--wl-primary-light)",
              color: "var(--wl-primary)",
            },
          }}
        >
          {copied ? <FiCheck size={17} /> : <FiCopy size={17} />}
        </IconButton>
      </span>
    </Tooltip>
  );
}

export default AppCopyButton;
