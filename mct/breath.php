<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>U Matter | Deep Breathing</title>
    <?php include 'header.php';?>
    <div class="relax-container" id="deep-breathing">
        <h1 class="breath-title">Deep Breathing</h1>
        <a class='btn' href='relax.php'><i class="fas fa-times exit-relax btnExit"></i></a>
        <div class="relaxer-container" id="relaxer-container">
            <div class="circle"></div>
            <p id="relax-text"><i class="fas fa-play fa-2x startBreathe"></i></p>
            <div class="pointer-container">
                <span class="pointer"></span>
            </div>
            <div class="gradient-circle"></div>
        </div>
    </div>
    <script>

    // breathing exercise
    // const relaxerContainer = document.getElementById("relaxer-container");
    // const text = document.getElementById("relax-text");

    // // deep-breathing
    // const btnStart = document.querySelector(".startBreathe");
    // const pointerContainer = document.querySelector(".pointer-container");
    // const pointer = document.querySelector(".pointer");

    // // modal
    // const btns = document.querySelectorAll("[data-target]");
    // const close_modals = document.querySelectorAll(".exit-relax");

    // const totalTime = 7500;
    // const breatheTime = (totalTime / 5) * 2;
    // const holdTime = totalTime / 5;

    // function breathAnimation() {
    //   text.innerText = "Breathe In!";
    //   relaxerContainer.className = "relaxer-container grow";

    //   clear = setTimeout(() => {
    //     text.innerText = "Hold";

    //     clearone = setTimeout(() => {
    //       text.innerText = "Breathe Out!";
    //       relaxerContainer.className = "relaxer-container shrink";
    //     }, holdTime);
    //   }, breatheTime);

    //   setInterval(breathAnimation, totalTime);
    // }

    // btnStart.addEventListener("click", () => {
    //   breathAnimation();
    //   btnStart.style.opacity = "0";
    //   pointerContainer.style.animationPlayState = "running";
    //   pointer.style.animationPlayState = "running";
    // });
  </script>
</body>

</html>