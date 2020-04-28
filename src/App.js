import React from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core'
import { SearchBar} from './components'
import {newlogin, cookielogin} from './components/UserFunction'
import {searchJob} from './components/IndeedClone'

import GoogleLogin from "react-google-login";


import MainTemplate from './components/MainTemplate'
import axios from "axios";

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                User: {
                    email: '',
                    id:'',
                    name:'',
                    myToken: Cookies.get('myToken')
                }
            }
    }

    async componentDidMount() {
        const curToken = this.state.User.myToken;
        if (curToken !== undefined) {
            const res =  await cookielogin(curToken)
            debugger
            if(curToken == res.token){
                const curUser =  {
                    email: res.user.email,
                    id: res.user.id,
                    name:res.user.email,
                    myToken: res.token
                }
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
        console.log(user.email, user.id, user.googleToken);
        console.log(response);

        const result = await newlogin(user)
         if(result[0] == false){
             console.log("error im here");
            this.onFailure()
         }else{
             const token = result[1]
              Cookies.set('myToken', token, {expires: 7})
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
        console.log("handle search submit")
        // const response = await youtube.get('search',{
        //     params: {
        //         part: 'snippet',
        //         maxResults: 5,
        //         key: process.env.YOUTUBE_KEY,
        //         q:searchTerm
        //     }
        // });
        // console.log(response.data.items);
        //
        // this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
    }

   handleIndeedClone = async (searchTerm) => {
        console.log("job Search")
       debugger;
        const jobList = await searchJob(searchTerm)
    }

    render() {
         let content = (this.state.User.myToken !== undefined && this.state.User.myToken !== "" ) ?
            (
            <Grid justify = "center"  container spacing = {10}>
                <Grid item xs = {10}>
                    <Grid container spacing = {10}>
                        <Grid item xs = {5}>
                            <SearchBar onFormSubmit={this.handleSearchSubmit}/>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>item2</h2>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>item3</h2>
                        </Grid>
                        <Grid item xs = {5}>
                            <h2>IndeedClone</h2>
                            <SearchBar onFormSubmit={this.handleIndeedClone}/>
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
                        scope = 'https://www.googleapis.com/auth/calendar'
                        accessType={'offline'}
                      />
                </div>
            );

        return(
        <div className="App">
          <header className="App-header">
            <h2>Sample App.</h2>
            {content}
          </header>
        </div>
        )
    };

}
export default App;
