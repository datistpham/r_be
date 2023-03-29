import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { useEffect, useState } from "react";
import UpdateUser from "./updateUser";
import swal from "sweetalert";
import delete_user from "../../../../api/admin/delete_user";
import get_list_user from "../../../../api/admin/get_list_user";

export default function UserList() {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=> {
    (async()=> {
      const result= await get_list_user()
      return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "first_name",
      headerName: "Họ",
      width: 120,
    },
    { field: "last_name", headerName: "Tên", width: 120 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <UpdateUser {...params.row} setChange={setChange} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal("Thông báo", "Bạn có muốn xóa người dùng này không", {buttons: {
                  delete: "Delete",
                  cancel: "Cancel"
                }})
                .then(async value=> {
                  if(value=== "delete") {
                    await delete_user(params.row?.id)
                    handleDelete(params.row.id)
                  } 
                  else {
                    return null
                  }
                })
                
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>
  );
}