
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const data = [
  {
    "id": null,
    "categoryId": 28,
    "categoryName": "culvert",
    "phase": null,
    "standardBoqCode": "100.01",
    "systemCode": "CCEXCA.1",
    "name": "Earth",
    "structureTypeId": 19,
    "structureTypeName": "culvert",
    "unitId": 2,
    "unitName": "CUM",
    "startDate": "2017-11-20T03:32:33.000+00:00",
    "endDate": "2020-11-20T03:32:33.000+00:00",
    "totalQuantity": 4000,
    "totalMonthCount": 37,
    "MonthDataTempArr": [
        {
            "month": 10,
            "planQuantity": 1,
            "actualQuantity": "10 2017",
            "year": 2017
        },
        {
            "month": 11,
            "planQuantity": 0,
            "actualQuantity": "11 2017",
            "year": 2017
        },
        {
            "month": 0,
            "planQuantity": 0,
            "actualQuantity": "0 2018",
            "year": 2018
        },
    ]
  },
  {
    "id": null,
    "categoryId": 28,
    "categoryName": "culvert",
    "phase": null,
    "standardBoqCode": "100.01",
    "systemCode": "CCEXCA.1",
    "name": "Earth",
    "structureTypeId": 19,
    "structureTypeName": "culvert",
    "unitId": 2,
    "unitName": "CUM",
    "startDate": "2017-11-20T03:32:33.000+00:00",
    "endDate": "2020-11-20T03:32:33.000+00:00",
    "totalQuantity": 4000,
    "totalMonthCount": 37,
    "MonthDataTempArr": [
        {
            "month": 10,
            "planQuantity": 2,
            "actualQuantity": "10 2017",
            "year": 2017
        },
        {
            "month": 11,
            "planQuantity": 0,
            "actualQuantity": "11 2017",
            "year": 2017
        },
        {
            "month": 0,
            "planQuantity": 0,
            "actualQuantity": "0 2018",
            "year": 2018
        },
    ]
  },
  {
    "id": null,
    "categoryId": 28,
    "categoryName": "culvert",
    "phase": null,
    "standardBoqCode": "100.01",
    "systemCode": "CCEXCA.1",
    "name": "Earth",
    "structureTypeId": 19,
    "structureTypeName": "culvert",
    "unitId": 2,
    "unitName": "CUM",
    "startDate": "2017-11-20T03:32:33.000+00:00",
    "endDate": "2020-11-20T03:32:33.000+00:00",
    "totalQuantity": 4000,
    "totalMonthCount": 37,
    "MonthDataTempArr": [
        {
            "month": 10,
            "planQuantity": 3,
            "actualQuantity": "10 2017",
            "year": 2017
        },
        {
            "month": 11,
            "planQuantity": 0,
            "actualQuantity": "11 2017",
            "year": 2017
        },
        {
            "month": 0,
            "planQuantity": 0,
            "actualQuantity": "0 2018",
            "year": 2018
        },
    ]
  }
];

const  CustomTable = ({ data }) => {
  const months = ['NOV', 'DEC', 'JAN'];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {months.map((month) => (
              <React.Fragment key={month}>
                <TableCell colSpan={2} align="center">
                  {month}
                </TableCell>
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow>
            {months.map((month) => (
              <React.Fragment key={month}>
                <TableCell align="center">Plan Quant</TableCell>
                <TableCell align="center">Actual Quant</TableCell>
              </React.Fragment>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {item.MonthDataTempArr.map((monthData) => (
                <React.Fragment key={monthData.month}>
                  <TableCell align="center">{monthData.planQuantity}</TableCell>
                  <TableCell align="center">{monthData.actualQuantity}</TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function DynamicMonthData() {
  return (
    <div>
      <h1>Material-UI Table Example</h1>
      <CustomTable data={data} />
    </div>
  );
}
