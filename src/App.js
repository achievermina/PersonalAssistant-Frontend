import React from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core'
import { SearchBar} from './components'
import {newlogin, cookielogin} from './components/UserFunction'
import {searchJob, showJobList} from './components/IndeedClone'
import {CalendarEventList} from './components/Calendar'
import {youtube, VideoList} from './components/Video'

import GoogleLogin from "react-google-login";

const SCOPES = 'profile email https://www.googleapis.com/auth/calendar'

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                User: {
                    email: '',
                    id:'',
                    name:'',
                    myToken: Cookies.get('myToken')
                },
                Videos: {
                    videos: [],
                    selectedVideo: null,
                },
                Calendar: {
                    events: [],
                },
                Jobs: [],
            }
    }

    async componentDidMount() {
        const curToken = this.state.User.myToken;
        // debugger
        if (curToken !== undefined) {
            const res =  await cookielogin(curToken)
            if(curToken === res.token){
                const curUser =  {
                    email: res.user.email,
                    id: res.user.id,
                    name:res.user.email,
                    myToken: res.token
                }
                this.handleCalendar(res.calendar)
                this.loggedIn(curToken, curUser)
            }else{
                this.onFailure();
            }
        }
    }

    loggedIn = (token, newUser)  => {
         this.setState({
            User: newUser
         })
    }

    logout = () => {
        this.setState({
            User: null
        })
    };

     responseGoogle = async (response)  =>  {
        const user = {
            email: response.profileObj.email,
            id: response.profileObj.googleId,
            name: response.profileObj.name,
            googleToken: response.tokenObj.id_token,
            accessToken: response.tokenObj.access_token,
            googleExpiresAt: response.tokenObj.expires_at,
            myToken:''
        }
        console.log(user.email, user.id, user.googleToken, user.accessToken);
        console.log(response);
        const result = await newlogin(user);
         if(result[0] === false){
             console.log("error im here");
            this.onFailure()
         }else{
             const token = result[1]
             Cookies.set('myToken', token, {expires: 7})
             const events = result[2]
             this.handleCalendar(events)
             const newStateUser = {
                    email:user.email,
                    id: user.id,
                    name:user.name,
                    myToken: token,
            }
            this.loggedIn(token, newStateUser)
             console.log(user.email, user.id, user.myToken);
        }
    }


    onFailure = () => {
        this.setState({
            User: {
                    email: '',
                    id:'',
                    name:'',
                    myToken: ''
            }
        })
    }

   handleSearchSubmit = async (searchTerm) => {
        const response = await youtube(searchTerm);
        const newVideo = {
            videos: response.data.items,
            selectedVideo: response.data.items[0]
        }
        this.setState({Videos: newVideo})
     }

   onVideoSelect = (video) => {
       window.open("https://www.youtube.com/watch?v="+video.id.videoId, "_blank")
        this.setState({selectedVideo: video})
    }

   handleIndeedClone = async (searchTerm) => {
        console.log("job Search", searchTerm)
        const jobList = await searchJob(searchTerm)
        console.log(jobList);
        //여기 이렇게 state 이용안하고 이 잡리스트를 그냥 바로 저기에 사용 할수는 없는??
        this.setState({Jobs: jobList})
    }

    handleCalendar = (calendar) => {
         console.log("get calendar events")
        const userCalendar = {
             events: calendar.items
        }
         this.setState({ Calendar: userCalendar})
        console.log(calendar.items)
    }

    render() {
         const { videos } = this.state.Videos;
         const { events } = this.state.Calendar;
         const { Jobs } = this.state;
         let content = (this.state.User.myToken !== undefined && this.state.User.myToken !== "" ) ?
            (
            <Grid justify = "center"  container spacing = {10}>
                <Grid item xs = {10}>
                    <Grid container spacing = {10}>
                        <Grid item xs = {5}>
                            <h2>Youtube</h2>
                            <SearchBar onFormSubmit={this.handleSearchSubmit}/>
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>Schedule</h2>
                            <CalendarEventList events = {events}/>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>Chatbot</h2>
                            <iframe height="430" width="500" src="https://bot.dialogflow.com/976ecf3a-8016-4dc1-8005-ffafd7f0ce82"></iframe>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>Indeed Job Search</h2>
                            <SearchBar onFormSubmit={this.handleIndeedClone}/>
                            <showJobList jobList={Jobs}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            ) :
            (
                <div>
                     <GoogleLogin
                        clientId={process.env.REACT_APP_CLIENT_ID}
                        onSuccess={this.responseGoogle}
                        onFailure={this.onFailure}
                        scope={SCOPES}
                        accessType={'offline'}
                      />
                </div>
            );
        let name = this.state.User.name;
        return(
        <div className="App">
          <header className="App-header">
            <h2>Welcome, {name}</h2>
            {content}
          </header>
        </div>
        )
    };

}
export default App;
