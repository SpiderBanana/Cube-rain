var canvas, ctx, platform, forms = [], score = 0, gameOver = false;

// Initialisation du jeu
function init() {
  canvas = document.getElementById("game");
  ctx = canvas.getContext("2d");
  platform = {
    x: canvas.width/2,
    y: canvas.height - 20,
    width: 50,
    height: 10,
    speed: 7
  };
  createForms();
  document.addEventListener("keydown", movePlatform);
  setInterval(update, 1000/60);
}

// les cubes qui tombent 
function createForms() {
  for (var i = 0; i < 3; i++) {
    var form = {
      x: Math.random() * canvas.width,
      y: -50,
      width: 20,
      height: 20,
      speed: Math.random() * 2 + 1,
      color: (i < 2) ? 'red' : 'black'
    };
    forms.push(form);
  }
}

// Déplacement de la plateforme
function movePlatform(event) {
  if (event.keyCode === 37) {
    if(platform.x > 0) {
      platform.x -= platform.speed;
    }
  } else if (event.keyCode === 39) {
    if(platform.x + platform.width < canvas.width) {
      platform.x += platform.speed;
    }
  }
}

// Mise à jour du jeu
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  forms.forEach(function(form) {
    ctx.fillStyle = form.color;
    ctx.fillRect(form.x, form.y, form.width, form.height);
    form.y += form.speed;
    if (form.y > canvas.height) {
      forms.splice(forms.indexOf(form), 1);
      createForm();
    }
    if (form.y + form.height >= platform.y && form.x + form.width >= platform.x && form.x <= platform.x + platform.width) {
      if(form.color === 'red'){
        gameOver = true;
        alert("Game Over!");
        var restart = confirm("Voulez-vous recommencer la partie?");
        if(restart){
          forms = [];
          score = 0;
          updateScore();
          createForms();
          gameOver = false;
        }
      }else{
        forms.splice(forms.indexOf(form), 1);
        createForms();
        score++;
        updateScore();
      }
    }
  });
}

// Mise à jour du score
function updateScore() {
  document.getElementById("score").innerHTML = "Score: " + score;
}

// Création de nouvelles plateformes
function createForm() {
  var form = {
    x: Math.random() * canvas.width,
    y: -50,
    width: 20,
    height: 20,
    speed: Math.random() * 2 + 1,
    color: 'black'
  };
  forms.push(form);
}

window.onload = init;