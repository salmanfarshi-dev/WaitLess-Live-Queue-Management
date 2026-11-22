import { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";

function AppImageUpload({
  value = null,
  onChange,
  disabled = false,
  maxSize = 5,
  label = "Upload Image",
  helperText = "PNG, JPG or WEBP",
  className = "",
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!value) {
      setPreview("");
      return;
    }

    if (typeof value === "string") {
      setPreview(value);
      return;
    }

    const objectUrl = URL.createObjectURL(value);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value]);

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      event.target.value = "";
      return;
    }

    onChange?.(file);
    event.target.value = "";
  };

  const handleRemove = () => {
    onChange?.(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Box className={`w-full min-w-0 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        disabled={disabled}
        onChange={handleChange}
      />

      {preview ? (
        <Box className="relative w-full max-w-xs overflow-hidden rounded-xl border border-border bg-background p-2">
          <img
            src={preview}
            alt="Selected image preview"
            className="h-48 w-full rounded-lg object-cover"
          />

          {!disabled && (
            <IconButton
              onClick={handleRemove}
              aria-label="Remove image"
              size="small"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                backgroundColor: "var(--wl-surface)",
                color: "var(--wl-status-cancelled)",
                "&:hover": {
                  backgroundColor: "var(--wl-status-cancelled-bg)",
                },
              }}
            >
              <FiX size={18} />
            </IconButton>
          )}
        </Box>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="flex w-full max-w-xs flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-background px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiImage size={34} style={{ color: "var(--wl-primary)" }} />

          <span className="text-sm font-semibold text-heading">{label}</span>

          <span className="text-xs text-muted">
            <FiUploadCloud className="mr-1 inline" />
            {helperText}
          </span>

          <Typography
            sx={{
              fontSize: "var(--wl-text-xs)",
              color: "var(--wl-muted)",
            }}
          >
            Maximum size: {maxSize} MB
          </Typography>
        </button>
      )}
    </Box>
  );
}

export default AppImageUpload;
