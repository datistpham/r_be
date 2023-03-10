import { Checkbox, Grid } from '@mui/material'
import React from 'react'
import numberWithCommas from '../../util/numberThousandSeparator'

const MenuDish = ({item}) => {
    
  return (
    <Grid xs={12}>
        <div style={{width: '100%', display: "flex", height: 50, justifyContent: "space-between", alignItems: "center"}}>
            <div style={{fontSize: 18, fontWeight: 600}}>{item?.dish_name}</div>
            <div style={{display: "flex", alignItems: "center"}}>
                <div style={{display: "flex", alignItems: "center", color: "#f00", fontSize: 18, fontWeight: 600}}>
                    {numberWithCommas(parseInt(item?.price))} VNĐ
                </div>
                <Checkbox placeholder={"Chọn món này"} />
            </div>
        </div>
    </Grid>
  )
}

export default MenuDish