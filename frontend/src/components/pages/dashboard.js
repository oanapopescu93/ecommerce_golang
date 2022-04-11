import React from 'react';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/esm/Row';
import Navigation from './partials/navbar';
import { getCookie } from './utils';

class Dashboard extends React.Component {
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
        let self = this;	
		let lang = self.props.lang;
		return (
            <>
                <Navigation language={self.language} lang={lang}></Navigation>
                <div className="mycontainer dashboard_page_container container">
                    <Row>
                        <Col sm={12} className="mycontainer_box">
                            <Row>
                                <Col sm={12}>
                                    <h2>{lang === "ro" ? 'Dashboard' : 'Dashboard'}</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <Row>
                                        <Col sm={4}>
                                            <div className="box dashboard_address_container">
                                                <h4>{lang === "ro" ? 'Adresa' : 'Address'}</h4>
                                                <div className="dashboard_address">
                                                    under construction
                                                </div>
                                            </div>
                                        </Col>
                                        <Col sm={8}>
                                            <div className="box dashboard_history_container">
                                                <h4>{lang === "ro" ? 'Istoric cumparaturi' : 'Purchase history'}</h4>
                                                <div className="dashboard_history">
                                                    under construction
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>                           
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </>
		)
	}
}

export default Dashboard;