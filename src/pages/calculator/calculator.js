import React from 'react';

import Room from './room';

class Calculator extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
		};
	}
	
	render(){
		return (
			<div>
				<h1>Calculator page</h1>
				<div>
					<Room />
				</div>		
			</div>

		);
	};
};

export default Calculator;