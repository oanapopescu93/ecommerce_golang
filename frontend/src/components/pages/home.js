import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '../css/bootstrap.css';
import '../css/font_roboto.css';
import '../css/style.css';
import 'font-awesome/css/font-awesome.min.css';

import HomePage from './homePage';
import NotFound from './not_found';
import Footer from './partials/footer';
import Cookies from './partials/cookies_modal';

import { apicall, getCookie, setCookie } from './utils';
import Product from './product';
import Wishlist from './wishlist';
import Cart from './cart';
import Checkout from './checkout';
import User from './not_found';
import Dashboard from './dashboard';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
            lang: (getCookie("app_lang") === '') ? 'eng' :getCookie("app_lang"),
			list: null,
            cookies:false,
		};
        this.lang_change = this.lang_change.bind(this);	
		this.app_cookies = this.app_cookies.bind(this);	
	}

	componentDidMount(){
		let self = this;
		let app_cookies = getCookie("app_cookies");  
		if(app_cookies !== ""){
			this.setState({ cookies: true });
		}
		apicall('/getList', 'GET').then(function(data){
			self.setState({ list: JSON.parse(data) });
		})
    }

    lang_change(text){
		this.setState({ lang: text });
	}

    app_cookies = function(){
		setCookie("app_cookies", true, 30);
		this.setState({ cookies: true });
	}

	render() {
		return (
			<>
				<div id="page-container">	
					<div id="content-wrap">
						<BrowserRouter>					
							<Routes>	
								<Route exact path="/" element={<HomePage list={this.state.list} lang_change={this.lang_change} lang={this.state.lang}></HomePage>}/>
								<Route exact path="/items/:item" element={<Product list={this.state.list} lang_change={this.lang_change} lang={this.state.lang}></Product>}/>
								<Route exact path="/dashboard" element={<Dashboard lang_change={this.lang_change} lang={this.state.lang}></Dashboard>}/>
								<Route exact path="/wishlist" element={<Wishlist lang_change={this.lang_change} lang={this.state.lang}></Wishlist>}/>
								<Route exact path="/cart" element={<Cart lang_change={this.lang_change} lang={this.state.lang}></Cart>}/>
								<Route exact path="/checkout" element={<Checkout lang_change={this.lang_change} lang={this.state.lang}></Checkout>}/>
								<Route exact path="/user" element={<User lang_change={this.lang_change} lang={this.state.lang}></User>}/>
								<Route path="*" element={<NotFound lang={this.state.lang}></NotFound>}/>
							</Routes>	
						</BrowserRouter>
					</div>
					<Footer lang={this.state.lang}></Footer>
				</div>
                {!this.state.cookies ? <Cookies app_cookies={this.app_cookies} lang={this.state.lang}></Cookies>  : null}
			</>
		);
	}
}

export default Home;