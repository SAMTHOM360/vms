import React from 'react';
import {useState,useEffect} from 'react';
import Switch from "@mui/material/Switch";
import EditIcon from "@mui/icons-material/Edit";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function CustomRows({row,rowIndex,customColumns,label,handleEditRoom,calculateSerialNumber,handleSwitch}){

    const [checked, setChecked] = React.useState(row.room_isActive);

    React.useEffect(()=>{
        setChecked(row.room_isActive)
    }, [row])
    return(

        <>
          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={rowIndex}
                          >
                            {customColumns.map((column, index) => {
                              const value = row[column.id];
                            
                              return (
                                <>
                                  <TableCell
                                    key={index}
                                    align={column.align}
                                  >
                                    {column.id === "Sl No" ? (
                                      calculateSerialNumber(rowIndex)
                                    ) : column.id === "actions" ? (
                                      <div style={{ gap: "30px" }}>
                                        <EditIcon
                                          style={{
                                            fontSize: "20px",
                                            color: "",
                                            marginTop: "5px",
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                          onClick={() => handleEditRoom(row)}
                                        />

                                        <Switch
                                          sx={{ fontSize: "10px" }}
                                          {...label}
                                          // defaultChecked={active}
                                          checked={checked}
                                        //   defaultChecked={row.room_isActive}
                                          onClick={() => handleSwitch(row)}
                                        onChange={(e)=> setChecked(e.target.checked)}
                                        />
                                      </div>
                                    ) : (
                                      row[column.id]
                                    )}
                                  </TableCell>
                                </>
                              );
                            })}
                          </TableRow>
        </>
    )
}