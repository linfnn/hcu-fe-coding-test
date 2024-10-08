import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { useContext } from "react";
import { ModalContext } from "../../contextAPI";
export const FilterSection = () => {
  const { condition, changePage, toggleCondition, toggleReGetting } =
    useContext(ModalContext);
  const handleFilter = (value: string) => {
    toggleCondition(value);
    changePage(1);
    toggleReGetting();
  };

  return (
    // sx={{ minWidth: 240 }}
    <Box className="w-[200px] max-md:w-28">
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Status
        </InputLabel>
        <NativeSelect
          variant="outlined"
          defaultValue={condition}
          inputProps={{
            name: "Status",
            id: "uncontrolled-native",
          }}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="true">Completed</option>
          <option value="false">Incomplete</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};
