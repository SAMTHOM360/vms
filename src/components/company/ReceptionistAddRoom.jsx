import React from "react";
import axios from 'axios';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Header from '../Header';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Switch from '@mui/material/Switch';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MenuItem from '@mui/material/MenuItem';
import { TextField } from '@mui/material';

// import DialogContent from '@material-ui/core/DialogContent';


const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function ReceptionistAddRoom() {

    const selectedCompanyId = sessionStorage.getItem('selectedCompanyId');


    const roomDetailsUrl = `http://192.168.12.54:8080/api/room/all?id=${selectedCompanyId}`

    const addRoomUrl = `http://192.168.12.54:8080/api/room/save`

    const updateRoomUrl = `http://192.168.12.54:8080/api/room/update`

    const isActiveRoomUrl = `http://192.168.12.54:8080/api/room/isActive`






    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);



    const [openDialog, setOpenDialog] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');



    const [reload, setReload] = useState(false);


    //switch

    const [active, setActive] = useState('');
    const [editMode, setEditMode] = useState(false);




    //add room
    const [openAddRoomDialog, setOpenAddRoomDialog] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');



    // Function to handle opening the Add Room modal
    const handleOpenAddRoomDialog = () => {
        setOpenAddRoomDialog(true);
    };

    // Function to handle closing the Add Room modal
    const handleCloseAddRoomDialog = () => {
        setOpenAddRoomDialog(false);
        // setEditMode(false); 
    };



    // Function to handle changes in the room name field
    const handleRoomNameChange = (event) => {
        setRoomName(event.target.value);
    };

    // Function to handle changes in the capacity field
    const handleCapacityChange = (event) => {
        setCapacity(event.target.value);
    };


    //save room
    function handleSaveRoom() {


        const payload = {


            "roomName": roomName,
            "capacity": capacity,
            "company": {
                "id": selectedCompanyId
            }



        }

        axios.post(addRoomUrl, payload)
            .then(response => {
                handleCloseAddRoomDialog()
                setReload(!reload);
                setPage(0)
                console.log(response)

                alert('Room added')
                setRoomName('');
                setCapacity('')
            })
            .catch(error => {
                console.log(error, "error")
            })


    }


    //update room



    // Function to set room details for editing
    const handleEditRoom = (row) => {
        setRoomName(row.room);
        setCapacity(row.capacity);
        setOpenAddRoomDialog(true);
        setSelectedRoomId(row.room_Id);
        setEditMode(true);
        console.log(' blah ', row.room_Id);
    };

    function handleUpdateRoom() {


        const payload = {


            "id": selectedRoomId,
            "roomName": roomName,
            "capacity": capacity

        }

        axios
            .post(updateRoomUrl, payload)
            .then(resposne => {

                handleCloseAddRoomDialog()

                setReload(!reload);
                setPage(0)

                console.log(resposne);
            })
            .catch(error => {
                console.log(error);
            })


    }

    //delete room


    function handleDeleteRoom(row) {

        const deleteRoomUrl = `http://192.168.12.54:8080/api/room/delete?roomId=${row.room_Id}`

        // setSelectedRoomId(row.room_Id); 




        axios
            .post(deleteRoomUrl)
            .then(response => {

                handleCloseAddRoomDialog()

                setReload(!reload);
                setPage(0)
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }


    //switch room

    function handleSwitch(row) {


        const newActiveStatus = row.room_isActive ? 0 : 1; // Toggles the active status
        const payload = {
            "id": row.room_Id,
            "isActive": newActiveStatus

        }


        axios
            .post(isActiveRoomUrl, payload)
            .then(response => {

                alert('switched succesfully')

                // setActive(newActiveStatus);

                setRoomDetails(prevRoomDetails => ({
                    ...prevRoomDetails,
                    [row.room_Id]: {
                        ...prevRoomDetails[row.room_Id],
                        isActive: newActiveStatus
                    }
                }));


                setReload(!reload);
                setPage(0)


                console.log(response)
            })
            .catch(error => {
                console.log(error, "error");
            })


    }






    const [roomDetails, setRoomDetails] = useState({});
    const customRows = Object.keys(roomDetails).map((key, index) => ({
        'Sl No': index + 1,
        room_Id: roomDetails[key].id,
        room_isActive: roomDetails[key].isActive,
        room: roomDetails[key].roomName,
        status: roomDetails[key].status ? 'Available' : 'Occupied',
        capacity: roomDetails[key].capacity,
        // info: 'info',
        actions: roomDetails[key].actions,
        meetings: roomDetails[key].meetings
    }));


    const customColumns = [
        { id: 'Sl No', label: 'Sl No', minWidth: 170 },
        { id: 'room', label: 'Room Name', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 100 },
        { id: 'capacity', label: 'Capacity', minWidth: 170 },
        // { id: 'info', label: 'Info', minWidth: 170 },
        { id: 'actions', label: 'Actions', minWidth: 170 },
    ];



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };



    function calculateSerialNumber(index) {
        return index + 1 + page * rowsPerPage;
    }


    //sorting
    const customRowsOccupied = customRows.filter((row) => row.status === 'Occupied');
    const customRowsAvailable = customRows.filter((row) => row.status === 'Available');
    const sortedCustomRows = [...customRowsOccupied, ...customRowsAvailable];


    function calculateSerialNumber(rowIndex) {
        return page * rowsPerPage + rowIndex + 1;
    }



    //dialog

    const handleClickOpenDialog = (value) => {

        console.log(value, "value")

        setOpenDialog(true);
        setSelectedValue(value)


    };

    console.log(' selected value', selectedValue)

    const handleCloseDialog = (value) => {
        setOpenDialog(false);
        setSelectedValue(value);
    };









    //fetchRoomDetails function
    function fetchRoomDetails() {

        axios
            .get(roomDetailsUrl, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
            })
            .then(response => {

                response.data.data ? setRoomDetails(response.data.data) : console.log("no rooms");
                response.data.data.isActive ? setActive(response.data.data.isActive) : console.log("status")

                // console.log(response.data.data,"roomdetailsdata")

            })
            .catch((error) => {
                console.error("Error fetching data", error);
            })


    }

    useEffect(() => {

        fetchRoomDetails();

    }, [reload])





    console.log(selectedRoomId, "room")



    return (

        <Box sx={{ display: "flex", flexGrow: 1, p: 3 }}>
            <Grid container spacing={2} style={{}} >
                <Grid item xs={12} md={12} lg={12}>

                    <Paper
                        elevation={5}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            // width:'100%',
                            minHeight: '4.5em',
                            mt: '3em',
                            mb: '0.5em'
                        }}
                    >

                        <Header title="Rooms" subtitle="Add Rooms" />

                        {/* <Link to="/companyreg"> */}



                        <Button
                            onClick={handleOpenAddRoomDialog}
                            variant="contained"
                            color="primary"
                            style={{ margin: '1.2em', height: '3em' }}
                        >      Add Room
                        </Button>



                        {/* </Link> */}

                    </Paper>



                </Grid>
                <Grid item xs={12} md={12} lg={12}>

                    {/* <Paper
                        elevation={5}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            // width:'100%',
                            minHeight: '4.5em',
                            mt: '3em',
                            mb: '0.5em'
                        }}
                    >



                    </Paper> */}

                    <Paper sx={{ width: '100%' }} elevation={7}>
                        <TableContainer sx={{ height: "100%", overflow: "auto" }}>
                            <Table stickyHeader aria-label="sticky table">

                                <TableHead>

                                    <TableRow>
                                        {customColumns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ fontWeight: "bolder", fontSize: "15px" }}
                                            // style={{ top: 57, minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}


                                    </TableRow>
                                </TableHead>




                                <TableBody>
                                    {sortedCustomRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, rowIndex) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                                                    {customColumns.map((column) => {
                                                        const value = row[column.id];
                                                        return (

                                                            <>
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.id === 'Sl No' ? calculateSerialNumber(rowIndex) : (
                                                                        column.id === 'actions' ?

                                                                            <div style={{ gap: "30px" }}>
                                                                                <EditIcon
                                                                                    style={{ fontSize: "20px", color: "", marginTop: "5px", cursor: "pointer", color: "blue" }}
                                                                                    onClick={() => handleEditRoom(row)}

                                                                                />
                                                                                {/* <DeleteIcon
                                                                        style={{ fontSize: "20px", color: "", marginTop: "5px", cursor: "pointer",color:"purple" }}
                                                                        onClick={()=> handleDeleteRoom(row)}

                                                                    /> */}


                                                                                <Switch
                                                                                    sx={{ fontSize: "10px" }}
                                                                                    {...label}

                                                                                    // defaultChecked={active} 

                                                                                    defaultChecked={row.room_isActive}

                                                                                    onClick={() => handleSwitch(row)}


                                                                                // onClick={handleSwitch}
                                                                                // defaultChecked={company.active}
                                                                                // onChange={() => {
                                                                                //     const newActiveStatus = !company.active;
                                                                                //     handleSwitchToggle(company.id, newActiveStatus);

                                                                                //     // Update the local state with the new active status
                                                                                //     const updatedCompanies = companies.map(c => {
                                                                                //         if (c.id === company.id) {
                                                                                //             return { ...c, active: newActiveStatus };
                                                                                //         }
                                                                                //         return c;
                                                                                //     });
                                                                                //     setCompanies(updatedCompanies);
                                                                                // }}
                                                                                />



                                                                            </div>

                                                                            : row[column.id])
                                                                    }
                                                                </TableCell>
                                                            </>


                                                        );
                                                    })}
                                                </TableRow>



                                            );
                                        })}
                                </TableBody>


                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[15, 20, 25]}
                            component="div"
                            count={customRows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />


                    </Paper>


                    <Dialog open={openAddRoomDialog} onClose={handleCloseAddRoomDialog}>
                        <DialogTitle>Add Room</DialogTitle>
                        <DialogContent>


                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <TextField
                                    label="Room Name"
                                    value={roomName}
                                    onChange={handleRoomNameChange}
                                    // fullWidth
                                    variant="outlined"
                                    margin="normal"
                                />
                                {/* Capacity field */}
                                <TextField
                                    label="Capacity"
                                    value={capacity}
                                    onChange={handleCapacityChange}
                                    // fullWidth

                                    variant="outlined"
                                    margin="normal"
                                />

                            </div>





                        </DialogContent>
                        {/* <DialogActions> */}

                        <div style={{ display: "flex", justifyContent: "space-between", margin: "15px" }}>
                            <Button onClick={handleCloseAddRoomDialog} color="primary" variant="contained">
                                Cancel
                            </Button>

                            {!editMode && (
                                <Button onClick={handleSaveRoom} color="primary" variant="contained">
                                    Add
                                </Button>

                            )

                            }


                            {editMode && (
                                <Button onClick={handleUpdateRoom} color="primary" variant="contained">
                                    Update
                                </Button>

                            )}

                            {/* <Button onClick={room ? () => handleUpdateRoom(selectedRoomId) : handleSaveRoom} color="primary" variant="contained">
                            {selectedRoomId ? "Update" : "Add"}
                        </Button> */}



                        </div>

                        {/* </DialogActions> */}
                    </Dialog>



                </Grid>




            </Grid>

        </Box>

    )

}