/* global gapi */
import React from 'react';
import './App.css';
import 'gapi';
import Cookies from 'js-cookie';
import {login} from './components/UserFunction'
import GoogleLogin from "react-google-login";

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                isSignedIn: false,//localStorage.getItem('token') ? true : false,
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
            if (this.state.User.myToken) {
                const token = login(this.state.User)
                this.loggedIn(token)
            }
    }

    loggedIn = (token)  => {
         this.setState({
            isSignedIn: true,
            token: token,
            user: null
         })
    }

    logout = () => {
        this.setState({
            isSignedIn: false,
            token: '',
            user: null})
    };

    responseGoogle = (response)  => {
        const user = {
            email: response.Qt.zu,
            id: response.Qt.SU,
            // googleToken: response.uc,
            token:''
        }
        console.log(user.email, user.id, user.token);
        console.log(response);

        const token = login(user)
        if (token.Empty) {
            console.log("error im here")
            console.log(user.email, user.id, user.token);
            this.onFailure()
        } else {
            this.loggedIn(token)
            console.log(user.email, user.id, user.token);
        }
    }

    onFailure = () => {
        this.setState({
            isSignedIn: false,
        })
    }

    render() {
        let content = !!this.state.isSignedIn ?
            (
                <div>
                    <p>Authenticated</p>
                    <button onClick={this.logout} className="button">
                        Log out
                    </button>

                </div>
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
