let searchBar = document.getElementById("search");
let emojiContainer = document.getElementById("display-emoji");
let filterTab = document.getElementById("filter-emogi");


filterTab.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".filter-tabs");
    if(filterBtn){
        e.preventDefault();
        const verifyCat = filterBtn.getAttribute("data-category");
        filterEmoji(verifyCat);
    }
})


let filterEmoji = (value) =>{
    let filteredData;
    if(value.toLowerCase() === "all"){
        filteredData = emojiList;
    }else{
        filteredData = emojiList.filter(e => {
            if(e.description.toLowerCase().includes(value.toLowerCase())){
                return true;
            }
            if(e.aliases.some(alias => alias.toLowerCase().startsWith(value.toLowerCase()))){
                return true;
            }
            if(e.tags.some(tag => tag.toLowerCase().startsWith(value.toLowerCase()))){
                return true
            }
            return false
        })
    }
    displayEmoji(filteredData);
}

function displayEmoji(value = emojiList){
    emojiContainer.innerHTML = "";
    value.forEach(item => {
        const emojiDiv = document.createElement("div");
        emojiDiv.classList.add("emoji-item");
        emojiDiv.innerHTML = `<span class="emoji-size">${item.emoji}</span>`;
        emojiContainer.appendChild(emojiDiv);
    });
}
window.addEventListener("load", () => {
    displayEmoji(emojiList);
})
searchBar.addEventListener('keyup', (e) => {
    let value = e.target.value;
    filterEmoji(e.target.value);
});
emojiContainer.addEventListener("click", (e) =>{
    const clickedEmoji = e.target.innerText;
    const emojiData = emojiList.find(item => item.emoji === clickedEmoji);
    if (emojiData) {
        navigator.clipboard.writeText(clickedEmoji);
        alert(`Emoji: ${clickedEmoji}\nName: ${emojiData.description}\nCategory: ${emojiData.category}\nTags: ${emojiData.tags}`);
    }
});


