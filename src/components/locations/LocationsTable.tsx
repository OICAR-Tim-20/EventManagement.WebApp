import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import locationService from '../../services/location.service';
import { Location } from '../../models/domain';

interface TableProps {
  setLocation: React.Dispatch<React.SetStateAction<Location>>
}

const LocationsTable = (props: TableProps) =>  {
  const { setLocation } = props
  const [locations, setLocations] = React.useState<Location[]>([])
  const [message, setMessage] = React.useState<string>('')

  const getAllLocations = async () => {
    await locationService.getAll()
    .then((response) => {
        setLocations(response.data)       
    })
    .catch((error) => {
        setMessage(error)
    })
  }

  React.useEffect(() => {
    getAllLocations()
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Venue</b></TableCell>
            <TableCell align="right" ><b>City</b></TableCell>
            <TableCell align="right"><b>Street</b></TableCell>
            <TableCell align="right"><b>House Number</b></TableCell>
            <TableCell align="right"><b>Zipcode</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations.map((row: Location) => (
            <TableRow
              key={row.locationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => {setLocation(row)}}
            >
              <TableCell component="th" scope="row">
                {row.venue}
              </TableCell>
              <TableCell align="right">{row.address.city}</TableCell>
              <TableCell align="right">{row.address.street}</TableCell>
              <TableCell align="right">{row.address.houseNumber}</TableCell>
              <TableCell align="right">{row.address.zipCode}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default LocationsTable