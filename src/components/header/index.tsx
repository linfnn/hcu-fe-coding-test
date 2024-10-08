import { Typography } from "@mui/material";
import { FilterSection } from "./filterSection/filterSection";
export const Header = () => {
  return (
    <div className="flex justify-between items-center px-[50px] py-5 h-[10%] max-[600px]:px-[30px] max-[520px]:block  max-[520px]:py-2">
      <Typography variant="h5">TODO LIST</Typography>
      <div className="max-[520px]:px-[10px] ">
        <FilterSection />
      </div>
    </div>
  );
};
