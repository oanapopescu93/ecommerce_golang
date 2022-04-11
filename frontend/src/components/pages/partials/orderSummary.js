import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { getCookie, setCookie } from '../utils';

class OrderSummary extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
			lang: props.lang,
            cart_list: props.cart_list,
	  	};
        this.remove_cart = this.remove_cart.bind(this);  
        this.add_wishlist = this.add_wishlist.bind(this);  
	}

    remove_cart(elem){
        let cart_list = this.props.cart_list;
        for(let i in cart_list){
            if(cart_list[i].id === elem.id && cart_list[i].color === elem.color && cart_list[i].size === elem.size){
                cart_list.splice(i, 1); 
            }
        }        
        const myJSON = JSON.stringify(cart_list);
        setCookie("app_cart_list", myJSON, 1);
        this.setState({cart_list : cart_list});
    }

    add_wishlist(id){
        let cart_list = this.props.cart_list;
        let wish_list = [];
        if(getCookie('app_wish_list')){
            wish_list = JSON.parse(getCookie('app_wish_list'));
        }
        let item = {id: id, color:cart_list[id].color, size:cart_list[id].size}
        wish_list.push(item)
        const myJSON = JSON.stringify(wish_list);
        setCookie("app_wish_list", myJSON, 1);
    }

    render(){
        let self = this;
        let cart_list = self.props.cart_list;
        let lang = self.props.lang;
        return (
            <>
                {(() => {
                    if(typeof cart_list !== "undefined" && cart_list !== "null" && cart_list !== null && cart_list !== ""){
                        if(cart_list.length>0){
                            return(
                                <div className="box cart_container">
                                    <div className="cart_box">
                                        <div className="cart cart_img">
                                            <h4>{lang === "ro" ? 'Produs' : 'Produce'}</h4>
                                        </div>
                                        <div className="cart cart_product"></div>
                                        <div className="cart cart_quantity">
                                            <h4>{lang === "ro" ? 'Cantitate' : 'Quantity'}</h4>
                                        </div>
                                        <div className="cart cart_price">
                                            <h4>{lang === "ro" ? 'Pret' : 'Price'}</h4>
                                        </div>
                                        <div className="cart cart_buttons"></div>
                                    </div>
                                    <div className="cart_box">
                                        {
                                            cart_list.map(function(x, i){
                                                let price = x.price * x.qty;
                                                return (
                                                    <div key={i}>
                                                        <div className="cart cart_img">
                                                            <img src={x.img} alt="img_cart"></img>
                                                        </div>
                                                        <div className="cart cart_product">
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
                                                        <div className="cart cart_quantity">
                                                            <input type="number" className="input_black" min="1" max="5" defaultValue={x.qty}></input>
                                                        </div>
                                                        <div className="cart cart_price">
                                                            <p>{price}</p>
                                                            <h6><span>{x.price} {lang === "ro" ? 'buc.' : 'each'}</span></h6>
                                                        </div>
                                                        <div className="cart cart_buttons">
                                                            <Button onClick={()=>{self.add_wishlist(x)}} type="button" className="button_color"><i className="fa fa-heart"></i></Button>
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
            </>
        );
    };
}

export default OrderSummary;