import React, { useState, useEffect } from "react";
import { DeleteOutline } from "@material-ui/icons";
import swal from "sweetalert";
import { DataGrid } from "@material-ui/data-grid";
import delete_menu from "../../../../api/menu/delete_menu";
import UpdateDish from "./UpdateDish";
import AddDish from "./AddDish";
import get_dish from "../../../../api/dish/get_dish";
import delete_dish from "../../../../api/dish/delete_dish";
import { Image } from "antd";

const DishAdmin  = () => {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  useEffect(() => {
    (async () => {
      const result = await get_dish();
      return setData(result);
    })();
  }, [change]);
  const handleDelete= (id)=> {
    setData(data?.filter(item=> item?.id !== id))
  }
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "dish_name",
      headerName: "Tên món ăn",
      width: 200,
    },
    { field: "dish_description", headerName: "Mô tả", width: 250 },
    { field: "dish_price", headerName: "Giá", width: 200 },
    {
      field: "image_dish",
      headerName: "Hình ảnh menu",
      width: 200,
      renderCell: (params)=> {
        return (
          <Image src={params.row?.image_dish} alt="" />
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UpdateDish {...params.row} setChange={setChange} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal("Thông báo", "Bạn có muốn xóa món ăn này không", {
                  buttons: {
                    delete: "Delete",
                    cancel: "Cancel",
                  },
                }).then(async (value) => {
                  if (value === "delete") {
                    await delete_dish(params.row?.id);
                    handleDelete(params.row.id);
                  } else {
                    return null;
                  }
                });
              }}
            />
          </>
        );
      },
    },
  ];
  return <div className={"home"} style={{ padding: 20 }}>
    <AddDish setChange={setChange} />
    <br />
    <div className="userList" style={{height: 500}}>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>

  </div>;
};

export default DishAdmin;
