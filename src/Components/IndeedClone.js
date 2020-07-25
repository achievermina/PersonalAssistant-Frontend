import axios from "axios";
import React from "react";
import ListItem from '@material-ui/core/ListItem';

export const searchJob = async (searchTerm) => {
    var letters = /^[A-Za-z]+$/;
    if(searchTerm.match(letters)) {
        return await axios
            .post(process.env.REACT_APP_INDEEDCLONE_APP_ENDPOINT, {
                "term": searchTerm,
            })
            .then(response => {
                return response.data.jobList.jobs
            })
            .catch(err => {
                console.log(err)
                return ""
            })
    }
    console.warn("Please use English and search again")
    return []
}

export const ShowJobList = ({jobList}) => {
    const listItems = jobList.map((d) =>
        <ListItem key={d.id} alignItems={"flex-start"} style={{flexDirection:'column'}}>
            Title :  {d.title}, <br></br>
             Location : {d.location}, <br></br>
             <a style={{display:'inline-block'}} href={`https://www.indeed.com/jobs?q=Full Time&l=Brooklyn%2C NY&start=20&advn=3056737823750295&vjk=${d.id}`} target="_blank">LINK</a>
        </ListItem>
    );
    return (
        <div>
            {listItems}
        </div>
    );
}
