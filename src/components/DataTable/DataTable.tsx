import * as React from 'react';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { server_calls } from '../../api'; // ADD THIS
import { useGetData } from '../custom-hooks'; // ADD THIS
import { Button,Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from '@material-ui/core'; // ADD THESE
import { DroneForm } from '../../components/DroneForm'; // ADD THIS

interface gridData{
  data:{
    id?:string;
  }
}
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'Car Make', headerName: 'Car Make', width: 200 },
  { field: 'Car Model', headerName: 'Car Model', width: 200 },
  {
    field: 'Year',
    headerName: 'Year',
    type: 'number',
    width: 120,

  },
  { field: 'Color', headerName: 'Color', width: 200 },
  { field: 'Price', headerName: 'Price', width: 200 },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: ValueGetterParams) =>
  //       `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  //   },
];

const rows = [
  { id: 1, lastName: 'Shabo', firstName: 'Rony', age: 29 },
  { id: 2, lastName: 'Mousou', firstName: 'Tima', age: 57 },
  { id: 3, lastName: 'Shabo', firstName: 'Youssef', age: 45 },
  { id: 4, lastName: 'Shabo', firstName: 'Laila', age: 27 },
  { id: 5, lastName: 'Hamo', firstName: 'Lilan', age: 23 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 75 },
  { id: 7, lastName: 'Kayali', firstName: 'Yasser', age: 29 },
  { id: 8, lastName: 'Maamo', firstName: 'Hassan', age: 30 },
  { id: 9, lastName: 'Roxie', firstName: '', age: 65 },
];

export const DataTable =  () => {
  
  let { droneData, getData } = useGetData();
  let [open, setOpen] = React.useState(false);
  let [gridData, setData] = React.useState<gridData>({data:{}})

  let handleOpen = () => {
    setOpen(true)
  }

  let handleClose = () => {
    setOpen(false)
  }

  let deleteData = () => {
    server_calls.delete(gridData.data.id!)
    getData()
  }
  console.log(gridData.data.id)

    return (
        <div style={{ height: 400, width: '100%' }}>
          <h2>Cars In Inventory</h2>
          <DataGrid rows={droneData} columns={columns} pageSize={5} checkboxSelection onRowSelected = { setData } />

        <Button onClick={handleOpen}>Update</Button>
        <Button variant="contained" color="secondary" onClick={deleteData}>Delete</Button>

          {/*Dialog Pop Up begin */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Cars</DialogTitle>
          <DialogContent>
            <DialogContentText>Update Car</DialogContentText>
              <DroneForm id={gridData.data.id!}/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {handleClose} color="primary">Cancel</Button>
            <Button onClick={handleClose} color = "primary">Done</Button> 
          </DialogActions>
        </Dialog>
        </div>
      );
}