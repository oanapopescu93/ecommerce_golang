import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import $ from 'jquery';

class Address extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
        this.checkout_next = this.checkout_next.bind(this);  
    }

    checkout_next(){
        this.props.checkout_next(2);
    }

	render(){		
		let lang = this.props.lang;
        let address_placeholder = {
            first_name: "First Name",
            second_name: "Second Name",
            phone: "Phone number",
            address: "Address",
            country: "Country",
            city: "City",
            zip: "Zip code"
        }
        if(lang === "ro"){
            address_placeholder.first_name = "Prenume";
            address_placeholder.second_name = "Nume";
            address_placeholder.phone = "Numar telefon";
            address_placeholder.address = "Adresa";
            address_placeholder.country = "Tara";
            address_placeholder.city = "Oras";
            address_placeholder.zip = "Cod postal";
        }
		return (
            <div className="checkout_box">
                <h3>{lang === "ro" ? "Adresa" : "Address"}</h3>
                <Row>
                    <Col sm={6}><input id="checkout_address_input_first_name" type="text" className="input_black" placeholder={address_placeholder.first_name}></input></Col>
                    <Col sm={6}><input id="checkout_address_input_second_name" type="text" className="input_black" placeholder={address_placeholder.second_name}></input></Col>
                    <Col sm={12}><input id="checkout_address_input_email" type="text" className="input_black" placeholder="Email"></input></Col>
                    <Col sm={12}><input id="checkout_address_input_phone" type="text" className="input_black" placeholder={address_placeholder.phone}></input></Col>
                    <Col sm={12}><input id="checkout_address_input_address" type="text" className="input_black" placeholder={address_placeholder.address}></input></Col>
                    <Col sm={4}><input id="checkout_address_input_country" type="text" className="input_black" placeholder={address_placeholder.country}></input></Col>
                    <Col sm={4}><input id="checkout_address_input_city" type="text" className="input_black" placeholder={address_placeholder.city}></input></Col>
                    <Col sm={4}><input id="checkout_address_input_zip" type="text" className="input_black" placeholder={address_placeholder.zip}></input></Col>
                    <Col sm={12}><Button id="checkout_address_button" type="button"  className="button_color" onClick={this.checkout_next}>{lang === "ro" ? 'Mai departe' : 'Next'}</Button></Col>
                </Row>
            </div>
        )
    }
}

class Shipping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
        this.checkout_next = this.checkout_next.bind(this); 
        this.change = this.change.bind(this);  
    }

    checkout_next(){
        this.props.checkout_next(3);
    }
    change(e){
        let isChecked = e.target.checked;
        if(isChecked){
           $('.shipping_other_address').show();
        } else {
            $('.shipping_other_address').hide();
        }
    }

	render(){
        let lang = this.props.lang;
        let shipping_label = "Shipping address is the same as the billing address";
        if(lang === "ro"){
            shipping_label = "Adresa de livrare este aceeasi cu adresa de facturare";
        }
        let address_placeholder = {
            address: "Address",
            country: "Country",
            city: "City",
            zip: "Zip code"
        }
        if(lang === "ro"){
            address_placeholder.address = "Adresa";
            address_placeholder.country = "Tara";
            address_placeholder.city = "Oras";
            address_placeholder.zip = "Cod postal";
        }
		return (
            <div className="checkout_box">
                <h3>{lang === "ro" ? "Livrare" : "Shipping"}</h3>
                <Row>
                    <Col sm={12}>
                        <Form.Check type="checkbox" label={shipping_label} onChange={(e)=>this.change(e)}/>
                    </Col>
                    <Col sm={12} className="shipping_other_address">
                        <Row>
                            <Col sm={12}><input id="checkout_shipping_input_address" type="text" className="input_black" placeholder={address_placeholder.address}></input></Col>
                            <Col sm={12}><input id="checkout_shipping_input_country" type="text" className="input_black" placeholder={address_placeholder.country}></input></Col>
                            <Col sm={12}><input id="checkout_shipping_input_city" type="text" className="input_black" placeholder={address_placeholder.city}></input></Col>
                            <Col sm={12}><input id="checkout_shipping_input_zip" type="text" className="input_black" placeholder={address_placeholder.zip}></input></Col>
                        </Row>
                    </Col>
                    <Col sm={12}>
                    <Button id="checkout_shipping_button" type="button" className="button_color" onClick={this.checkout_next}>{lang === "ro" ? 'Mai departe' : 'Next'}</Button></Col>
                </Row>
            </div>
        )
    }
}

