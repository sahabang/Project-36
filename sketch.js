var dog, dogImage, happyDog, database, foodS, foodStock;
var feedPet, addFood;
var fedTime, lastFed;
var button1, button2;
var foodObj;
var milkImg;

function preload() {
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  milkImg = loadImage("images/Milk.png");
}

function setup() {
  database = firebase.database();
  createCanvas(900, 500);
  dog = createSprite(250, 250, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  fedTime = database.ref('FeedTime');
  fedTime.on('value', feedTimeHour);
  foodObj = new food();
  button1 = createButton('Feed the Dog');
  button1.position(700, 95);
  button1.mousePressed(feedDog);
  button2 = createButton('Add Food');
  button2.position(800, 95);
  button2.mousePressed(addFood);
}


function draw() {
  background(46, 139, 87);
  /*if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDog);
    dog.scale = 0.2;
  }*/
  fill("white");
  text("Food remaining: " + foodS, 50, 100);
  fill("white");
  text("Note: Press up arrow key to feed Drago milk!", 50, 20);
  foodObj.display();
  
  fill(255, 255, 254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Fed : " + lastFed % 12 + " PM", 350, 30);
  }
  else {
    text("Last Feed : " + lastFed == 0 ? "12" : lastFed + " AM", 350, 30);
  }

  drawSprites();
  //add styles here

}
function readStock(data) {
  foodS = data.val();
}
/*function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}*/
function addFood() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}
function feedDog() {
  dog.addImage(happyDog);
  
  if (foodS <= 0) {
    foodS = 0;
  }
  else {
    foodS--;
    database.ref('/').update({
      Food: foodS
    })
    lastFed=new Date().getHours();
  } 
}
function feedTimeHour(data){
  lastFed=data.val();
}


