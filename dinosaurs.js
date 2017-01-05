$(function() {
    //images - background
    var bgReady = false
    var bgImage = new Image()
    bgImage.onload = function() {
        bgReady = true
    }
    bgImage.src = "sky.jpg"

    //images - dinosaur
    var dinoReady = false
    var dinoImage = new Image()
    dinoImage.onload = function() {
        dinoReady = true
    }
    dinoImage.src = "rex2.png"

    //images - food
    var foodReady = false
    var foodImage = new Image()
    foodImage.onload = function() {
        foodReady = true
    }
    foodImage.src = "broccoli.png"

    //set up canvas, dinosaur and food
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    canvas.width = 750;
    canvas.height = 550;

    var dinosaur = {
        x: 0,
        y: 0,
        width: 60,
        height: 80
    }

    var food = {
        x: 0,
        y: 0,
        height: 50,
        width: 50
    }


    //controls
    document.addEventListener("keydown", function(e) {
        var key = e.keyCode;
        switch(key) {
            case 37:
                if (dinosaur.x > 0) {
                    dinosaur.x -= 30
                }
                break
            case 38:
                if (dinosaur.y > 0) {
                    dinosaur.y -= 30
                }
                break
            case 39:
                if (dinosaur.x < 750 - dinosaur.width) {
                    dinosaur.x += 30
                }
                break
            case 40:
                if (dinosaur.y < 550 - dinosaur.height) {
                    dinosaur.y += 30
                }
                break
        }
    })

    //eat food
    var nom = function() {
        dinosaur.height += 20
        dinosaur.width += 20
        food.x = 50 + (Math.random() * (canvas.width - 100))
        food.y = 50 + (Math.random() * (canvas.height - 100))
    }

    function renderCanvas() {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0)
        }
    }

    function renderDinosaur() {
        if (dinoReady) {
            ctx.drawImage(dinoImage, dinosaur.x, dinosaur.y, dinosaur.height, dinosaur.width)
        }
    }

    function renderFood() {
        if (foodReady) {
            ctx.drawImage(foodImage, food.x, food.y, food.height, food.width)
        }
    }
    var count = 0
    function run(){
        renderCanvas()
        renderDinosaur()
        renderFood()

        if (
            dinosaur.x <= (food.x + 50)
            && food.x <= (dinosaur.x + dinosaur.width)
            && dinosaur.y <= (food.y + 50)
            && food.y <= (dinosaur.y + dinosaur.height)
        ) {
            nom()
            count += 1
        }
        if (dinosaur.width > canvas.width && dinosaur.height > canvas.height) {
            clearInterval(intervalId)
            win()
        }

    }

    var intervalId = setInterval(run, 10)
    function win() {
        $("#canvas").css("display", "none")
        $("h2").after("<a href='index.html'><div id='alert'><h1>You consumed " + count + " broccoli!<br><br><i>Click to play again</i></h1></a></div>")
        $("h1").css("font-size", "70px")
        $("h2").css("display", "none")
        $("body").css({"background-image": "url('p-rex.png')", "background-repeat": "no-repeat", "background-size": "100%"})
    }

})