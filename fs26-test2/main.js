let searchText='13';

function searchHandler(isShowAll){
    loading(true);
    const searchField=document.getElementById("searchField");
    searchText=searchField.value;
    loadPhone(searchText, isShowAll);
    
}
const loading= (isLoading)=>
{
    
    const loading= document.getElementById("loading");
    if(isLoading)
    {
        loading.classList.remove('hidden');
    }
    else{
        loading.classList.add('hidden');
    }

}
const loadPhone= async(searchText, isShowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data =await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
    
}

loadPhone(searchText);
const displayPhones = (phones,isShowAll)=>{
    // console.log(phones.length);
    const phoneContainer= document.getElementById("phone-container");
    phoneContainer.textContent='';
    
    const showAll= document.getElementById("showALLBtn");

    if(phones.length>8 && !isShowAll)
    {
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    };
    //display first 8
    if(!isShowAll){
        phones = phones.slice(0,12);
    };
    
    phones.forEach(phone => {
        //console.log(phone);
        const phoneCard=document.createElement('div');
        phoneCard.classList=`card bg-base-100 drop-shadow-lg p-5`;
        phoneCard.innerHTML=`
                    <figure class="pt-5">
                      <img src="${phone.image}" alt="phone" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>There are many variations of passages of available, but the majority have suffered</p>
                      <div class="card-actions pt-4">
                        <button onclick="showDetailsHandler('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
                      </div>
                    </div>

        `;
        phoneContainer.appendChild(phoneCard);
        
    });
    //hide loading spinner
    loading(false);
}

// show All Button
function showBtn()
{
   searchHandler(true);
}
// Show Details
const showDetailsHandler = async (id)=>{
    // console.log(id);
    const res= await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data=await res.json();
    const phone=data.data;
    console.log(phone);
    showPhoneDetails(phone);
}
// showDetailsHandler();

// const showPhoneDetails=(details)=>{
//     my_modal.showModal();
//     const modelName= document.getElementById('detailsPhoneName');
//     const brandName= document.getElementById('detailsBrand');
//     const detailsSpec= document.getElementById('detailsSpec');
//     const releaseDate= document.getElementById('releaseDate');
//     const imageDiv= document.getElementById('imgContainer');

//     imageDiv.innerHTML=`<img src="${details.image}" alt="">`;
//     modelName.innerText=details.name;
//     brandName.innerText=`Brand: ${details.brand}`;
//     const features=details.mainFeatures;
//     //console.log(features.storage);
//     console.log(details.image);
//     let string="";
//     for (const key in features) {
//         detailsSpec.innerHTML=`${features[key]} <br>`;
//         detailsSpec.innerText=`${features[key]} <br>`;
//         console.log(`${key}:${features[key]}`);
//         string=string+`${key}: ${features[key]} \n`;

//     }
//     detailsSpec.innerText=string;
//     releaseDate.innerText=`${details.releaseDate}`;
    
// }

const showPhoneDetails = (details) => {
    my_modal.showModal();
    const modelName = document.getElementById('detailsPhoneName');
    const brandName = document.getElementById('detailsBrand');
    const detailsSpec = document.getElementById('detailsSpec');
    const releaseDate = document.getElementById('releaseDate');
    const imageDiv = document.getElementById('imgContainer');

    imageDiv.innerHTML = `<img src="${details.image}" alt="Phone Image" style="max-width: 100%; height: auto; display: block; margin: 10px auto;">`;
    modelName.innerText = details.name;
    brandName.innerText = `Brand: ${details.brand}`;

    const features = details.mainFeatures;
    let tableHTML = `<table style="width:100%; border-collapse: collapse; border: 1px solid #ddd; font-family: Arial, sans-serif;">
                        <tr style="background-color: #f4f4f4;">
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Feature</th>
                            <th style="padding: 12px; text-align: left; border-bottom: 2px solid #ddd;">Details</th>
                        </tr>`;
    for (const key in features) {
        tableHTML += `<tr style="border-bottom: 1px solid #ddd;">
                        <td style="padding: 10px;">${key}</td>
                        <td style="padding: 10px;">${features[key]}</td>
                      </tr>`;
    }
    tableHTML += `</table>`;
    detailsSpec.innerHTML = tableHTML;

    releaseDate.innerText = details.releaseDate || "No release date available";
};






const header = document.querySelector('header');
if (!header.classList.contains('header-fixed')) {
    window.addEventListener('scroll', function () {
        header.classList.toggle('header-fixed', window.scrollY > window.innerHeight / 100);
    });
}