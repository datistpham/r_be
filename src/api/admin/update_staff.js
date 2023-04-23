const { default: axios } = require("axios")
const { API_URL } = require("../../config")

const update_staff= async (first_name, last_name, email)=> {
    const res= await axios({
        url: API_URL+ "/api/v3/staff/update",
        method: "post",
        data: {
            first_name, last_name, email
        }
    })
    const result= await res.data

    return result
}

export default update_staff