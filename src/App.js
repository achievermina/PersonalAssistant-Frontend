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
                // isSignedIn: false,//localStorage.getItem('myToken') ? true : false,
                User: {
                    email: '',
                    id:'',
                    name:'',
                    myToken: Cookies.get('myToken')
                }
            }
    }

    componentDidMount() {
            //우리서버에 확인
            //local storage 에서 마이토큰 가져와 -> 우리서버에 넘겨서 로그인되어있는지(토큰을 받아서 JWT 유효한지 확인)
            if (this.state.User.myToken !== undefined) {
                const user = cookielogin(this.state.User)
                this.loggedIn(user.myToken, user)
            } //else {
            //     //
            // }
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


    //////// 질문.
    // responseGoogle = (response)  => {
    //     debugger
    //     const user = {
    //         email: response.profileObj.email,
    //         id: response.profileObj.googleId,
    //         googleToken: response.tokenObj.id_token,
    //         myToken:''
    //     }
    //     console.log(user.email, user.id, user.googleToken);
    //     console.log(response);
    //
    //     // newlogin(user)
    //     const request = axios.post("http://127.0.0.1:5000/login", {
    //         googleToken: user.googleToken,
    //         email: user.email,
    //         myToken: user.myToken
    //     })
    //     console.log(user.email, user.id, user.myToken);
    //
    //     request.then(response => {
    //         debugger;
    //         if (response.data.ok == false) {
    //             throw new Error("response undefined")
    //             this.loginUser([undefined, undefined])
    //         }
    //         Cookies.set('myToken', response.data.myToken, {expires: 7})
    //         this.loginUser([response.data.user, response.data.myToken])
    //     }).catch(error => console.error(error))
    // }
    //
    // loginUser = (result) => {
    //     debugger
    //
    //     const loggedInUser = result[0]
    //     const token = result[1]
    //     if (token == undefined) {
    //         console.log("error im here")
    //         this.onFailure()
    //     } else {
    //         const newStateUser = {
    //                 email:loggedInUser["email"],
    //                 id:loggedInUser["id"],
    //                 name:loggedInUser["name"],
    //                 myToken: token
    //         }
    //         this.loggedIn(token, newStateUser)
    //         // console.log(user.email, user.id, user.myToken);
    //     }
    // }


    onFailure = () => {
        this.setState({
            // isSignedIn: false,
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
         let content = (this.state.User.myToken !== undefined) ?
        // let content = !!this.state.isSignedIn ?  // this.state.User.myToken !== undefined
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
