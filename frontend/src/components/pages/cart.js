import React from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import { getCookie } from './utils';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
            cart_list: null,
		};
	}

	componentDidMount(){
        let cart_list = [];
        if(getCookie('app_cart_list')){
            cart_list = JSON.parse(getCookie('app_cart_list'));
        }
        this.setState({cart_list : cart_list});
	}
	
	render(){		
		let lang = this.props.lang;
        let cart_list = this.state.cart_list;
		return (
            <>
                <Navigation language={this.language} lang={lang}></Navigation>
                <div className="mycontainer cart_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>Cart</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={8}>
                                    {(() => {
                                        console.log('cart_list', cart_list);
                                        if(typeof cart_list !== "undefined" && cart_list !== "null" && cart_list !== null && cart_list !== ""){
                                            return(
                                                <Row>
                                                    {
                                                        cart_list.map(function(x, i){
                                                            console.log('cart_list', i, x);
                                                            return (
                                                                <Col sm={12 }key={i}>
                                                                    <Row>
                                                                        <Col sm={4}>
                                                                            <img alt="" src=""></img>
                                                                        </Col>
                                                                        <Col sm={4}>
                                                                            <h4>{x.name}</h4>
                                                                            <h6>
                                                                                <span>{lang === "ro" ? 'Marime' : 'Size'}: {x.size} </span> 
                                                                                <span>{lang === "ro" ? 'Culoare' : 'Color'}: {x.color} </span>
                                                                            </h6>
                                                                        </Col>
                                                                        <Col sm={4}>
                                                                            <h4>{x.name}</h4>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            )
                                                        })
                                                    } 
                                                </Row>
                                            )
                                        } else {
                                            return (
                                                <div>Loading...</div>
                                            )
                                        }
                                    })()}
                                </Col>
                                <Col sm={4}>
                                    <div className="got_to_checkout">
                                        <div className="coupon_container">
                                            {lang === "ro" ? <p>Ai un cupon?</p> : <p>Do you have a coupon?</p>}
                                            <div className="coupon">
                                                <input type="text"></input>
                                                <Button type="button">
                                                    {lang === "ro" ? <span>Adauga</span> : <span>Add</span>}
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="payment_container">
                                            <div className="payment">
                                            </div>
                                        </div>
                                    </div>
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