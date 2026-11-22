import { useRef, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";

function AppFileUpload({
  onChange,
  accept = "image/*,.pdf",
  multiple = false,
  disabled = false,
  maxSize = 5,
  label = "Upload files",
  helperText = "Drag and drop or click to browse",
  className = "",
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    const fileList = Array.from(selectedFiles || []);

    if (!fileList.length) return;

    const validFiles = fileList.filter(
      (file) => file.size <= maxSize * 1024 * 1024,
    );

    setFiles((previous) =>
      multiple ? [...previous, ...validFiles] : validFiles.slice(0, 1),
    );

    onChange?.(multiple ? validFiles : validFiles[0] || null);
  };

  const handleRemove = (index) => {
    const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);

    setFiles(updatedFiles);

    onChange?.(multiple ? updatedFiles : updatedFiles[0] || null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Box className={`w-full min-w-0 ${className}`}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background px-4 py-8 text-center transition-colors hover:border-primary hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
      >
        <FiUploadCloud size={32} style={{ color: "var(--wl-primary)" }} />

        <Typography
          sx={{
            mt: 1.5,
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-sm)",
            fontWeight: "var(--wl-weight-semibold)",
            color: "var(--wl-heading)",
          }}
        >
          {label}
        </Typography>

        <Typography
          sx={{
            mt: 0.5,
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-xs)",
            color: "var(--wl-muted)",
          }}
        >
          {helperText}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            fontFamily: "var(--wl-font-english)",
            fontSize: "var(--wl-text-xs)",
            color: "var(--wl-muted)",
          }}
        >
          Maximum file size: {maxSize} MB
        </Typography>
      </button>

      {files.length > 0 && (
        <Box className="mt-3 flex flex-col gap-2">
          {files.map((file, index) => (
            <Box
              key={`${file.name}-${index}`}
              className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface p-3"
            >
              <FiFile
                size={20}
                style={{
                  color: "var(--wl-primary)",
                  flexShrink: 0,
                }}
              />

              <Box className="min-w-0 flex-1">
                <Typography
                  noWrap
                  sx={{
                    fontFamily: "var(--wl-font-english)",
                    fontSize: "var(--wl-text-sm)",
                    fontWeight: "var(--wl-weight-medium)",
                    color: "var(--wl-text)",
                  }}
                >
                  {file.name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "var(--wl-text-xs)",
                    color: "var(--wl-muted)",
                  }}
                >
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </Typography>
              </Box>

              <IconButton
                size="small"
                onClick={() => handleRemove(index)}
                aria-label={`Remove ${file.name}`}
              >
                <FiX size={17} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default AppFileUpload;
