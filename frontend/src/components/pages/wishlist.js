import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import Button from 'react-bootstrap/esm/Button';
import { getCookie, setCookie } from './utils';

class Wishlist extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,wish_list: null,
            cart_list: null,
	  	};
        this.remove_wish = this.remove_wish.bind(this);  
        this.add_cartlist = this.add_cartlist.bind(this);
	}

    componentDidMount(){
        let wish_list = [];
        let cart_list = [];
        if(getCookie('app_wish_list')){
            wish_list = JSON.parse(getCookie('app_wish_list'));
        }
        if(getCookie('app_cart_list')){
            cart_list = JSON.parse(getCookie('app_cart_list'));
        }
        this.setState({wish_list : wish_list});
        this.setState({cart_list : cart_list});
	}

    remove_wish(elem){
        let wish_list = this.state.wish_list;
        for(let i in wish_list){
            if(wish_list[i].id === elem.id){
                wish_list.splice(i, 1); 
            }
        }        
        const myJSON = JSON.stringify(wish_list);
        setCookie("app_wish_list", myJSON, 1);
        this.setState({wish_list : wish_list});
    }

    add_cartlist(id){
        let wish_list = this.state.cart_list;
        let cart_list = this.state.cart_list;
        let item = {id: id, color:cart_list[id].color, size:cart_list[id].size}
        wish_list.push(item)
        const myJSON = JSON.stringify(wish_list);
        setCookie("app_wish_list", myJSON, 1);
    }
	
	render(){	
        let self = this;	
		let lang = self.props.lang;
        let wish_list = self.state.wish_list;
		return (
            <>
                <Navigation language={self.language} lang={lang}></Navigation>
                <div className="mycontainer wishlist_page_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>{lang === "ro" ? 'Wishlist' : 'Wishlist'}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    {(() => {
                                        if(typeof wish_list !== "undefined" && wish_list !== "null" && wish_list !== null && wish_list !== ""){
                                            if(wish_list.length>0){
                                                return(
                                                    <div className="box wish_container">
                                                        <div className="wish_box">
                                                            <div className="wish wish_img">
                                                                <h4>{lang === "ro" ? 'Produs' : 'Produce'}</h4>
                                                            </div>
                                                            <div className="wish wish_product"></div>
                                                            <div className="wish wish_price">
                                                                <h4>{lang === "ro" ? 'Pret' : 'Price'}</h4>
                                                            </div>
                                                            <div className="wish wish_buttons"></div>
                                                        </div>
                                                        <div className="wish_box">
                                                            {
                                                                wish_list.map(function(x, i){
                                                                    let price = x.price * x.qty;
                                                                    return (
                                                                        <div key={i}>
                                                                            <div className="wish wish_img">
                                                                                <img src={x.img} alt="img_wish"></img>
                                                                            </div>
                                                                            <div className="wish wish_product">
                                                                                <h4>{x.name}</h4>
                                                                                <h6>
                                                                                    {(() => {
                                                                                        if(x.color){
                                                                                            return(
                                                                                                <span>{lang === "ro" ? 'Marime' : 'Size'}: {x.size}</span>
                                                                                            )
                                                                                        } 											
                                                                                    })()}
                                                                                    {(() => {
                                                                                        if(x.color){
                                                                                            return(
                                                                                                <span>{lang === "ro" ? 'Culoare' : 'Color'}: {x.color} </span>
                                                                                            )
                                                                                        } 											
                                                                                    })()}
                                                                                </h6>
                                                                            </div>
                                                                            <div className="wish wish_price">
                                                                                <p>{price}</p>
                                                                                <h6><span>{x.price} {lang === "ro" ? 'buc.' : 'each'}</span></h6>
                                                                            </div>
                                                                            <div className="wish wish_buttons">
                                                                                <Button onClick={()=>{self.add_cartlist(x)}} type="button" className="button_color"><i className="fa fa-heart"></i></Button>
                                                                                <Button onClick={()=>{self.remove_cart(x)}} type="button" className="button_color"><i className="fa fa-trash"></i></Button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="box cart_container">
                                                        <div className="cart_box">
                                                            <p>{lang === "ro" ? 'Nu ai produse in cos' : 'No products'}</p>
                                                        </div>
                                                    </div>                                                        
                                                )
                                            }                                                
                                        } else {
                                            return (
                                                <div>Loading...</div>
                                            )
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

export default Wishlist;