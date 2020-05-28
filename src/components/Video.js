import React from 'react';
import {Grid,Typography,Paper } from '@material-ui/core';
import axios from "axios";


export const youtubeBase =  axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: process.env.REACT_APP_YOUTUBE_KEY,
    }
})

export const youtube = async (term) => {
    return await youtubeBase.get( 'search',{
        params: {
            part: 'snippet',
            maxResults: 5,
            key: process.env.REACT_APP_YOUTUBE_KEY,
            q:term
        }
    }).then(response => response
    ).catch(err => {
        console.log(err);
        return ""
    })
}

export const VideoList = ({videos, onVideoSelect}) => {
    const listOfVideos = videos.map((video, id) => <VideoItem onVideoSelect={onVideoSelect} key={id} video={video} />)
    return (
        <Grid container spacing={2}>
            {listOfVideos}
        </Grid>
    )
}

export const VideoItem = ({video, onVideoSelect}) => {
    // debugger
    return (
        <Grid item xs={12}>
            <Paper style={{display:'flex', alignItems:'center', cursor:'pointer'}} onClick={() => onVideoSelect(video)}>
                <img style={{ marginRight:'20px' }} alt={"thumbnail"} src={video.snippet.thumbnails.medium.url}/>
                {/*<img style={{ marginRight:'15px', width:'4px'}} alt={"thumbnail"} src={video.snippet.thumbnails.medium.url}/>*/}
                <Typography variant={"subtitle1"}><b>{video.snippet.title}</b></Typography>
            </Paper>
        </Grid>

    )
}
