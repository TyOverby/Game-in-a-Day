$(document).ready(function() {
    // Draw the canvas banner
    bannerGame();
});

function bannerGame(){
	var canvasElement = $("#banner");
	var width = canvasElement.width();
	var height = canvasElement.height();

	function Dot(maxX,maxY){
		this.position = new GameMath.Vector2f(
								GameMath.Random.randInt(0,maxX),
								GameMath.Random.randInt(0,maxY));
		this.velocity = new GameMath.Vector2f(
								GameMath.Random.randDouble(-1,1),
								GameMath.Random.randDouble(-1,1));

		this.minRadius = GameMath.Random.randInt(5,10);
		this.maxRadius = GameMath.Random.randInt(10,20);
		this.radius = GameMath.Random.randInt(this.minRadius,this.maxRadius);
		this.radiusGrow = 0.05;

		function Color(){
			this.r = 0;
			this.g = 0;
			this.b = 0;

			this.get = function(alpha){
				return "rgba("+this.r+","+this.g+","+this.b+","+alpha+")";
			}
		}

		this.color = new Color();
		this.color.r = GameMath.Random.randInt(75,200);
		this.color.g = GameMath.Random.randInt(75,200);
		this.color.b = GameMath.Random.randInt(75,200);

		this.update = function(){
			// Radius Stuff
				this.radius += this.radiusGrow;
				// If the radius is too big, start shrinking
				if(this.radius>this.maxRadius){
					this.radiusGrow = Math.abs(this.radiusGrow)*-1;
				}
				// Too small, start growing
				if(this.radius<this.minRadius){
					this.radiusGrow = Math.abs(this.radiusGrow);
				}
					
			// Position Stuff
				//console.log(this.velocity);
				var variance = 1/2
				this.position.plusEquals(this.velocity);
				this.velocity.plusEquals(
				 				GameMath.Random.randDouble(-1,1)*variance,
				 				GameMath.Random.randDouble(-1,1)*variance);
				this.velocity.normalize();
				this.velocity.timesEquals(1);

				this.position.x = (this.position.x+width)%width;
				this.position.y = (this.position.y+height)%height;

		}

		this.draw = function(canvas){

			// The circles
			canvas.drawCircleFill(this.position.x,this.position.y,this.radius,this.color.get(1));

			canvas.drawCircleFill(this.position.x,this.position.y-height,this.radius,this.color.get(1));
			canvas.drawCircleFill(this.position.x,this.position.y+height,this.radius,this.color.get(1));

			canvas.drawCircleFill(this.position.x-width,this.position.y,this.radius,this.color.get(1));
			canvas.drawCircleFill(this.position.x+width,this.position.y,this.radius,this.color.get(1));

			// The vector
			var endPoint = this.position.plus(this.velocity.normalize().times(this.radius));
			canvas.drawLine(this.position.x,this.position.y,endPoint.x,endPoint.y,"rgba(255,255,255,0.3)");
		}
	}


	var points = [];
	var canvas = new Pane("banner");
	var dots = {
		startup: function(){

			width = canvasElement.width();
			height = canvasElement.height();
			canvas.setSize(width,height);

			var numPoints = 20;
			for(var i=0;i<numPoints;i++){
				points[i] = new Dot(width,height);
			}
		},

		update: function(){

			for(var i=0;i<points.length;i++){
				points[i].update();
			}
		},

		render: function(){
			// Clear the screen
			canvas.drawRectFill(0,0,width,height,"black");

			// Draw the grid lines
			var dist = 10;
			var lineColor = "rgb(50,50,50)";
			for(var i=0;i<width;i+=dist){
				canvas.drawLine(i,0,i,height,lineColor);
			}
			for(var i=0;i<height;i+=dist){
				canvas.drawLine(0,i,width,i,lineColor);
			}

			// Draw all of the bubbles
			for(var i=0;i<points.length;i++){
				points[i].draw(canvas);
			}
		},

		isRunning: function(){
			return true;
		}
	}

	game = new Engine(dots,50);
	game.run();
}