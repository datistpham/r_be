import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import delete_user from "../../../../api/admin/delete_user";
import get_list_staff from "../../../../api/admin/get_list_staff";
import UpdateStaff from "./UpdateStaff";
import AddStaff from "./AddStaff";
import Fuse from "fuse.js"
import { SearchBar } from "../dish/DishAdmin";

export default function StaffList() {
  const [data, setData] = useState([]);
  const [change, setChange]= useState(false)
  const [search, setSearch]= useState("")
  const [dataSearch, setDataSearch]= useState([])

  const options = {
    keys: [
      "first_name",
      "last_name",
    ]
  };
  const fuse = new Fuse(data, options);
  const handleSearch= (e)=> {
    setSearch(e.target.value)
    setDataSearch(fuse.search(search).map(({item})=> item))
    if(e.target.value?.length <= 0) {
      setDataSearch(data)
    }
  }
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  useEffect(()=> {
    (async()=> {
      const result= await get_list_staff()
      setDataSearch(result)
      return setData(result)
    })()
  }, [change])
  const columns = [
    { field: "id", headerName: "ID", width: 200, flex: 1 },
    {
      field: "first_name",
      headerName: "Họ",
      width: 120,
      flex: 1
    },
    { field: "last_name", headerName: "Tên", width: 120, flex: 1 },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      flex: 1
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            
            <UpdateStaff {...params.row} setChange={setChange} />
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                swal("Thông báo", "Bạn có muốn xóa nhân viên này không", {buttons: {
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
    <div className="userList" style={{padding: 10}}>
      <AddStaff setChange={setChange} />
      <br />
      <SearchBar search={search} handleSearch={handleSearch} />
      <br />
      <DataGrid
        rows={dataSearch}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        pagination={true}
        paginationMode="client"
      />
    </div>
  );
}