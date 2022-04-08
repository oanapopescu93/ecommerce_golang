import React from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function Footer(props){
	var date = new Date();
	date = date.getFullYear();

	return (
		<div id="footer" className="footer">
			<Container>	
				<Row>
					<Col sm={12}>
						<footer className="text-center"><h6>Copyright &copy; <span id="copyright_year">{date}</span> All rights reserved.</h6></footer>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Footer