import React from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import { apicall, getCookie } from './utils';
import OrderSummary from './partials/orderSummary';
import Total from './partials/total';
import $ from 'jquery';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
            cart_list: null,
		};
        this.get_discount = this.get_discount.bind(this);  
	}

	componentDidMount(){
        let cart_list = [];
        if(getCookie('app_cart_list')){
            cart_list = JSON.parse(getCookie('app_cart_list'));
        }
        this.setState({cart_list : cart_list});
	}

    get_discount(){
        let text = $('#coupon_input').val();
        apicall('/getDiscount', 'POST', {text}).then(function(data){
            console.log('get_discount', data)
        });
    }
	
	render(){	
        let self = this;	
		let lang = self.props.lang;
		return (
            <>
                <Navigation language={self.language} lang={lang}></Navigation>
                <div className="mycontainer cart_page_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>{lang === "ro" ? 'Cos' : 'Cart'}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                <Row>
                                    <Col sm={12}>
                                        <OrderSummary lang={lang} cart_list={self.state.cart_list}></OrderSummary>
                                    </Col>
                                </Row>                                    
                                </Col>
                                <Col sm={4}>
                                    <Row>
                                        <Col sm={12}>
                                            <div className="box coupon_container">
                                                <div className="coupon_box">
                                                    {lang === "ro" ? <p>Ai un cupon?</p> : <p>Do you have a coupon?</p>}
                                                    <input id="coupon_input" type="text" className='input_black'></input>
                                                    <Button onClick={()=>{self.get_discount()}} type="button" className="button_color">
                                                        {lang === "ro" ? <span>Adauga</span> : <span>Add</span>}
                                                    </Button>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={12}>
                                            <Total lang={lang} cart_list={self.state.cart_list}></Total>
                                        </Col>
                                        <Col sm={12}>
                                            <div className="payment_container">
                                                <div className="payment">
                                                    <a href="/" className="button_color">
                                                        {lang === "ro" ? <span>Continua cumparaturile</span> : <span>Continue shopping</span>}
                                                    </a>
                                                    <a href="/checkout" className="button_color">
                                                        {lang === "ro" ? <span>Finalizeaza plata</span> : <span>Checkout</span>}
                                                    </a>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
		)
	}
}

export default Cart;