class Payment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
        this.checkout_next = this.checkout_next.bind(this); 
    }

    checkout_next(){
        this.props.checkout_next(4);
    }

	render(){
        let lang = this.props.lang;
		return (
            <div className="checkout_box">
                <h3>{lang === "ro" ? "Metoda de plata" : "Payment"}</h3>
                <Row>
                    <Col sm={4} className="checkbox_payment_box">
                        <input type="radio" id="payment01" name="payment" value="payment01" defaultChecked={true}></input>
                        <label htmlFor="Payment01">Payment01</label>
                    </Col>
                    <Col sm={4} className="checkbox_payment_box">
                        <input type="radio" id="payment02" name="payment" value="payment02"></input>
                        <label htmlFor="Payment02">Payment02</label>
                    </Col>
                    <Col sm={4} className="checkbox_payment_box">
                        <input type="radio" id="payment032" name="payment" value="payment03"></input>
                        <label htmlFor="Payment03">Payment03</label>
                    </Col>
                    <Col sm={12}><Button id="checkout_payment_button" type="button" className="button_color" onClick={this.checkout_next}>{lang === "ro" ? 'Mai departe' : 'Next'}</Button></Col>
                </Row>
            </div>
        )
    }
}

class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
        this.buy = this.buy.bind(this); 
        this.back = this.back.bind(this); 
    }

    buy(){
        if(this.props.lang){
            alert('Nu exista o metoda de plata inca.')
        } else {
            alert('There is no payment method yet.')
        }
    }

    back(){
        this.props.checkout_next(1);
    }

	render(){
        let lang = this.props.lang;
		return (
            <div className="checkout_box">
                <h3>{lang === "ro" ? "Comanda ta" : "Your order"}</h3>
                <Button id="back_button" type="button" className="button_color" onClick={this.back}>{lang === "ro" ? 'Inapoi' : 'Back'}</Button> 
                <Button id="buy_button" type="button" className="button_color" onClick={this.buy}>{lang === "ro" ? 'Cumpara' : 'Purchase'}</Button>            
            </div>
        )
    }
}

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
            tab: 1,
            checkout_info: [],
		};
        this.checkout_next = this.checkout_next.bind(this);  
	}
    
    checkout_next(tab, info){
        console.log('checkout_next ', tab, info)
        let checkout_info = [];
        if(info){
            checkout_info.push(info);
            this.setState({checkout_info : checkout_info});
        }        
        this.setState({tab : tab});
    }

	render(){		
        let self = this;
		let lang = self.props.lang;
		return (
            <>
                <Navigation language={this.language} lang={lang}></Navigation>
                <div className="mycontainer checkout_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>{lang === "ro" ? 'Finalizare comanda' : 'Checkout'}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    {(() => {
                                        switch (self.state.tab) {
                                            case 4:
                                                return <Review checkout_next={self.checkout_next}></Review>
                                            case 3:
                                                return <Payment checkout_next={self.checkout_next}></Payment>
                                            case 2:
                                                return <Shipping checkout_next={self.checkout_next}></Shipping>
                                            case 1:
                                            default:
                                                return <Address checkout_next={self.checkout_next}></Address>					
                                        }
                                    })()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
		)
	}
}

export default Checkout;