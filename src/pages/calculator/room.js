import React from 'react';

class Room extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			//Room params
			roomTitle:null,
			roomType:null,
			width:null,
			length:null,
			height:null,
			wallCeramics:false,
			wallConditions:null,
			floorType:null,
			electricTubes:null,
			electricWiresReplace:null,
			
			//Material costs
			wallPaintPrice:null,
			wallCeramicsPrice:null,
			ceilingPaintPrice:null,
			floorMaterialPrice:null,
			
			//Work costs
			floorWorkPrice:null,
			stuccoPrice:null,
			plasterPrice:null,
			electricTubesPrice:null,
			wiresReplacePrice:null,
			waterTubingPrice:null,
			paintingPrice:null,
			floorMakingPrice:null,
			wallCeramicsWorkCost:null,
			//Calculated area
			roomArea: null,
			wallsArea: null,
			//Calculated Prices
			wallsPrice: null,
			ceilingPrice: null,
			floorPrice: null,
			totalPrice: null,
		};
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleInputChange(event){
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
				
		this.setState( { [name]: value } );
		
	}
	
	handleSubmit(){
		
		const roomArea = this.calcRoomArea( this.state.length, this.state.width);
		const wallsArea = this.calcWallsArea(this.state.height, this.state.length, this.state.width);
		
		this.setState({ wallsArea:wallsArea , roomArea:roomArea },function(){
			this.calcWallsPrice();
			this.calcCeilingPrice();
			this.calcFloorPrice();
			this.calcRoomTotalPrice();
		});
		

		console.log(this.state);
	}
	
	//Calculate areas
	calcRoomArea( length, width ){
		const area = length * width;
		return  area ;
	};
	
	//Calculates area of four walls
	calcWallsArea( height, length, width ){
		const wallsArea = ( ( height * length ) + ( height * width ) ) * 2 ;
		return  wallsArea ;
	}
		
	//Calculate painting costs
	calcAreaPaintingPrice( area,paintingCost, paintPrice, stuccoPrice=1, plasterPrice=1  ){
		let cost = ( area * paintingCost + area * paintPrice ) ;
		
		if( stuccoPrice ) cost +=( area * stuccoPrice );
		if( plasterPrice ) cost +=( area * plasterPrice );
		
		return cost;
	}
	
	//Calculate walls making price
	calcWallsPrice(  ){
		let price = this.calcAreaPaintingPrice( this.state.wallsArea, this.state.paintingPrice, this.state.wallPaintPrice, this.state.stuccoPrice, this.state.plasterPrice  );
		
		if(this.state.wallCeramics ){
			price = this.state.roomArea * this.state.wallCeramicsWorkCost + this.state.wallCeramicsPrice *this.state.roomArea;
		}else{
			price = this.calcAreaPaintingPrice( this.state.wallsArea, this.state.paintingPrice, this.state.wallPaintPrice, this.state.stuccoPrice, this.state.plasterPrice  );
		}
		
		 this.setState({ wallsPrice: price });
	}
	
	//Calculate ceiling painting cost
	calcCeilingPrice(){
		const price = this.calcAreaPaintingPrice( this.state.roomArea, this.state.paintingPrice, this.state.ceilingPaintPrice );
		 this.setState({ ceilingPrice: price });
	}
	
	//Calculate floor making cost
	calcFloorPrice(){
		const floorPrice = this.state.floorMakingPrice * this.state.roomArea + this.state.floorMaterialPrice * this.state.roomArea;
		 this.setState({ floorPrice :floorPrice });
	}
	
	calcRoomTotalPrice(){
		let totalPrice = 0;
		totalPrice += this.state.wallsPrice;
		totalPrice += this.state.ceilingPrice;
		totalPrice += this.state.floorPrice;
		
		this.setState({ totalPrice:totalPrice });		
	}	

	render() {
			const wallsPrice = this.state.wallsPrice;
			const ceilingPrice =  this.state.ceilingPrice;
			const floorPrice =  this.state.floorPrice;
			const totalPrice =  this.state.totalPrice;		
		
		return(
			<div>
				<h4>Set room parametres</h4>
					<div className="form-group">
					  <label htmlFor="roomTitle">Room title</label>
					  <input type="text" className="form-control" onChange={this.handleInputChange} name="roomTitle" id="roomTitle" aria-describedby="Room title" placeholder="Enter room name" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="roomType">Room type</label>
					  <select className="form-control" onChange={this.handleInputChange} name="roomType" id="roomType">
						<option value="">Choose</option>
						<option value="room">Room</option>
						<option value="bathroom">Bathroom</option>
					  </select>
					</div>
					<div className="form-group">
					  <label htmlFor="width">Width</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="width" id="width" aria-describedby="Width" placeholder="Enter width" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="length">Length</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="length" id="length" aria-describedby="Length" placeholder="Enter length" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="height">Height</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="height" id="height" aria-describedby="Height" placeholder="Enter height" />
					  
					</div>

					<div className="form-group form-check">
					  <input type="checkbox" className="form-check-input" onChange={this.handleInputChange} name="wallCeramics" id="wallCeramics"/>
					  <label className="form-check-label" htmlFor="wallCeramics">Wall ceramics</label>
					</div>
					
					<div className="form-group">
					  <label htmlFor="wallConditions">Wall conditions</label>
					  <select className="form-control" onChange={this.handleInputChange} name="wallConditions" id="wallConditions">
						<option value="">Choose</option>
						<option value="paint">Paint only (a bit stucco)</option>
						<option value="paintStucco">Paint + stucco</option>
						<option value="paintStuccoPlaster">Paint + stucco + plaster</option>
					  </select>
					</div>
					<div className="form-group">
					  <label htmlFor="floorType">Floor type</label>
					  <select className="form-control" onChange={this.handleInputChange} name="floorType" id="floorType">
						<option value="">Choose</option>
						<option value="ceramics">Ceramics</option>
						<option value="parquet">Parquet</option>
					  </select>
					</div>
					
					<div className="form-group form-check">
					  <input type="checkbox" className="form-check-input" onChange={this.handleInputChange} name="electricTubes" id="electricTubes"/>
					  <label className="form-check-label" htmlFor="electricTubes">Electric tubes</label>
					</div>
					<div className="form-group form-check">
					  <input type="checkbox" className="form-check-input" onChange={this.handleInputChange} name="electricWiresReplace" id="electricWiresReplace"/>
					  <label className="form-check-label" htmlFor="electricWiresReplace">Replacment of electric wires</label>
					</div>
					
				<h4>Material Prices</h4>
				
					<div className="form-group">
					  <label htmlFor="floorWorkPrice">Floor material price Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="floorWorkPrice" id="floorWorkPrice" aria-describedby="Floor price" placeholder="Enter material price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="wallPaintPrice">Wall paint price Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="wallPaintPrice" id="wallPaintPrice" aria-describedby="Wall paint price" placeholder="Enter wall paint price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="wallCeramicsPrice">Wall ceramics</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="wallCeramicsPrice" id="wallCeramicsPrice" aria-describedby="Wall ceramics price" placeholder="Enter wall ceramics price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="ceilingPaintPrice">Ceiling paint Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="ceilingPaintPrice" id="ceilingPaintPrice" aria-describedby="Ceiling paint price" placeholder="Enter ceiling paint price" />
					  
				
					</div>
					<h4>Work costs</h4>
					<div className="form-group">
					  <label htmlFor="paintingPrice">Painting price Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="paintingPrice" id="paintingPrice" aria-describedby="Painting price" placeholder="Enter  painting price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="floorMaterialPrice">Floor material cost Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="floorMaterialPrice" id="floorMaterialPrice" aria-describedby="Floor material price" placeholder="Enter floor material price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="stuccoPrice">Stucco price</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="stuccoPrice" id="stuccoPrice" aria-describedby="Stucco price" placeholder="Enter stucco price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="plasterPrice">Plaster price</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="plasterPrice" id="plasterPrice" aria-describedby="Plaster price" placeholder="Enter plaster price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="electricTubesPrice">Electric tubing price</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="electricTubesPrice" id="electricTubesPrice" aria-describedby="Electric tubing price" placeholder="Enter electric tubing price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="wiresReplacePrice">Wires replacement price</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="wiresReplacePrice" id="wiresReplacePrice" aria-describedby="Wires replacment price" placeholder="Enter wires replacment price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="waterTubingPrice">Water tubing price</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="waterTubingPrice" id="waterTubingPrice" aria-describedby="Water tubing price" placeholder="Enter water tubing price" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="floorMakingPrice">Floor making cost Sq.m</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="floorMakingPrice" id="floorMakingPrice" aria-describedby="Floor making cost" placeholder="Enter floor making cost" />
					  
					</div>
					<div className="form-group">
					  <label htmlFor="wallCeramicsWorkCost">Wall ceramics cost</label>
					  <input type="number" className="form-control" onChange={this.handleInputChange} name="wallCeramicsWorkCost" id="wallCeramicsWorkCost" aria-describedby="Wall ceramics cost" placeholder="Enter wall ceramics cost" />
					  
					</div>
					<button className="btn btn-success" onClick={this.handleSubmit} >Calculate</button>
				<div>
					<h4>Result</h4>
					<p>Walls cost: {wallsPrice} </p>
					<p>Ceiling painting cost: {ceilingPrice}</p>
					<p>Floor making cost: {floorPrice}</p>
					<p><strong>Total:  {totalPrice}</strong></p>
				</div>
			</div>
				);
	}
}

export default Room;