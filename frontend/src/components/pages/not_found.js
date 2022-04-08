import React from 'react';

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props,
		};
	}
	
	render(){
		return (
			<>
				<p>Page not found</p>			
			</>
		);
	};
}

export default User;