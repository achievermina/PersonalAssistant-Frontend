import {Typography} from "@material-ui/core";
import React from "react";

export const CalendarEventList = ({events}) => {
    if (events === undefined) {
        return null;
    }
    const listOfEvents = events.map(event => <EventListItem event={event} key={event.id}/>)
    return (
        <div className="w3-twothird" >
             {listOfEvents}
        </div>
    )
}

export const EventListItem = ({event}) => {
    console.log(event)
    const {summary, start} = event;
    try{
        var eventDate = new Date(start.dateTime);
        var options = { month: 'numeric', day: 'numeric', hour: 'numeric', hour12: true};
        var timeString = eventDate.toLocaleString('en-US', options);
    } catch (e) {
        return (
             <li style={{padding: '12px', backgroundColor:'#e6ae8f',textAlign:'left', lineHeight:'40px', paddingLeft:'12px', borderRadius:'8px', listStyleType:'circle', marginBottom:'8px'}} >
            </li>
        )
    }
    return (
        <li style={{padding: '12px', backgroundColor:'#e6ae8f',textAlign:'left', lineHeight:'40px', paddingLeft:'12px', borderRadius:'8px', listStyleType:'circle', marginBottom:'8px'}} >
            <Typography variant={"title"}><b>{timeString}</b>:   <b>{summary}</b> </Typography>
        </li>
    )
}
