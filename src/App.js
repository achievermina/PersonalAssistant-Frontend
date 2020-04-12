import React from 'react';
import './App.css';
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core'
import { SearchBar} from './components'
import {login} from './components/UserFunction'
import {searchJob} from './components/IndeedClone'

import GoogleLogin from "react-google-login";


import MainTemplate from './components/MainTemplate'

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                isSignedIn: false,//localStorage.getItem('myToken') ? true : false,
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
            if (this.state.User.myToken != "undefined") {
                const token = login(this.state.User)
                this.loggedIn(token)
            }
    }

    loggedIn = (token, newUser)  => {
         this.setState({
            isSignedIn: true,
            User: newUser
         })
    }

    logout = () => {
        this.setState({
            isSignedIn: false,
            myToken: '',
            user: null})
    };

    responseGoogle = (response)  => {
        debugger
        const user = {
            email: response.profileObj.email,
            id: response.profileObj.googleId,
            googleToken: response.tokenObj.id_token,
            myToken:''
        }
        console.log(user.email, user.id, user.googleToken);
        console.log(response);

        const result = login(user)
        debugger

        const loggedInUser = result[0]
        const token = result[1]
        if (token == undefined) {
            console.log("error im here")
            console.log(user.email, user.id, user.myToken);
            this.onFailure()
        } else {
            const newStateUser = {
                    email:loggedInUser["email"],
                    id:loggedInUser["id"],
                    name:loggedInUser["name"],
                    myToken: token
            }
            this.loggedIn(token, newStateUser)
            console.log(user.email, user.id, user.myToken);
        }
    }

    onFailure = () => {
        this.setState({
            isSignedIn: false,
        })
    }

   handleSearchSubmit = (searchTerm) => {
        console.log("handle search submit")
        // const response = await youtube.get('search',{
        //     params: {
        //         part: 'snippet',
        //         maxResults: 5,
        //         key: '[YOUTUBE KEY]',
        //         q:searchTerm
        //     }
        // });
        // console.log(response.data.items);
        //
        // this.setState({videos: response.data.items, selectedVideo: response.data.items[0]});
    }

   handleIndeedClone = (searchTerm) => {
        console.log("handle search submit")
        const jobList = searchJob(searchTerm)
    }

    render() {
        let content = !!this.state.isSignedIn ?
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
