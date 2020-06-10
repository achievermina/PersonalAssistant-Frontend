import React from 'react';
import { Paper, TextField } from "@material-ui/core";

class SearchBar extends React.Component {
    state = {
        searchTerm: '',
    }

    handleChange = (event) => this.setState({searchTerm:event.target.value})
    handleSubmit = (event) => {
        const { searchTerm } = this.state;
        const { onFormSubmit } = this.props;
        console.log(searchTerm)
        onFormSubmit(searchTerm)

        event.preventDefault();
    }
    render() {
        return(
            <Paper elevation={2} style={{padding:'10px'}}>
                <form onSubmit ={this.handleSubmit}>
                    <TextField fullWidth label={"Search word"}  onChange={this.handleChange}/>
                </form>
            </Paper>
        )
    }
}
export default SearchBar;


