// import mobiscroll from '@mobiscroll/react';
// import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import {Grid} from "@material-ui/core";
import React from "react";
import {VideoItem} from "./Video";

let API_KEY = '<YOUR_API_KEY>';
let CLIENT_ID = '<YOUR_CLIENT_ID>';
//
// var CALENDAR_ID = 'en.hungarian#holiday@group.v.calendar.google.com';
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
// const now = new Date();
// let calApiLoaded;
// let firstDay = new Date(now.getFullYear(), now.getMonth() - 1, -7);
// let lastDay = new Date(now.getFullYear(), now.getMonth() + 2, 14);
//
// class App extends React.Component {
// 	constructor(props) {
//         super(props);
//
//         this.state = {
//             events: []
//         };
//     }
//
//     componentDidMount() {
//          // Load the Google API Client
// 		window.onGoogleLoad = () => {
// 			window.gapi.load('client', this.initClient);
// 		}
//         this.loadGoogleSDK();
//     }
//
//     // Load the SDK asynchronously
//     loadGoogleSDK = () => {
//         (function (d, s, id) {
//             var js, fjs = d.getElementsByTagName(s)[0];
//             if (d.getElementById(id)) {
//                 onGoogleLoad();
//                 return;
//             }
//             js = d.createElement(s);
//             js.id = id;
//             js.src = "https://apis.google.com/js/api.js?onload=onGoogleLoad";
//             js.onload = "onGoogleLoad";
//             fjs.parentNode.insertBefore(js, fjs);
//         }(document, 'script', 'google-jssdk'));
//     };
//
//     // Init the Google API client
//     initClient = () => {
//         window.gapi.client.init({
//             apiKey: API_KEY,
//             clientId: CLIENT_ID,
//             discoveryDocs: DISCOVERY_DOCS,
//             scope: SCOPES
//         }).then(() => {
//             calApiLoaded = true;
//             this.loadEvents(firstDay, lastDay);
//         });
//     }
//
//     // Load events from Google Calendar between 2 dates
//     loadEvents = (firstDay, lastDay) => {
//         // Only load events if the Google API finished loading
//         if (calApiLoaded) {
//             window.gapi.client.calendar.events.list({
//                 'calendarId': CALENDAR_ID,
//                 'timeMin': firstDay.toISOString(),
//                 'timeMax': lastDay.toISOString(),
//                 'showDeleted': false,
//                 'singleEvents': true,
//                 'maxResults': 10,
//                 'orderBy': 'startTime'
//             }).then((response) => {
//                 let event;
//                 let events = response.result.items;
//                 let eventList = [];
//                 // Process event list
//                 for (var i = 0; i < events.length; ++i) {
//                     event = events[i];
//                     eventList.push({
//                         start: event.start.date || event.start.dateTime,
//                         end: ((new Date(event.end.date) - new Date(event.start.date)) / 86400000 == 1 ? '' : event.end.date) || event.end.dateTime,
//                         text: event.summary || 'No Title',
//                     });
//                 }
//                 // Pass the processed events to the calendar
//                 this.setState({ events: eventList });
//             });
//         }
//     }
//
//     onPageLoading = (event, inst) => {
//         const year = event.firstDay.getFullYear();
//         const month = event.firstDay.getMonth();
//
//          // Calculate dates
//         // (pre-load events for previous and next months as well)
//         firstDay = new Date(year, month - 1, -7);
//         lastDay = new Date(year, month + 2, 14);
//
//         this.loadEvents(firstDay, lastDay);
//     }
//
//     render() {
//         return (
//             <mobiscroll.Eventcalendar
//                 theme="ios"
//                 themeVariant="light"
//                 display="inline"
//                 view={{
//                     calendar: {
//                         labels: true
//                     }
//                 }}
//                 data={this.state.events}
//                 onPageLoading={this.onPageLoading}
//             />
//         );
//     }
// }


export const CalendarEventList = ({calendar}) => {
    // debugger
    // const listOfVideos = videos.map((video, id) => <VideoItem onVideoSelect={onVideoSelect} key={id} video={video} />)
    return (
        <Grid container spacing={2}>
            {calendar}
        </Grid>
    )
}