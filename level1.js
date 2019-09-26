
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
		/* FLOOR */ 
		context.drawImage(brick, 0, 650, 100, 100);
		context.drawImage(brick, 100, 650, 100, 100);
		context.drawImage(brick, 200, 650, 100, 100);
		context.drawImage(brick, 300, 650, 100, 100);
		context.drawImage(brick, 400, 650, 100, 100);
		context.drawImage(brick, 700, 650, 100, 100);
		context.drawImage(brick, 800, 650, 100, 100);
		context.drawImage(brick, 900, 650, 100, 100);

		/* END PLATFORM */ 
		context.drawImage(brick, 700, 90, 100, 25);
		context.drawImage(brick, 800, 90, 100, 25);

		/* OTHER PLATFORMS */
		context.drawImage(brick, 200, 200, 100, 25);
		context.drawImage(brick, 300, 200, 100, 25);
		context.drawImage(brick, 400, 200, 100, 25);
		context.drawImage(brick, 550, 150, 100, 25);

		context.drawImage(brick, 0, 350, 100, 25);

		context.drawImage(brick, 200, 525, 100, 25);
		context.drawImage(brick, 300, 525, 100, 25);
		context.drawImage(brick, 400, 525, 100, 25);
		context.drawImage(brick, 700, 525, 100, 25);
		context.drawImage(brick, 800, 525, 100, 25);

		context.drawImage(lava, 500, 665, 100, 100);
		context.drawImage(lava, 600, 665, 100, 100);

		context.drawImage(door, 20, 588);
		context.drawImage(doorClosed, 820, 28);

	}


