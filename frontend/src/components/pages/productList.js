import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import { sort } from './utils';
import ProductListItem from './ProductListItem';

class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
			loading: true,
			list: props.list,
			list_all: props.list,
			category: [],
		};
		this.change_list = this.change_list.bind(this);
		this.trim_list = this.trim_list.bind(this);
	}

	change_list(attr, asc=true){		
		if(attr){
			this.setState({ list: sort(this.state.list, attr, asc) });
		}
	}

	trim_list(attr, text=''){
		let list_all = this.state.list_all;
		if(attr){			
			let trim_list = [];
			for(let i in list_all){
				if(list_all[i][attr] === text){
					trim_list.push(list_all[i]);
				}
			}
			this.setState({ list: trim_list });
		} else {
			this.setState({ list: list_all });
		}
	}

	componentDidMount(){
		let self = this;
		setTimeout(function(){
				let list = self.props.list;
		 		let category = [];
		 		self.setState({ loading: false });
		 		for(let i in list){
		 			if(!category.includes(list[i].Category)){
		 				category.push(list[i].Category)
		 			}
		 		}
		 		self.setState({ list: list });
				self.setState({ list_all: list });
				self.setState({ category: category });
		}, 1000);
	}
	
	render(){
		let self =this;
		let lang = this.props.lang;
		let list = this.state.list;
		return (
			<Container className="mycontainer product_list_container">
				{(() => {
					if(this.state.loading || !list){
						return (
							<Col sm={12} className="product_loading">
								<p>Loading...</p>
							</Col>
						)
					} else {
						return (
							<>
								{(() => {
									if(list.length>0){
										return(
											<>
												<Row>
													<Col sm={12}>
														<div className="product_filter">
															<Dropdown>
																<Dropdown.Toggle id="dropdown-basic1">{lang === "ro" ? 'Sorteaza' : 'Sort'}</Dropdown.Toggle>
																<Dropdown.Menu>
																	<Dropdown.Item onClick={()=>{self.change_list('Price', true)}}>
																		{lang === "ro" ? 'Pret crescator' : 'Price up'}
																	</Dropdown.Item>
																	<Dropdown.Item onClick={()=>{self.change_list('Price', false)}}>
																		{lang === "ro" ? 'Pret descrescator' : 'Price up'}
																	</Dropdown.Item>
																</Dropdown.Menu>
															</Dropdown>
															<Dropdown>
																<Dropdown.Toggle id="dropdown-basic2">Category</Dropdown.Toggle>
																<Dropdown.Menu>
																	<Dropdown.Item onClick={()=>{self.trim_list()}}>
																		{lang === "ro" ? 'Toate' : 'All'}
																	</Dropdown.Item>
																	{
																		self.state.category.map(function(item, i){
																			return <Dropdown.Item key={i} onClick={()=>{self.trim_list('Category', item)}}>{item}</Dropdown.Item>
																		})
																	}
																</Dropdown.Menu>
															</Dropdown>
														</div>
													</Col>
												</Row>	
												<Row>
													<Col sm={12}>
														<Row>
															{
																list.map(function(item, i){
																	return <ProductListItem key={i} item={item} lang={lang}></ProductListItem>
																})
															}
														</Row>
													</Col>
												</Row>
											</>
										)
									} else {
										if(lang === "ro"){
											return (
												<Col sm={12} className="product_loading">
													<p>Nu exista produse</p>
												</Col>
											);
										} else {
											return (
												<Col sm={12} className="product_loading">
													<p>No products to be displayed</p>
												</Col>
											);
										}
									}											
								})()}
							</>
						)
					}
				})()}
			</Container>
		);
	};
}

export default ProductList;