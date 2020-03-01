/* global gapi */
import React from 'react';
import './App.css';
import 'gapi';
import './components/youtube'

class App extends React.Component{
    constructor(props){
            super(props);
            this.state = {
                isSignedIn: true,
            }
            console.log(this.state.isSignedIn);
    }

    componentDidMount() {
        const successCallback = this.onSuccess.bind(this);

        window.gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: process.env.REACT_APP_CLIENT_ID,
                discoveryDocs: ['https://accounts.google.com/.well-known/openid-configuration' ],
                scope: 'https://www.googleapis.com/auth/calendar'
            }).then(() => {
                console.log('on init');
                this.setState({
                  isSignedIn: this.auth2.isSignedIn.get(),
                });
        })
      });

        window.gapi.load('signin2', function() {
          // Method 3: render a sign in button
          // using this method will show Signed In if the user is already signed in
          var opts = {
            width: 200,
            height: 50,
            client_id: process.env.REACT_APP_CLIENT_ID,
            onsuccess: successCallback
          }
          gapi.signin2.render('loginButton', opts)
        })
    }

    onSuccess() {
        console.log('on success')
        this.setState({
          isSignedIn: true,
          err: null
        })
    }

    onLoginFailed(err) {
    this.setState({
      isSignedIn: false,
      error: err,
    })
  }



    checkSignedIn () {
        if (this.state.isSignedIn){
             return ( <p>hello user, you're signed in </p>)
            // 여기에 youtube clone 을 붙이려면
            //return <div>{.}</div>


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
