import {Grid, Paper, Typography} from "@material-ui/core";
import React from "react";

export const CalendarEventList = ({events}) => {
    // debugger;
    // const listOfEvents = null;
    if (events === undefined) {
        return null;
    }
    const listOfEvents = events.map(event => <EventListItem event={event} key={event.id}/>)
    return (
        <Grid container spacing={2}>
            {listOfEvents}
        </Grid>
    )
}

export const EventListItem = ({event}) => {
    const {summary, start} = event;
    return (
        <Grid item xs={12}>
            <Typography variant={"title"}><b>{summary}</b><b>{start.dateTime}</b></Typography>
        </Grid>
    )
}