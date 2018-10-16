import React from 'react';

class Room extends React.Component {
	
	constructor(props){
		super(props);
		
		this.states = {
			area:null,
			
		};
	}
	
	calculateArea(){
		
	};
	
	

	render() {
		return(
			<div>
				<h5>Set room parametres</h5>
					<div className="form-group">
					  <label htmlFor="roomType">Room type</label>
					  <select className="form-control" id="roomType">
						<option value="">Choose</option>
						<option value="room">Room</option>
						<option value="bathroom">Bathroom</option>
					  </select>
					</div>
					<div className="form-group">
					  <label htmlFor="width">Width</label>
					  <input type="number" className="form-control" id="width" aria-describedby="Width" placeholder="Enter width" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="length">Length</label>
					  <input type="number" className="form-control" id="length" aria-describedby="length" placeholder="Enter length" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="height">Height</label>
					  <input type="number" className="form-control" id="height" aria-describedby="Height" placeholder="Enter height" />
					  
					</div>

					<div className="form-group form-check">
					  <input type="checkbox" className="form-check-input" id="wallCeramics"/>
					  <label className="form-check-label" htmlFor="wallCeramics">Wall ceramics</label>
					</div>
					
					<div className="form-group">
					  <label htmlFor="floorType">Floor type</label>
					  <select className="form-control" id="floorType">
						<option value="">Choose</option>
						<option value="ceramics">Ceramics</option>
						<option value="parquet">Parquet</option>
					  </select>
					</div>
			</div>
				);
	}
}

export default Room;