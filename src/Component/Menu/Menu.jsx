import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import get_list_dish from "../../api/menu/get_list_dish";
import Header from "../Header/Header";
// import ReactPaginate from "react-paginate";
import { Image, Typography } from "antd";
import numberWithCommas from "../util/numberThousandSeparator";
import SearchItemMenu from "./Search";
import { Button } from "antd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import book_dish from "../../api/book/book_dish";
import Swal from "sweetalert2";
import { AppContext } from "../../App";
const { Title } = Typography;

const Menu = () => {
  const { auth } = useContext(AppContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await get_list_dish();
      return setData(result);
    })();
  }, []);
  const navigate = useNavigate();
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 8;
  // eslint-disable-next-line
  const currentItems = data.slice(itemOffset, endOffset);
  // eslint-disable-next-line
  const pageCount = Math.ceil(data.length / 8);
  // eslint-disable-next-line
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 8) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Header />
      <Box sx={{ padding: 1 }}>
        <Grid container padding={2}>
          <SearchItemMenu data={data} />
        </Grid>
        <Grid container width={"100%"} spacing={2} padding={2}>
          {data?.map((item, key) => (
            <Grid key={key} item xs={4}>
              <Box
                style={{
                  width: "100%",
                  padding: 10,
                  background: "#fff",
                  borderRadius: 10,
                }}
              >
                <Image
                  width={"100%"}
                  style={{
                    borderRadius: 10,
                    aspectRatio: 1 / 1,
                    objectFit: "cover",
                  }}
                  src={item?.image_dish}
                />
                <Box
                  sx={{
                    width: "100%",
                    flexDirection: "row",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title level={4}>{item?.dish_name}</Title>
                  <Title level={4} style={{ color: "red" }}>
                    {numberWithCommas(item?.dish_price)}đ
                  </Title>
                </Box>
                <Button
                  onClick={async () => {
                    const { value: text } = await Swal.fire({
                      input: 'text',
                      inputLabel: "Số luọng",
                      inputPlaceholder: "Nhập số lượng món cần đặt",
                      inputAttributes: {
                        'aria-label': 'Type your message here'
                      },  
                      showCancelButton: true,
                    });

                    if (text) {
                      if (auth === true) {
                          const result = await book_dish(
                            item?.dish_id, parseInt(text)
                          )
                            .then(() => {
                              swal(
                                "Thông báo",
                                "Đặt món thành công",
                                "success",
                                {
                                  buttons: {
                                    ok: "Xem hóa đơn",
                                    cancel: "Đóng",
                                  },
                                }
                              ).then((value) => {
                                if (value === "ok") {
                                  navigate("/");
                                } else {
                                  return null;
                                }
                              });
                            })
                            .catch(() => {
                              swal("Thông báo", result?.message, "error");
                            });
                        }
                        else {
                          swal("Thông báo", "Bạn cần đăng nhập để tiếp tục", "error")

                        }
                    }
                    else {
                      swal("Thông báo", "Bạn cần nhập số lượng món cần đặt", "error")
                    }
                  }}
                  icon={<ShoppingCartIcon />}
                  type={"primary"}
                  style={{
                    fontSize: 18,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 16,
                  }}
                >
                  Đặt món
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        /> */}
      </Box>
    </>
  );
};

export default Menu;
