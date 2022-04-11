import React from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';

class ProductListItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			item: props.item,
			lang: props.lang,
			product_img_style: {}
		};
		this.add_cart = this.add_cart.bind(this);  
	}

	add_cart(info) {
        window.location.href = '/items/' + info;
	}

	componentDidMount(){
		let bg = this.state.item.Img;
		if(typeof bg === "undefined" || bg === "null" || bg === null || bg === ""){
			bg = "";
		}
		let product_img_style = {
			background: 'url('+bg+')',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			backgroundRepeat: 'no-repeat'
		}
		this.setState({ product_img_style: product_img_style });
	}
	
	render(){
		let self = this;		
		let lang = this.props.lang;
		let button_text = "See product";
		if(lang === "ro"){
			button_text = "Vezi produs";
		}
        let item = this.props.item;
		return (
			<Col xs={12} sm={6} md={4} lg={3}>
				<div className="product_container">
					<div style={self.state.product_img_style} className="product_img">
						{(() => {
							if(typeof item.Discount !== "undefined" && item.Discount !== null){
								if(item.Discount>0){
									return(
										<div className="product_info_discount">
											<p>{item.Discount}%</p>
										</div>
									)
								}
							}
						})()}
						{(() => {
							if(typeof item.Color !== "undefined" && item.Color !== "null" && item.Color !== null && item.Color !== "" ){
								if(item.Color.length>0){
									return(
										<div className="product_info_color">
											{
												item.Color.map(function(item, i){
													return <div key={i} style={{'background': item}} className={'color color_'+item}></div>
												})
											}
										</div>
									)
								}
							}
						})()}
					</div>
					{(() => { 
						if(typeof item.Quantity !== "undefined" && item.Quantity !== null){
							if(item.Quantity > 0){
								return(
									<div className='product_img_hover'>
										<Button className="button_color" type="button" onClick={()=>{self.add_cart(item.ID)}}>{button_text}</Button>
									</div>
								)
							}
						}
					})()}
					<div className="product_info">
						{(() => {
							if(typeof item.Name !== "undefined" && item.Name !== "null" && item.Name !== null && item.Name !== ""){
								return(
									<div className="product_info_name">
										<h4>{item.Name}</h4>
									</div>
								)
							}
						})()}
						{(() => {
							if(typeof item.Price !== "undefined" && item.Price !== null){
								if(item.Discount>0){
									let new_price = item.Price - item.Price * item.Discount/100;
									return(
										<div className="product_info_price">
											<p className="old_price">{item.Price}</p>
											<p className="new_price">{new_price}</p>
										</div>
									)
								} else {
									return(
										<div className="product_info_price">
											<p className="price">{item.Price}</p>
										</div>
									)
								}
							}
						})()}
						{(() => {
							if(typeof item.Quantity !== "undefined" && item.Category !== null){
								if(item.Quantity === 0){
									return(
										<div className="product_info_category text-end">
											{(() => {
												if(lang === "ro"){
													return <h6 className="text-red">Nu mai e in stoc</h6>
												} else {
													return <h6 className="text-red">Out of stock</h6>
												}
											})()}
										</div>
									)
								} else if(item.Quantity<10){
									return(
										<div className="product_info_category text-end">
											{(() => {
												if(lang === "ro"){
													return <h6 className="text-red">Doar {item.Quantity} in stoc</h6>
												} else {
													return <h6 className="text-red">Only {item.Quantity} in stock</h6>
												}
											})()}
										</div>
									)
								} else {
									return(
										<div className="product_info_category text-end">
											{(() => {
												if(lang === "ro"){
													return <h6 className="text-green">Este in stoc</h6>
												} else {
													return <h6 className="text-green">It is in stock</h6>
												}
											})()}
										</div>
									)
								}
							}
						})()}
					</div>
				</div>
			</Col>
		)
	}
}

export default ProductListItem;