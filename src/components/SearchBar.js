import React from 'react';
import { Paper, TextField } from "@material-ui/core";

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    }

    // handleChange = (event) => this.setState({searchTerm:event.target.value})
    handleSubmit = (event) =>{
        console.log("kkk")
        // const { searchTerm } = this.state;
        // const { onFormSubmit } = this.props;
        //
        // onFormSubmit(searchTerm);
        //
        // event.preventDefault();

    }

    render() {
        return(
            <Paper elevation={2} style={{padding:'10px'}}>
                <form onSubmit ={this.handleSubmit}>
                    <TextField fullWidth label={"Search the video"} />
                </form>
            </Paper>
    )
    }
}
export default SearchBar;