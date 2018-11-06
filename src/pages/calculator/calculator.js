import React from 'react';

import Room from '../../components/calculator/room';

class Calculator extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			rooms:[],
			roomsTotals:[],
			houseTotal:null
		};
	}
	
	addRoom(){
		const rooms = this.state.rooms.concat('');
		let roomsTotals = this.state.roomsTotals;
		roomsTotals.push(0);
		
		this.setState({rooms,roomsTotals});
	}
	
	receiveRoomTotal = (roomTotal,roomIndex)=>{
		let roomsTotals = this.state.roomsTotals;
		
		roomsTotals.splice(roomIndex, 1, roomTotal);
	
		this.setState({ roomsTotals: roomsTotals }, ()=>{
			//sum rooms cost and set home total cost
			let total = 0;
			for( let roomValue of roomsTotals){
				total += roomValue;
			}
			this.setState({ houseTotal:total });
		});
	};
	
	handleClick(){
		this.addRoom();
	}
	
	render(){
		
		const rooms = this.state.rooms;
		
		const houseTotal = this.state.houseTotal;
		
		let elements = [];
		
		for(let i in rooms){
			elements.push(<Room key={i} index={i} callBackFromParent={this.receiveRoomTotal}  />);
		}
		
		return (
			<div  className="container-fluid">
				<h1>Calculator page</h1>
				<button className="btn btn-primary" onClick={()=> this.handleClick() }>Add room</button>
				<div>
					<h4>House total: {houseTotal} </h4>
				</div>
				<div>
					{elements}
				</div>		
			</div>

		);
	};
};

export default Calculator;