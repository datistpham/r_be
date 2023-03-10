import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import get_list_dish from "../../api/menu/get_list_dish";
import Header from "../Header/Header";
import ReactPaginate from "react-paginate";

const Menu = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_list_dish();
      return setData(result);
    })();
  }, []);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 8);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % data.length;
    setItemOffset(newOffset);
  };

  
  return (
    <>
      <Header />
      <Box sx={{ padding: 1 }}>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </Box>
    </>
  );
};

export default Menu;
