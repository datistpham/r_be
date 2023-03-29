import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
const DetailDish = React.lazy(() => import('./DetailDish'));

export default function SearchItemMenu(props) {
  const [open, setOpen]= React.useState(false)
  const [dishId, setDishId]= React.useState(undefined)
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        onChange={(e, value)=> {
            setOpen(()=> true)
            setDishId(value.dish_id)
        }}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        getOptionLabel={(option) => option.dish_name}
        options={props?.data}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm món ăn"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
        <React.Suspense fallback={<></>}>
            <DetailDish open={open} setOpen={setOpen} dishId={dishId} />
        </React.Suspense>
    </Stack>
  );
}
