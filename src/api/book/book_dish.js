import axios from "axios"
import { API_URL } from "../../config"
import Cookies from "js-cookie"

const book_dish= async (dish_id, amount)=> {
    const res= await axios({
        url: API_URL+ "/api/v1/book/dish",
        method: "post",
        data: {
            dish_id,
            user_id: Cookies.get("uid"),
            amount
        }
    })
    const result= await res.data
    return result
}

export default book_dish