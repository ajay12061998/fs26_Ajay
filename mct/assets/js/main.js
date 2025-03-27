// loader
window.addEventListener("load", () =>{
  const preload = document.querySelector(".preload");
  preload.classList.add("preload-finish");   
})


//   window.addEventListener("load", () => {
//     const preload = document.querySelector(".preload");
//     setTimeout(() => {
//         preload.classList.add("preload-finish");
//     }, 1000);
// });
  
if (!document.querySelector('header').classList.contains('header-fixed')) {
  window.addEventListener('scroll', function() {
      document.querySelector('header').classList.toggle('header-fixed', 
          window.scrollY > window.innerHeight / 100);
  });
}

// First block (unchanged, working)
const modalBtn = document.querySelector(".ham-menu-pop");
const modalBg = document.querySelector(".Hamburger");
const close = document.querySelector(".close_model");

modalBtn.addEventListener("click", function () {
    modalBg.classList.add("open-ham");
});

close.addEventListener("click", (e) => {
    e.preventDefault();
    modalBg.classList.remove("open-ham");
});

// =====================================================================

// Second block (fixed)
const breathBtn = document.querySelector(".breath-four");
const modalBreath = document.querySelector(".BreathingFour");
const closeFour = document.querySelector(".close_model_Four");

breathBtn.addEventListener("click", function () {
    modalBreath.classList.add("show-ham");
});

closeFour.addEventListener("click", (e) => {
    e.preventDefault();
    modalBreath.classList.remove("show-ham");
});



// -============================================================================
  // Breathing-popup-function ==================================================
  const relaxerContainer = document.getElementById("relaxer-container");
    const text = document.getElementById("relax-text");

    // deep-breathing
    const btnStart = document.querySelector(".startBreathe");
    const pointerContainer = document.querySelector(".pointer-container");
    const pointer = document.querySelector(".pointer");

    // modal
    const btns = document.querySelectorAll("[data-target]");
    const close_modals = document.querySelectorAll(".exit-relax");

    const totalTime = 7500;
    const breatheTime = (totalTime / 5) * 2;
    const holdTime = totalTime / 5;

    function breathAnimation() {
      text.innerText = "Breathe In!";
      relaxerContainer.className = "relaxer-container grow";

      clear = setTimeout(() => {
        text.innerText = "Hold";

        clearone = setTimeout(() => {
          text.innerText = "Breathe Out!";
          relaxerContainer.className = "relaxer-container shrink";
        }, holdTime);
      }, breatheTime);

      setInterval(breathAnimation, totalTime);
    }

    btnStart.addEventListener("click", () => {
      breathAnimation();
      btnStart.style.opacity = "0";
      pointerContainer.style.animationPlayState = "running";
      pointer.style.animationPlayState = "running";
    });
// ===============================================================================

// Breathing four seven concept js================================================


const container = document.getElementById("four-container");
const animateCircle = document.getElementById("animate-circle");
const textFour = document.getElementById("four-text");
const pointerContainerFour = document.querySelector(".pointer-container-four");
const startTechniqueBtn = document.querySelector(".start-technique-btn");

const totalTimeFour = 19000; // 4s + 7s + 8s = 19s
const breatheTimeFour = 4000; // 4 seconds inhale
const holdTimeFour = 7000;   // 7 seconds hold

function breathAnimation() {
    // Initial state
    textFour.innerText = "Breathe In!";
    container.className = "four-container grow";
    animateCircle.className = "animate-circle animate-circle-inhale";

    setTimeout(() => {
        textFour.innerText = "Hold";

        setTimeout(() => {
            textFour.innerText = "Breathe Out!";
            container.className = "four-container shrink";
            animateCircle.className = "animate-circle animate-circle-exhale";

            // Reset after exhale
            setTimeout(() => {
                textFour.innerText = "Breathe In!";
                container.className = "four-container grow";
                animateCircle.className = "animate-circle animate-circle-inhale";
            }, 8000); // 8 seconds exhale
        }, holdTimeFour);
    }, breatheTimeFour);

    // Remove setInterval from here - we'll handle repetition differently
}

// Add event listener to start button
startTechniqueBtn.addEventListener("click", () => {
    breathAnimation(); // Start the animation
    startTechniqueBtn.style.display = "none"; // Hide button
    pointerContainerFour.style.animationPlayState = "running"; // Start pointer animation
    
    // Use setInterval here to repeat the animation
    setInterval(breathAnimation, totalTimeFour);
});