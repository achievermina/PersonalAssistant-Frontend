import {Grid, Typography} from "@material-ui/core";
import React from "react";

export const CalendarEventList = ({events}) => {
    if (events === undefined) {
        return null;
    }
    const listOfEvents = events.map(event => <EventListItem event={event} key={event.id}/>)
    return (
        // <Grid container spacing={2}>
        //     {listOfEvents}
        // </Grid>
        <div className="w3-twothird">
             {listOfEvents}
        </div>
    )
}

export const EventListItem = ({event}) => {
    const {summary, start} = event;
    const eventDate = new Date(start.dateTime);
    var options = { month: 'numeric', day: 'numeric', hour: 'numeric', hour12: true};
    const timeString = eventDate.toLocaleString('en-US', options);

    return (
        <Grid item xs={12}>
            <Typography variant={"title"}><b>{timeString}</b>:   <b>{summary}</b> </Typography>
        </Grid>
    )
}