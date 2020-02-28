/* global gapi */
import React from 'react';
import './App.css';
import 'gapi';


class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                isSignedIn: false,
            }
            console.log(this.state.isSignedIn);
    }

    componentDidMount() {
        const successCallback = this.onSuccess.bind(this);

        window.gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                discoveryDocs: ['https://accounts.google.com/.well-known/openid-configuration'],
                scope: 'https://www.googleapis.com/auth/calendar' //'openid', 'profile', 'email',
            }).then(() => {
                console.log('on init');
                this.setState({
                    isSignedIn: this.auth2.isSignedIn.get(),
                });
                //console.log(this.auth2.getAuthResponse())
                var googleUser = this.auth2.currentUser.get()
                //      GoogleAuth = gapi.auth2.getAuthInstance();
                document.querySelector('#name').innerText = JSON.stringify(googleUser)
                console.log(this.auth2.currentUser.get());

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
