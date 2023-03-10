import { Box, Button, Checkbox, Grid } from '@mui/material'
import React from 'react'
import numberWithCommas from '../../util/numberThousandSeparator'
import _ from "lodash"
import MenuDish from './MenuDish'

const Menu = ({item}) => {
  
  return (
    <Grid item xs={6}>
        <div style={{width: "100%", height: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: "#f00", padding: 8}}>
            <div style={{fontSize: 20, color: "#fff"}}>{item?.menu_name}</div>
            <div style={{color: "#fff"}}>{numberWithCommas(_.sumBy(JSON.parse(item?.menu_dishes), function(e) {return parseInt(e?.price)}))} VNĐ</div>
        </div>
        <img style={{width: "100%", aspectRatio: 5 / 3, objectFit: "cover"}} src={item?.menu_photo} alt="Can't open" />
        <Grid xs={12}>
            {
                JSON.parse(item?.menu_dishes)?.map((item, key)=> <MenuDish key={key} item={item} />)    
            }
        </Grid>
        <Grid xs={12} style={{background: "#555", padding: 10}}>
            <Box sx={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <Button variant={"contained"}>Chọn tất cả</Button>
                <Button color={"error"} variant={"contained"}>Xóa tất cả</Button>
            </Box>
        </Grid>
    </Grid>
  )
}

export default Menu