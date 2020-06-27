import axios from "axios";
import React from "react";
import ListItem from '@material-ui/core/ListItem';

export const searchJob = async (searchTerm) => {
    return await axios
        .post(process.env.REACT_APP_INDEEDCLONE_APP_ENDPOINT, {
            "term": searchTerm,
        })
        .then(response => {
            console.log(response.data.jobList.jobs)
            return response.data.jobList.jobs
        })
        .catch(err => {
            console.log(err)
            return ""
        })
}

export const ShowJobList = ({jobList}) => {
    const listItems = jobList.map((d) =>
        <ListItem key={d.id} >
            Title :  {d.title},       <br></br>
            Content : {d.summary}
        </ListItem>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}
