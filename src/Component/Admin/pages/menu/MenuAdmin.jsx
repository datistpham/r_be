import React, { useState, useEffect } from "react";
import get_menu from "../../../../api/menu/get_menu";
import UpdateMenu from "./UpdateMenu";
import { DeleteOutline } from "@material-ui/icons";
import swal from "sweetalert";
import { DataGrid } from "@material-ui/data-grid";
import AddMenu from "./AddMenu";
import delete_menu from "../../../../api/menu/delete_menu";
import { Image } from "antd";

const MenuAdmin = () => {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  useEffect(() => {
    (async () => {
      const result = await get_menu();
      return setData(result);
    })();
  }, [change]);
  const handleDelete= (id)=> {
    setData(data?.filter(item=> item?.id !== id))
  }
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "menu_name",
      headerName: "Tên menu",
      width: 200,
    },
    { field: "menu_description", headerName: "Mô tả", width: 250 },
    {
      field: "menu_photo",
      headerName: "Hình ảnh menu",
      width: 200,
      renderCell: (params)=> {
        return (
          <Image src={params.row?.menu_photo} alt="" />
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
            <UpdateMenu {...params.row} setChange={setChange} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal("Thông báo", "Bạn có muốn xóa menu này không", {
                  buttons: {
                    delete: "Delete",
                    cancel: "Cancel",
                  },
                }).then(async (value) => {
                  if (value === "delete") {
                    await delete_menu(params.row?.id);
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
    <AddMenu setChange={setChange} />
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

export default MenuAdmin;
