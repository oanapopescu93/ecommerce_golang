import React from 'react';
import Language from './language';
import $ from 'jquery';
import Search from './search';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            width: window.innerWidth,
            language: props.language,
            lang: props.lang,
		};
        this.lang_change = this.lang_change.bind(this);    
	}

    lang_change(text){
		this.state.language(text);
	}

	componentDidMount() {
        let self = this;
		$("#menu").click(function(){
			$(".bar1").toggleClass("change");	
			$(".bar2").toggleClass("change");	
			$(".bar3").toggleClass("change");	
			$(".navbar-box").toggleClass("move-away");	
		});	
        $(window).resize(function(){            
			self.setState({ width: window.innerWidth });
		});
	}
	
	render(){
		return (
			<div id = "mynavbar" className="mynavbar">
                <div className="container">
                    <div id="menu">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="bar1"></span> 
                        <span className="bar2"></span>
                        <span className="bar3"></span>
                    </div>
                    {(() => {
                        if (this.state.width > 768) {
                            return (
                                <div className="navbar-box">
                                    <div className="nav-left">
                                        <div className="navbar-logo"><a href="/"><h1>Logo</h1></a></div>
                                    </div>
                                    <div className="nav-right">
                                        <div className="nav-icon"><a href="/dashboard"><i className="fa fa-user"></i></a></div>
                                        <div className="nav-icon"><a href="/cart"><i className="fa fa-shopping-cart"></i></a></div>
                                        <div className="nav-icon"><a href="/wishlist"><i className="fa fa-heart"></i></a></div>                                        
                                        <Search></Search>
                                        <Language lang_change={this.lang_change}></Language>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="navbar-box">
                                    <div className="nav-left">
                                        <div className="navbar-logo"><a href="/"><h1>Logo</h1></a></div>
                                        <div className="nav-right">
                                            <Search></Search>
                                            <Language lang_change={this.lang_change}></Language>
                                        </div>
                                        <ul>
                                            <li className="active"><a href="/"><i className="fa-solid fa-house"></i></a></li>
                                            <li><span>Link012</span></li>
                                            <li><span>Link022</span></li>
                                            <li><span>Link032</span></li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    })()} 
                </div>
            </div>
		);
	};
}

export default Navigation;