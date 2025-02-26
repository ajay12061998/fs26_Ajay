document.addEventListener("keydown", function(event) {
    event.preventDefault(); // Prevent default actions for special keys

    // Play keypress sound
    let sound = document.getElementById("keypress-sound");
    sound.currentTime = 0; // Reset sound to allow consecutive keypresses
    sound.play();

    // Extract key details
    let key = event.key === " " ? "Space" : event.key; // Handle space key separately
    let keyCode = event.keyCode;
    let combination = [];

    if (event.ctrlKey) combination.push("Ctrl");
    if (event.shiftKey) combination.push("Shift");
    if (event.altKey) combination.push("Alt");
    if (event.metaKey) combination.push("Meta");
    if (key && !combination.includes(key)) combination.push(key);

    // Update the UI
    document.getElementById("key").textContent = key;
    document.getElementById("keyCode").textContent = keyCode;
    document.getElementById("combination").textContent = combination.join(" + ");

    // Store history
    let historyList = document.getElementById("history");
    let listItem = document.createElement("li");
    listItem.textContent = `${combination.join(" + ")} (Code: ${keyCode})`;
    
    // Limit history to last 10 entries
    if (historyList.children.length >= 10) {
        historyList.removeChild(historyList.firstChild);
    }
    
    historyList.appendChild(listItem);
});
