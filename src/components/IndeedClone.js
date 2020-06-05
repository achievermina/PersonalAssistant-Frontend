import axios from "axios";
import {Grid, Typography} from "@material-ui/core";
import React from "react";

export const searchJob = async (searchTerm) => {
    return await axios
        .post("http://127.0.0.1:5000/indeedclone", {
            "term":searchTerm,
        })
        .then(response => {
            // console.log(response)
            return response.data.jobList.jobs
        })
        .catch(err => {
            console.log(err)
            return ""
        })
}

// export const showJobList = ({jobList}) => {
//     debugger;
//     // if (jobList === undefined) {
//     //     return null;
//     // }
//     const listOfJobs = jobList.map(job => <Grid item xs={12}><Typography variant={"title"}><b>{job.title}</b><b>{job.summary}</b> </Typography></Grid>)
//     return (
//         <Grid container spacing={2}>
//             {listOfJobs}
//         </Grid>
//     )
// }


export const showJobList = ({jobList}) => {
    // if (jobList === undefined) {
    //     return null;
    // }
    const listItems = jobList.map((d) => <li key={d.id}>{d.title}, {d.summary}</li>);

    return (
      <div>
        {listItems}
      </div>
    );
}