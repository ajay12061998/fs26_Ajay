<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>U Matter | 4-7-8 Technique</title>
    <?php include 'header.php';?>
</head>
<body id="">
    <div class="four-breathing" id="four-breathing">
      <h1 class="breath-title">4-7-8 Technique</h1>
      <a class='btn' href='relax.php'>
        <i class="fas fa-times exit-relax btnExit"></i
      ></a>
      <div class="four-container" id="four-container">
        <div class="circle-four"></div>
        <div class="animate-circle" id="animate-circle"></div>
        <p id="four-text">Ready?</p>
        <div class="pointer-container-four">
          <span class="pointer-four"></span>
        </div>
        <div class="gradient-circle-four"></div>
      </div>

      <button class="start-technique-btn">Begin</button>
    </div>

    <script>
        // loader

// const container = document.getElementById("four-container");
// const animateCircle = document.getElementById("animate-circle");
// const text = document.getElementById("four-text");

// const totalTime = 19000;
// const breatheTime = 4000;
// const holdTime = 7000;

// function breathAnimation() {
//   text.innerText = "Breathe In!";
//   container.className = "four-container grow";
//   animateCircle.className = "animate-circle animate-circle-inhale";

//   setTimeout(() => {
//     text.innerText = "Hold";

//     setTimeout(() => {
//       text.innerText = "Breathe Out!";
//       container.className = "four-container shrink";
//       animateCircle.className = "animate-circle animate-circle-exhale";
//     }, holdTime);
//   }, breatheTime);
//   setInterval(breathAnimation, totalTime);
// }

// // breathAnimation();
// const button = document.querySelector("button");
// const pointerContainer = document.querySelector(".pointer-container-four");
// const startTechniqueBtn = document.querySelector(".start-technique-btn");

// button.addEventListener("click", () => {
//   breathAnimation();
//   startTechniqueBtn.style.display = "none";
//   pointerContainer.style.animationPlayState = "running";
// });
    </script>
  </body>
</html>
