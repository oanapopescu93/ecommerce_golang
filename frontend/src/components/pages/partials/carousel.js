import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { getCookie, setCookie } from '../utils';

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            lang: props.lang,
            list: props.list,
            category: props.category,
            template: props.template,
            option: null,
		};
        this.add_cart = this.add_cart.bind(this);  
        this.get_list = this.get_list.bind(this);  
	}

	componentDidMount(){
        if(this.state.template === "related_products"){
            const options = {
                items: 4,
                nav: false,
                rewind: true,
                autoplay: false,
                slideBy: 1,
                dots: false,
                loop:true,
                responsive:{
                    0:{
                        items:1
                    },
                    768:{
                        items:3
                    },
                    1200:{
                        items:4
                    },
                }
            };
            this.setState({ options: options });
        }
	}

    add_cart(id){
        let cart_list = [];
        if(getCookie('app_cart_list')){
            cart_list = JSON.parse(getCookie('app_cart_list'));
        }

        let exist_cart = false;
        for(let i in cart_list){
            if(cart_list[i].id === id){
                //already exists in cart -> then update cart
                exist_cart = true;
                cart_list[i].qty++;
                break;
            }
        }

        if(!exist_cart){
            //product is new
            let price = this.state.list[id].Price;
            if(this.state.list[id].Discount>0){
                price = price - price * this.state.list[id].Discount/100;
            }
            let qty = 1;
            let color = null;
            if(this.state.list[id].Color && this.state.list[id].Color.length>0){
                color = this.state.list[id].Color[0];
            }
            let size = null;
            if(this.state.list[id].Size && this.state.list[id].Size.length>0){
                size = this.state.list[id].Size[0];
            }

            let item = {id: id, img:this.state.list[id].Img, name:this.state.list[id].Name, price:price, qty:qty, color:color, size:size}
            cart_list.push(item);
        }
        
        const myJSON = JSON.stringify(cart_list);
        setCookie("app_cart_list", myJSON, 1);
    }

    get_list(list, category, text){
        let related_products = list;
        if(category && text){			
            let trim_list = [];
            for(let i in related_products){
                if(related_products[i][category] === text){
                    trim_list.push(related_products[i]);
                }
            }
            related_products = trim_list;
        } 
        const slicedArray = related_products.slice(0, 10);
        return slicedArray;
    }
	
	render(){
        let self = this;
        let lang = self.props.lang;
        let related_products = self.get_list(self.state.list);
        return (
            <>
                {self.state.list ? <div className="Owl_container">
                    {(() => {
                        switch (this.state.template) {
                            case "related_products":
                                return (
                                    <OwlCarousel {...self.state.options}>
                        {
                            related_products.map(function(item, i){
                                return (
                                    <div key={i} className="table_inside">
                                        <div className="table_box">
                                            <div>
                                                <a href={"/items/"+item.ID}>
                                                    <img alt={"related_products_"+item.ID} src={item.Img}></img>
                                                </a>
                                                <h2>{item.Name + " " + item.ID}</h2>
                                                {(() => {
                                                    if(typeof item.Price !== "undefined" && item.Price !== null){
                                                        if(item.Discount>0){
                                                            let new_price = item.Price - item.Price/item.Discount;
                                                            return <p className="new_price">{new_price}</p>
                                                        } else {
                                                            return <p className="price">{item.Price}</p>
                                                        }
                                                    }
                                                })()}
                                                <div className="button_color" onClick={()=>self.add_cart(item.ID)}>
                                                    {lang === "ro" ? <span>Adauga in cos</span> : <span>Add to cart</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        } 
                    </OwlCarousel>
                                )
                            default:
                                return(
                                    <div>No data</div>
                                )						
                        }
                    })()}
                </div> : <div>No data</div>}
            </>			
		);
    }
}

export default Carousel;