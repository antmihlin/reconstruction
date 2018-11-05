import React from 'react';

import Room from './room';

class Calculator extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			rooms:[],
			fromChild:null
		};
	}
	
	addRoom(){
		const rooms = this.state.rooms.concat('');
		this.setState({rooms:rooms});
	}
	
	receiveRoomTotal = (dataFromRoom)=>{
		this.setState({fromChild:dataFromRoom});
	};
	
	handleClick(){
		this.addRoom();
	}
	
	render(){
		
		const rooms = this.state.rooms;
		const fromChild = this.state.fromChild;
		
		const houseTotal = 0;
		
		let elements = [];
		
		for(let i in rooms){
			elements.push(<Room key={i} callBackFromParent={this.receiveRoomTotal}  />);
		}
		
		return (
			<div>
				<h1>Calculator page</h1>
				<button className="btn btn-primary" onClick={()=> this.handleClick() }>Add room</button>
				<div>
					<h4>House total: {houseTotal} </h4>
					<p>From child {fromChild}</p>
				</div>
				<div>
					{elements}
				</div>		
			</div>

		);
	};
};

export default Calculator;