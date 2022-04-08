import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import $ from 'jquery';

class Search extends React.Component {
	constructor(props) {
		super(props);
        this.submit = this.search.bind(this);     
        this.search = this.search.bind(this);     
	}

    submit(){
        if($('#search_input').val() !== ""){
            this.search($('#search_input').val());
        }
    }
    search(text){
        console.log('search--> ', text)
    }

    render(){
        return (
            <Form className="search_container">
                <input id="search_input" type="text" placeholder="Search"></input>
                <Button id="search_button" type="submit" onClick={this.submit}><i className="fa fa-search"></i></Button>            
            </Form>
        );
    };
}

export default Search;