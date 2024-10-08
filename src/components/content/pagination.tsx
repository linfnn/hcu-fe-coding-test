import { Pagination } from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../contextAPI";

export const PaginationSection = ({ total }: any) => {
  const { page, changePage, toggleReGetting } = useContext(ModalContext);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    changePage(value);
    toggleReGetting();
    console.log(value);
  };
  return (
    <Pagination
      count={Math.ceil(total / 5)}
      page={page}
      onChange={handleChange}
      className="flex justify-center"
    />
  );
};
