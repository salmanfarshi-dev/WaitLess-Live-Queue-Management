import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function AppTable({
  columns = [],
  rows = [],
  loading = false,
  emptyMessage = "No data available",
  getRowId,
  onRowClick,
  size = "medium",
  stickyHeader = false,
  className = "",
}) {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      className={`w-full min-w-0 overflow-x-auto ${className}`}
      sx={{
        border: "1px solid var(--wl-border)",
        borderRadius: "var(--wl-radius-md)",
        backgroundColor: "var(--wl-surface)",
        boxShadow: "none",
      }}
    >
      <Table size={size} stickyHeader={stickyHeader}>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "var(--wl-background)",
              "& th": {
                backgroundColor: "var(--wl-background)",
                color: "var(--wl-muted)",
                fontFamily: "var(--wl-font-english)",
                fontSize: "var(--wl-text-xs)",
                fontWeight: "var(--wl-weight-bold)",
                whiteSpace: "nowrap",
                borderBottom: "1px solid var(--wl-border)",
              },
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align={column.align || "left"}
                sx={{ minWidth: column.minWidth || "auto" }}
              >
                {column.headerName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length || 1}
                align="center"
                sx={{
                  py: 5,
                  color: "var(--wl-muted)",
                  fontFamily: "var(--wl-font-english)",
                  fontSize: "var(--wl-text-sm)",
                }}
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length || 1}
                align="center"
                sx={{
                  py: 5,
                  color: "var(--wl-muted)",
                  fontFamily: "var(--wl-font-english)",
                  fontSize: "var(--wl-text-sm)",
                }}
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow
                key={getRowId ? getRowId(row) : row._id || row.id || rowIndex}
                hover={Boolean(onRowClick)}
                onClick={() => onRowClick?.(row)}
                sx={{
                  cursor: onRowClick ? "pointer" : "default",
                  "& td": {
                    color: "var(--wl-text)",
                    fontFamily: "var(--wl-font-english)",
                    fontSize: "var(--wl-text-sm)",
                    borderBottom: "1px solid var(--wl-border)",
                  },
                  "&:last-child td": {
                    borderBottom: 0,
                  },
                }}
              >
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || "left"}>
                    {column.render
                      ? column.render(row[column.field], row)
                      : (row[column.field] ?? "—")}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AppTable;
