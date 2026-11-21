import { Pagination, Stack } from "@mui/material";

function AppPagination({
  page = 1,
  count = 1,
  onChange,
  color = "primary",
  size = "medium",
  shape = "rounded",
  disabled = false,
  siblingCount = 1,
  boundaryCount = 1,
  className = "",
}) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={`w-full min-w-0 ${className}`}
    >
      <Pagination
        page={page}
        count={count}
        onChange={(_, value) => onChange?.(value)}
        color={color}
        size={size}
        shape={shape}
        disabled={disabled}
        siblingCount={siblingCount}
        boundaryCount={boundaryCount}
        sx={{
          "& .MuiPaginationItem-root": {
            fontFamily: "var(--wl-font-english)",
            fontWeight: "var(--wl-weight-medium)",
            color: "var(--wl-text)",
            borderRadius: "var(--wl-radius-md)",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--wl-primary)",
            color: "var(--wl-surface)",
          },
          "& .MuiPaginationItem-root.Mui-selected:hover": {
            backgroundColor: "var(--wl-primary-dark)",
          },
        }}
      />
    </Stack>
  );
}

export default AppPagination;
