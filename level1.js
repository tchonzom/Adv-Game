
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext('2d');

	var NORTH = 1, SOUTH = 2, EAST = 3; WEST = 4;
	
	var hero = new Hero();

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

	var healthpotion = new Image();
		healthpotion.src = "potion.png"; 

	var star = new Image();
		star.src = "star.png";
	
	window.addEventListener("keydown", handleKeyDown);
	window.addEventListener("keyup", handleKeyUp);

	setInterval(loop, 33);

		function handleKeyDown(event) {
			if(event.key == 'w' && hero.jumingUp == false) {
				hero.jumingUp = true;
				//hero.jumpingSpeed = hero.startingJumpSpeed;
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
			}
		}
		
		function handleKeyUp(event) {
			if(event.key == 'w') {
				hero.jumpingUp = false;
			}
			else if(event.key == 's') {
				hero.crouch = false;
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
		moveAllObjects();
		drawAllObjects();
	}

	function clearBackground(){
		context.drawImage(bckgrnd, 0, 0);
	}

	function moveAllObjects(){
		hero.move();
		/* for(var pos = 0; pos < enemies.length; pos++) {
			enemies[pos].move();
		} */ 

	} 

	function drawAllObjects(){
		context.drawImage(lava, 500, 665, 100, 100);
		context.drawImage(lava, 600, 665, 100, 100);

		context.drawImage(door, 20, 588);
		context.drawImage(doorClosed, 820, 28);

		context.drawImage(star, 800, 575, 60, 60);

		for(var pos = 0; pos < walls.length; pos++) {
			walls[pos].draw();
		}

		for(var pos = 0; pos < coins.length; pos++) {
			coins[pos].draw();
		}
		for(var pos = 0; pos < potions.length; pos++) {
			potions[pos].draw();
		}
		hero.draw();
	}

	function Hero() {
		this.x = 25;
		this.y = 588;

		this.doorOpen = new Image();
		this.doorOpen.src = "singledoor.png";

	/*MOVING SPRITES*/

		/* each attack box is 89 x 62 */

			/* 275 x 129 */
		this.leftAttack = new Image();
			this.leftAttack.src = "leftAttackSprite.png";
		this.rightAttack = new Image();
			this.rightAttack.src = "rightAttackSprite.png";
		
		/* each normal box is 54 x 54 */

			/* 113 x 56 */
		this.leftCrouch = new Image();
			this.leftCrouch.src = "leftCrouchSprite.png";
		this.rightCrouch = new Image();
			this.rightCrouch.src = "rightCrouchSprite.png";
		
		this.leftInjury = new Image();
			this.leftInjury.src = "leftInjurySprite.png";
		this.rightInjury = new Image();
			this.rightInjury.src = "rightInjurySprite.png";
		
			/* 227 x 56 */
		this.leftJump = new Image;
			this.leftJump.src = "leftJumpSprite.png";
		this.rightJump = new Image();
			this.rightJump.src = "rightJumpSprite.png";
			
			/* 455 x 56 */
		this.leftRun = new Image();
			this.leftRun.src = "leftRunSprite.png";
		this.rightRun = new Image();
			this.rightRun.src = "rightRunSprite.png";
			
			/* 170 x 56 */
		this.leftRest = new Image();
			this.leftRest.src = "leftRestSprite.png";
		this.rightRest = new Image();
			this.rightRest.src = "rightRestSprite.png";

		this.currentSpriteSheet = this.rightRest;

		this.width = 60;
		this.height = 60;
		this.speed = 10;

		this.attacking = false;
		this.movingRight = false; 
		this.movingLeft = false; 
		this.jumpingUp = false; 
		this.falling = false;
		this.crouch = false; 
		this.rest = true; 

		this.currentImagePosition = 0; 
		/*NORMAL BOX*/
			this.actualNormalSpriteWidth = 54;
			this.actualNormalSpriteHeight = 54;
			/* for crouch and injury */
			this.total2ImageCount = 2;
			/* for jump */
			this.total4ImageCount = 4;
			/* for rest */
			this.total3ImageCount = 3;
			/* for run */
			this.total8ImageCount = 8;

		/*ATTACK BOX*/
			this.actualAttackSpriteWidth = 89;
			this.actualAttackSpriteHeight = 62; 
			this.totalAttackImageCount = 6;

		this.move = function() {
			var origX = this.x; 
			var origY = this.y;

			this.currentImagePosition++;
			if(this.attacking){
				this.currentImagePosition %= this.totalAttackImageCount;
			}
			else if(this.movingRight){
				this.currentImagePosition %= this.total8ImageCount;
				this.x += this.speed;
			}
			else if(this.movingLeft){
				this.currentImagePosition %= this.total8ImageCount;
				this.x -= this.speed;
			}
			
		}

		this.draw = function(){
			var spriteX = 0;
			var spriteY = 0;

			if(this.movingLeft || movingRight){

			}
		
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

		function HealthPotion(x, y){
			this.status = 1; 
			this.healthX = x; 
			this.healthY = y;
			this.x = x;
			this.y = y;
			this.width = 60;
			this.height = 50;		
			this.potionPoints = 20; 
			
			
			this.draw = function() {
				if(this.status == 1){
					context.drawImage(healthpotion, this.healthX, this.healthY, this.width, this.height);
				}
			}
		}

	function star( x, y ) {
		this.status = 1;
		this.starX = x;
		this.starY = y;
		this.starPoint = 1; 
		this.width = 40;
		this.height = 40; 

		this.draw = function() {
			if(this.status == 1){
				context.drawImage(star, this.starX,
					this.starY, this.width, this.height);
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
			potions.push(new HealthPotion( 25, 290 ));



