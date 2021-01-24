import React from 'react'
import './table.css'
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core'
import numeral from 'numeral'

const table = ({ countries }) => {
    //console.log("props : ", countries)
    return (
        <TableContainer className="table">
            <Table>
                <TableHead>
                    <TableRow>
                        {/* <TableCell align="center">NAME</TableCell> */}
                        <TableCell><strong>SR.</strong></TableCell>
                        <TableCell><strong>NAME</strong></TableCell>
                        <TableCell><strong>CASES&nbsp;</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {countries.map(({ country, cases }, index) => ()) */}
                    {countries.map(({ name, cases }, index) => (
                        <TableRow key={index}>
                            <TableCell>{index}</TableCell>
                            <TableCell>{name}</TableCell>
                            <TableCell><strong>{numeral(cases).format("0,0")}</strong></TableCell>
                        </TableRow >
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default table
