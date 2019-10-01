
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext('2d');
	
	let bckgrnd = new Image();
		bckgrnd.src = "tree.jpg";

	let brick = new Image();
		brick.src = "brick.jpg";

	let lava = new Image();
		lava.src = "lava.jpg";

	var door = new Image();
		door.src = "singledoor.png";

	var doorClosed = new Image();
		doorClosed.src = "doorClosed.png";
	
	setInterval(loop, 33);

		function handleKeyDown(event) {
			if(event.key == 'w' && hero.jumingUp == false) {
				hero.jumingUp = true;
				hero.jumpingSpeed = hero.startingJumpSpeed;
			}
			else if(event.key == 's') {
				hero.movingDown = true;
			}
			else if(event.key == 'a') {
				hero.movingLeft = true;
			}
			else if(event.key == 'd') {
				hero.movingRight = true;
			}
			else if(event.key == 'p' && hero.attacking == false){
				hero.attacking = true;
				hero.kickSound.play();
			}
		}
		
		function handleKeyUp(event) {
			if(event.key == 'w') {
				//hero.jumingUp = false;
			}
			else if(event.key == 's') {
				hero.movingDown = false;
			}
			else if(event.key == 'a') {
				hero.movingLeft = false;
			}
			else if(event.key == 'd') {
				hero.movingRight = false;
			}
			else if(event.key == 'p'){
				hero.attacking = false;
			}
		}



	function loop(){
		clearBackground();
		/*moveAllObjects();*/
		drawAllObjects();
	}

	function clearBackground(){
		context.drawImage(bckgrnd, 0, 0);
	}

	/*function moveAllObjects(){

	} */

	function drawAllObjects(){
		context.drawImage(lava, 500, 665, 100, 100);
		context.drawImage(lava, 600, 665, 100, 100);

		context.drawImage(door, 20, 588);
		context.drawImage(doorClosed, 820, 28);

		for(var pos = 0; pos < walls.length; pos++) {
			walls[pos].draw();
		}

		for(var pos = 0; pos < coins.length; pos++) {
			coins[pos].draw();
		}


	}


	function wall( x, y, w, h ) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;

		this.draw = function() {
			context.drawImage(brick, this.x, this. y,
				this.width, this.height);
		}
	}


	function coin( x, y ) {
		this.status = 1; 
		this.coinSprite = new Image();
		this.coinSprite.src = "coinsprite.png";
		this.coinX = x;
		this.coinY = y;
		this.x = x;
		this.y = y;

		this.spritex = 0;
		this.spritey = 0;
		this.actualSpriteWidth = 44;
		this.actualSpriteHeight = 40;
		this.currentImagePosition = 0;
		this.totalImageCount = 10;

		this.width = 40;
		this.height = 40;
		this.amount = 10; 

		this.draw = function() {
			this.currentImagePosition++;
			this.currentImagePosition %= this.totalImageCount;
			this.spritex = this.currentImagePosition * this.actualSpriteWidth;

			if(this.status == 1) {
				context.drawImage( this.coinSprite, this.spritex, this.spritey, this.actualSpriteWidth, this.actualSpriteHeight, this.coinX, this.coinY, this.width, this.height);
			}

		}	
	}

	function HealthPotion( x, y ) {
		this.status = 1; 
		this.potionSprite = new Image();
		this.potionSprite.src = "potion.png";
		this.healthX = x;
		this.healthY = y;
		this.width = 60;
		this.height = 50;
		this.potionPoints = 20;

		this.draw = function() {
			if(this.status == 1) {
				context.drawImage(this.potionSprite, this.healthX,
					this.healthY, this.width, this.height);
			}
		}

	}


		var walls = [];
			/*FLOORS*/
			walls.push(new wall( 0, 650, 100, 100 ));
			walls.push(new wall( 100, 650, 100, 100 ));
			walls.push(new wall( 200, 650, 100, 100 ));
			walls.push(new wall( 300, 650, 100, 100 ));
			walls.push(new wall( 400, 650, 100, 100 ));
			walls.push(new wall( 700, 650, 100, 100 ));
			walls.push(new wall( 800, 650, 100, 100 ));
			walls.push(new wall( 900, 650, 100, 100 ));

			/*END PLATFORM*/ 
			walls.push(new wall( 700, 90, 100, 25 ));
			walls.push(new wall( 800, 90, 100, 25 ));

			/*OTHER PLATFORMS*/ 
			walls.push(new wall( 200, 200, 100, 25 ));
			walls.push(new wall( 300, 200, 100, 25 ));
			walls.push(new wall( 400, 200, 100, 25 ));
			walls.push(new wall( 550, 150, 100, 25 ));

			walls.push(new wall( 0, 350, 100, 25 ));

			walls.push(new wall( 200, 525, 100, 25 ));
			walls.push(new wall( 300, 525, 100, 25 ));
			walls.push(new wall( 400, 525, 100, 25 ));
			walls.push(new wall( 700, 525, 100, 25 ));
			walls.push(new wall( 800, 525, 100, 25 ));

		var coins = [];
			coins.push(new coin( 200, 150 ));
			coins.push(new coin( 325, 150 ));
			coins.push(new coin( 450, 150 ));
			coins.push(new coin( 210, 475 ));
			coins.push(new coin( 325, 475 ));
			coins.push(new coin( 450, 475 ));
			coins.push(new coin( 725, 475 ));
			coins.push(new coin( 825, 475 ));

		var potions = [];
			potions.push(new HealthPotion( 100, 200 ));



