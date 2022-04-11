import React from 'react';
import Table from 'react-bootstrap/Table'

class Total extends React.Component {
	constructor(props) {
		super(props);
        this.state = {
			lang: props.lang,
            cart_list: props.cart_list,
            discount: 0,
	  	};
	}
    render(){
        let self = this;
        let lang = self.props.lang;
        let cart_list = self.props.cart_list;
        let total_price = 0;
        if(cart_list){
            for(let i in this.props.cart_list){
                total_price = total_price + this.props.cart_list[i].price * this.props.cart_list[i].qty; 
            }
        }
        return (
            <div className="box total_container">
                <div className="total_box">
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td>{lang === "ro" ? <span>Pret total:</span> : <span>Pret total:</span>}</td>
                                <td>{total_price === 0 ? "-" : total_price}</td>
                            </tr>
                            <tr>
                                <td>{lang === "ro" ? <span>Discount:</span> : <span>Discount:</span>}</td>
                                <td>{this.state.discount === 0 ? "-" : this.state.discount}</td>
                            </tr>
                            <tr>
                                <td>{lang === "ro" ? <span>Total</span> : <span>Total:</span>}</td>
                                <td>
                                    {(() => {
                                        if(total_price === 0){
                                            return "-";
                                        } else {
                                            if(this.state.discount === 0){
                                                return total_price;
                                            } else {
                                                return total_price-this.state.discount;
                                            }
                                        }											
                                    })()}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    };
}

export default Total;