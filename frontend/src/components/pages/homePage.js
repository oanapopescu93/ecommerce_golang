import React from 'react';
import Navigation from './partials/navbar';
import ProductList from './productList';

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
			lang_change: props.lang_change,
			list: props.list,
		};
		this.language = this.language.bind(this);     
	}

	language(text) {
		this.state.lang_change(text);
	}
	
	render(){
		let lang = this.props.lang;
		let list = this.props.list;
		return (
			<>
				<Navigation language={this.language} lang={lang}></Navigation>
				<ProductList list={list} lang={lang}></ProductList>	
			</>
		);
	};
}

export default HomePage;