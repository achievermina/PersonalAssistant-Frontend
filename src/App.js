import React from 'react';
import './App.css';
import Cookies from 'js-cookie';
import {Grid} from '@material-ui/core'
import GoogleLogin from "react-google-login";
import List from "@material-ui/core/List";
import Button from '@material-ui/core/Button';

import {SearchBar} from './Components/'
import {newlogin, cookielogin} from './Components/UserFunction'
import {searchJob, ShowJobList} from './Components/IndeedClone'
import {CalendarEventList} from './Components/Calendar'
import {youtube, VideoList} from './Components/Video'

const SCOPES = 'profile email https://www.googleapis.com/auth/calendar'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChatbotClicked: false,
            User: {
                email: '',
                id: '',
                name: '',
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
        if (curToken !== undefined) {
            const res = await cookielogin(curToken)
            if (curToken === res.token) {
                if(Cookies.get('schedule') !== undefined) {
                    this.handleCalendar(JSON.parse(Cookies.get("schedule")).events)
                    const curUser = {
                        email: res.user.email,
                        id: res.user.id,
                        name: res.user.email,
                        myToken: res.token
                    }
                    this.loggedIn(curToken, curUser)
                } else {
                    Cookies.remove('myToken')
                }
            } else {
                this.onFailure();
            }
        }
    }

    loggedIn = (token, newUser) => {
        this.setState({
            User: newUser
        })
    }

    logout = () => {
        this.setState({
            User: null
        })
    };

    responseGoogle = async (response) => {
        const user = {
            email: response.profileObj.email,
            id: response.profileObj.googleId,
            name: response.profileObj.name,
            googleExchangeToken: response.tokenObj.id_token,
            googleAccessToken: response.tokenObj.access_token,
            googleExpiresAt: response.tokenObj.expires_at,
            myToken: ''
        }
        const result = await newlogin(user);
        if (result[0] === false) {
            this.onFailure()
        } else {
            const token = result[1]
            Cookies.set('myToken', token, {expires: 1})
            const events = result[2]
            this.handleCalendar(events.items)
            const newStateUser = {
                email: user.email,
                id: user.id,
                name: user.name,
                myToken: token,
            }
            this.loggedIn(token, newStateUser)
        }
    }

    onFailure = () => {
        this.setState({
            User: {
                email: '',
                id: '',
                name: '',
                myToken: '',
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
        window.open("https://www.youtube.com/watch?v=" + video.id.videoId, "_blank")
        this.setState({selectedVideo: video})
    }

    handleIndeedClone = async (searchTerm) => {
        console.log("job Search", searchTerm)
        const jobList = await searchJob(searchTerm)
        this.setState({Jobs: jobList})
    }

    handleCalendar = (calendarItems) => {
        const userCalendar = {
            events: calendarItems
        }
        this.setState({Calendar: userCalendar})
        Cookies.set('schedule', JSON.stringify(userCalendar), {expires: 1})
    }

    render() {
        const {videos} = this.state.Videos;
        const {events} = this.state.Calendar;
        const {Jobs} = this.state;
        // debugger;
        let content = (this.state.User.myToken !== undefined && this.state.User.myToken !== "") ?
            (
                <div style={{padding: 20, alignContent: "center", backgroundColor: "#ffc46b"}}>
                    <Grid container spacing={12}>
                        <Grid item xs={6} direction="column" spacing={12} style={{height: '90vh'}}>
                            <div item className={'grid1'}>
                                <h2>Youtube</h2>

                                <div style={{display: 'inline-block', width: '60%'}}>
                                    <SearchBar onFormSubmit={this.handleSearchSubmit}/>
                                </div>
                                <VideoList videos={videos} onVideoSelect={this.onVideoSelect}/>
                            </div>
                            <div item className={'grid1'}>
                                <h2>Indeed Job Search</h2>

                                <div style={{display: 'inline-block', width: '60%'}}>
                                    <SearchBar onFormSubmit={this.handleIndeedClone}/>
                                </div>
                                <List style={{width: "40"}}>
                                    <ShowJobList jobList={Jobs}/>
                                </List>
                            </div>
                        </Grid>


                        <Grid container item xs={6}>
                            <Grid container item direction="column">
                                <h2 style={{textAlign: "center"}}>Schedule</h2>
                                <CalendarEventList events={events} width={"12px"}/>
                            </Grid>
                        </Grid>


                        {this.state.isChatbotClicked ? (<div className={"chatbot"}>
                                <Button variant="contained" color="primary" onClick={() => {
                                    this.setState({isChatbotClicked: false})
                                }}>
                                    ChatBot
                                </Button>
                                <iframe height="800" width="500"
                                        src="https://bot.dialogflow.com/976ecf3a-8016-4dc1-8005-ffafd7f0ce82"></iframe>
                            </div>)
                            : (<div className={'chatbot'}><Button variant="contained" color="primary" onClick={() => {
                                this.setState({isChatbotClicked: true})
                            }}>
                                ChatBot
                            </Button></div>)}


                    </Grid>
                </div>

            ) :
            (
                <div style={{padding: 400, alignContent: "center", backgroundColor: "#ffc46b"}}>
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
        return (

            <div className="App">
                <header className="App-header">
                    <h2>Welcome, {name}</h2>
                </header>
                {content}

            </div>
        )
    };

}

export default App;
