import { Card } from '@material-ui/core'
import React from 'react'
import { Typography } from '@material-ui/core';
import './infoBox.css'
import { prettyPrintStat } from '../../util/util'

const infoBox = (props) => {
    return (
        // if the active property is true add info-box--selected class
        <Card className={`info-box ${props.active && "info-box--selected"} ${
            props.isRed && "info-box--red"
          }`} 
          onClick={props.onClick}>
            <Typography className="info-box__title" color="textSecondary">
                {props.title}
            </Typography>
            <h3 className={`info-box__cases ${!props.isRed && "info-box__cases--green"}`}>{prettyPrintStat(props.cases)}</h3>
            <Typography className="info-box__total">
                {prettyPrintStat(props.total)} Total
            </Typography>

        </Card>
    )
}

export default infoBox
