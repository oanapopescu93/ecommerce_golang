import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';

class Checkout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: props.lang,
		};
	}

	componentDidMount(){
	}
	
	render(){		
		let lang = this.props.lang;
		return (
            <>
                <Navigation language={this.language} lang={lang}></Navigation>
                <div className="mycontainer checkout_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>Checkout</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <p>Checkout will be here</p>
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