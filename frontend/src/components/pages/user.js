import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import { getCookie } from './utils';

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
	}

	componentDidMount(){
        let cart = getCookie("app_cart")
        console.log('cart--> ', cart)
	}
	
	render(){		
		let lang = this.props.lang;
		return (
            <>
                <Navigation language={this.language} lang={lang}></Navigation>
                <div className="mycontainer cart_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>User</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={3}>
                                    <h3>Dashboard</h3>
                                    <p>dashboard</p>
                                </Col>
                                <Col sm={9}>
                                    <h3>History</h3>
                                    <p>history</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
		)
	}
}

export default User;