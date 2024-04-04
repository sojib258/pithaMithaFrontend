import MuiPaginatino from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  count: number;
}
const Pagination: React.FC<PaginationProps> = ({ count }) => {
  return (
    <Stack className="pagination" spacing={2}>
      <MuiPaginatino count={count} />
    </Stack>
  );
};

export default Pagination;
