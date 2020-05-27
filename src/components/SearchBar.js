import React from 'react';
import { Paper, TextField } from "@material-ui/core";
import {youtube} from "./UserFunction";

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    }

    handleChange = (event) => this.setState({searchTerm:event.target.value})
    handleSubmit = (event) => {
        console.log("checking youtube")
        const { searchTerm } = this.state;
        const { onFormSubmit } = this.props;
        console.log(searchTerm)
        // const response = await youtube(searchTerm);
        onFormSubmit(searchTerm)
        // console.log(response);

        event.preventDefault();

    }

    render() {
        return(
            <Paper elevation={2} style={{padding:'10px'}}>
                <form onSubmit ={this.handleSubmit}>
                    <TextField fullWidth label={"Search the video"}  onChange={this.handleChange}/>
                </form>
            </Paper>
    )
    }
}
export default SearchBar;


