/* global gapi */
import React from 'react';
import './App.css';
import 'gapi';
import axios from 'axios';

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                isSignedIn: false,
                User: {
                    email: '',
                    uniqueId:'',
                    name:'',
                    accessToken:'',
                    idToken: '',
                    expires_at:'',
                }
            }
    }

    componentDidMount() {
        const successCallback = this.onSuccess.bind(this);

        window.gapi.load('auth2', () => {
            var auth2 =  gapi.auth2.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                discoveryDocs: ['https://accounts.google.com/.well-known/openid-configuration'],
                scope: 'https://www.googleapis.com/auth/calendar'//,'openid', 'profile', 'email']
            }).then((auth2) => {
                // 여길 어떻게 이쁘게 할수 있을거 같은데
                this.setState({
                    isSignedIn: auth2.isSignedIn.get(),
                });

                if (this.state.isSignedIn) {
                    var currentUser = auth2.currentUser.get();
                    const User = {
                        email: currentUser.Qt.zu,
                        uniqueId: currentUser.Qt.SU,
                        name: currentUser.Qt.Ad,
                        accessToken: currentUser.uc.access_token,
                        idToken: currentUser.uc.id_token,
                        expires_at: currentUser.uc.expires_at,
                    };
                    this.setState({User: User});
                    this.checkRegister(User);
                }

            });
        });

        window.gapi.load('signin2', function () {
            var opts = {
                width: 200,
                height: 50,
                client_id: process.env.REACT_APP_CLIENT_ID,
                onsuccess: successCallback
            }
            gapi.signin2.render('loginButton', opts)
        });
    }



        onSuccess()
        {
            console.log('on success')
            this.setState({
                isSignedIn: true,
                err: null
            })
        }

        onLoginFailed(err)
        {
            this.setState({
                isSignedIn: false,
                error: err,
            })
        }



    checkSignedIn () {
        if (this.state.isSignedIn){
            return <p>hello user, you're signed in </p>
        } else {

            return (
                <div className="App">
                    <header className="App-header">
                        <p>You are not signed in. Click here to sign in.</p>
                        <button id="loginButton">Login with Google</button>
                    </header>
                </div>
            )
        }
    }

    checkRegister (User) {
      // Headers
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      // Request Body
      const body = JSON.stringify(User);
      console.log(body);
      debugger;
      try {
        const res = axios.post('https://localhost:8000/', body, config);

      } catch (err) {
         console.log(err.response.data);
      }
    };



    render() {
        return(
        <div className="App">
          <header className="App-header">
            <h2>Sample App.</h2>
            {this.checkSignedIn()}
          </header>
        </div>
        )
    };

}
export default App;
