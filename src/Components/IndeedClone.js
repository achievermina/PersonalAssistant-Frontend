import axios from "axios";
import {Grid, Typography} from "@material-ui/core";
import React from "react";

export const searchJob = async (searchTerm) => {
    return await axios
        .post(process.env.REACT_APP_INDEEDCLONE_APP_ENDPOINT, {
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

export const ShowJobList = ({jobList}) => {
    const listItems = jobList.map((d) => <li key={d.id}>{d.title}, {d.summary}</li>);
    return (
      <div>
        {listItems}
      </div>
    );
}