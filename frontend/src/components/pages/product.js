import React from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { apicall, getCookie, setCookie} from './utils';
import $ from 'jquery'; 
import Review from './partials/review';
import Carousel from './partials/carousel';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            list: props.list,
			lang: props.lang,
            item: null,
            size: props.lang === "ro" ? 'Marime' : 'Size',
            color: props.lang === "ro" ? 'Culoare' : 'Color',
		};
        this.add_cart = this.add_cart.bind(this);  
        this.add_wishlist = this.add_wishlist.bind(this);  
        this.handleSelect_size = this.handleSelect_size.bind(this);  
        this.handleSelect_color = this.handleSelect_color.bind(this);  
        this.handleSelect_qty = this.handleSelect_qty.bind(this);  
	}

    add_cart(id){
        let self = this;
        let size = self.state.size;
        let color = self.state.color;
        let qty = $('.product_page_quantity input').val();
        let add_cart = true;

        $('#error_size').hide();
        $('#error_color').hide();
        $('#error_qty').hide();

        if(size === "Marime" || size === "Size"){
            $('#error_size').show();
            add_cart = false;
        }
        if(color === "Culoare" || color === "Color"){
            $('#error_color').show();
            add_cart = false;
        }
        if(typeof qty === "undefined" || qty === "null" || qty === null || qty === ""){
            $('#error_qty').show();
            add_cart = false;
        }

        if(add_cart){
            let cart_list = [];
            if(getCookie('app_cart_list')){
                cart_list = JSON.parse(getCookie('app_cart_list'));
            }

            let exist_cart = false;
            for(let i in cart_list){
                if(cart_list[i].id === id && cart_list[i].color === color&& cart_list[i].size === size){
                    //already exists in cart -> then update cart
                    exist_cart = true;
                    cart_list[i].qty = cart_list[i].qty + parseInt(qty);
                    break;
                }
            }

            if(!exist_cart){
                //product is new
                let price = self.state.item.Price;
                if(self.state.item.Discount>0){
                    price = price - price * self.state.item.Discount/100;
                }

                let item = {id: id, img:self.state.item.Img, name:self.state.item.Name, price:price, qty:parseInt(qty), color:color, size:size}            
                cart_list.push(item);
            }
            
            const myJSON = JSON.stringify(cart_list);
            setCookie("app_cart_list", myJSON, 1);
        }        
    }

    add_wishlist(id){
        let wish_list = [];
        if(getCookie('app_wish_list')){
            wish_list = JSON.parse(getCookie('app_wish_list'));
        }

        let exist_wish = false;
        for(let i in wish_list){
            if(wish_list[i].id === id){
                //already exists in wishlist
                exist_wish = true;
                break;
            }
        }

        if(!exist_wish){
            //product is new
            let size = this.state.size;
            let color = this.state.color;
            if(size === "Marime" || size === "Size"){
                if(this.state.item.Size.length>0){
                    size = this.state.item.Size[0];
                } else {
                    size = null;
                }
            }
            if(color === "Culoare" || color === "Color"){
                if(this.state.item.Color.length>0){
                    color = this.state.item.Color[0];
                } else {
                    color = null;
                }
            }
            let item = {id: id, color:color, size:size}
            wish_list.push(item)
            const myJSON = JSON.stringify(wish_list);
            setCookie("app_wish_list", myJSON, 1);
        }
    }

    handleSelect_size(e){
        this.setState({size : e});
    }
    handleSelect_color(e){
        this.setState({color : e});
    }
    handleSelect_qty(x) {        
        let min = x.target.min;
        let max = x.target.max;
        let value = parseInt(x.target.value);
        if (value>max) {
            x.target.value = max;
        } else if (value<min) {
            x.target.value = min;
        }
    }

	componentDidMount(){
        let self = this;
        var url = window.location.href.split('/items/');
        let product = url[url.length-1];
		apicall('/items/'+product, 'GET').then(function(data){
            self.setState({item: JSON.parse(data)});
        });
        $(document).ready(function(){
            $(".nav-tabs li").click(function(a){
                let tab = $(this).attr('tab')
                $('.product_page_info .nav-tabs>li').removeClass('active');
                $(this).addClass('active');
                if(tab){
                    $('.tab-content>.tab-pane').removeClass('in show active')
                    $('#'+tab).addClass('in show active')
                }
            });
        });
	}
	
	render(){		
		let list = this.props.list;
        let lang = this.props.lang;
        let item = this.state.item;
		return (
            <>
                <Navigation language={this.language} lang={lang}></Navigation>
                <div className="mycontainer product_page_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">                            
                            {(() => {
                                if(item){
                                    return(
                                        <>
                                            <Row>
                                                <Col sm={6} md={4}>
                                                    <div className="product_page_img">
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
                                                        <img alt={"product_"+item.Name} src={item.Img}></img>                                                        
                                                    </div>                                                    
                                                </Col>
                                                <Col sm={6} md={8}>
                                                    <Row>
                                                        <Col sm={12}>
                                                            <div className="product_page_title">
                                                                <h2>{item.Name}</h2>
                                                            </div> 
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
                                                        </Col>
                                                        <Col sm={12}>
                                                            <div className="product_page_review">
                                                                <Review lang={lang} item={item}></Review>
                                                            </div>
                                                        </Col>
                                                        <Col sm={12}>
                                                            <div className="product_page_category">
                                                                <p>
                                                                    {lang === "ro" ? <span>Categorie: </span> : <span>Category: </span>}
                                                                    <span>{item.Category}</span>
                                                                </p>
                                                            </div>
                                                        </Col>
                                                        <Col sm={12}>
                                                            <div className="product_page_description_short">
                                                                <p>{item.Description_short}</p>
                                                            </div> 
                                                        </Col>
                                                    </Row>
                                                     <Row>
                                                        <Col sm={12} md={4} lg={3}>
                                                            <div className="product_page_size">
                                                                <DropdownButton
                                                                    title={this.state.size}
                                                                    id="dropdown-basic1"
                                                                    className="dropdown_color"
                                                                    onSelect={this.handleSelect_size}
                                                                        >
                                                                            {
                                                                            item.Size.map(function(x, i){
                                                                                return (
                                                                                    <Dropdown.Item eventKey={x} key={i}>
                                                                                        {x}
                                                                                    </Dropdown.Item>
                                                                                )
                                                                            })
                                                                        }   
                                                                </DropdownButton>
                                                                <p id="error_size" className="text-red">{lang === "ro" ? 'Adauga marime' : 'Add size'}</p>                                  
                                                            </div> 
                                                        </Col>
                                                        <Col sm={12} md={4} lg={3}>
                                                            <div className="product_page_color">                                                                
                                                                <DropdownButton
                                                                    title={this.state.color}
                                                                    id="dropdown-basic2"
                                                                    className="dropdown_color"
                                                                    onSelect={this.handleSelect_color}
                                                                        >
                                                                            {
                                                                                item.Color.map(function(x, i){
                                                                                    return (
                                                                                        <Dropdown.Item eventKey={x} key={i}>
                                                                                            <div style={{'background': x}} className={"color color_"+x}></div>
                                                                                        </Dropdown.Item>
                                                                                    )
                                                                                })
                                                                            } 
                                                                </DropdownButton> 
                                                                <p id="error_color" className="text-red">{lang === "ro" ? 'Adauga culoare' : 'Add color'}</p>                                  
                                                            </div> 
                                                        </Col>
                                                        <Col sm={12} md={4} lg={3}>
                                                            <div className="product_page_quantity">  
                                                                <input placeholder={lang === "ro" ? "Cant." : "Qty"} className="input_black" type="number" min="1" max={item.Quantity} onInput={this.handleSelect_qty}></input>
                                                                <p id="error_qty" className="text-red">{lang === "ro" ? 'Adauga cant.' : 'Add qty'}</p>                                  
                                                            </div> 
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={12} md={8} lg={6}>
                                                            <div className="product_page_add_cart" onClick={()=>this.add_cart(item.ID)}>
                                                                <Button className="button_color" type="button">
                                                                    {lang === "ro" ? <p>Adauga in cos</p> : <p>Add to cart</p>}    
                                                                </Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col sm={12} md={8} lg={6}>
                                                            <div className="product_page_add_wishlist" onClick={()=>this.add_wishlist(item.ID)}>
                                                                <Button className="button_color" type="button">Wishlist</Button>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={12}>
                                                    <div className="product_page_info">
                                                        <ul className="nav nav-tabs">    
                                                            <li className="active" tab="description"><span>Description</span></li>
                                                            <li tab="additional_information"><span>Additional information</span></li>
                                                            <li tab="reviews"><span>Reviews</span></li>
                                                        </ul>
                                                        <div className="tab-content">
                                                            <div id="description" className="tab-pane fade in active show">
                                                                <div className="scroll">
                                                                    <h4>Description</h4>
                                                                    <p>{item.Description_long}</p>
                                                                </div>                                                                
                                                            </div>
                                                            <div id="additional_information" className="tab-pane fade">
                                                                <div className="scroll">
                                                                    <h4>Additional information</h4>
                                                                    <p>2Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                                                </div>
                                                            </div>
                                                            <div id="reviews" className="tab-pane fade">
                                                                <div className="scroll">
                                                                    <h4>Reviews</h4>
                                                                    <p>3Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={12}>
                                                    <div className="product_page_related_products">
                                                        <h3>Related products</h3>
                                                        {list ? <Carousel template={"related_products"} lang={lang} list={list} category={item.Category}></Carousel> : <div>Loading...</div>}
                                                    </div>                                                    
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                } else {
                                    return(
                                        <Row>
                                            <Col sm={12}>
                                                {lang === "ro" ? <p>Nu exista produsul cu acest nume.</p> : <p>There is no product with this name.</p>}                                                
                                            </Col>
                                        </Row>
                                    )
                                }
						    })()}                            
                        </Col>
                    </Row>
                </div>
            </>
		)
	}
}

export default Product;