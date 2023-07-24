//Set Main Variables to write less code
let nameInput = document.getElementById("siteName");
let urlInput = document.getElementById("siteURL");
let content = document.getElementById("myData");
let closeBtn = document.getElementById("closeBtn");
let boxModal = document.querySelector(".box-info");
//Set Regex variables to be used in validation
const namePattern = /^\w{3,}(\s+\w+)*$/;
const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:[0-9]+)?(\/\S*)?$/;
//Declare My Data Base Location
let sitesList = [];
//Be Sure Display Previous Data
if(localStorage.getItem("sitesData") == null)
{
    sitesList = [];
}
else
{
    sitesList = JSON.parse(localStorage.getItem("sitesData"));
    displayData();
}
//Anoumouns Function to change Name Input Style according to validation 
nameInput.addEventListener("keyup",function(){
    if(namePattern.test(nameInput.value))
    {
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
    }
    else
    {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
    }
}    
)
//Anoumouns Function to change URL Input Style according to validation 
urlInput.addEventListener("blur",function(){
    if(urlPattern.test(urlInput.value))
    {
        urlInput.classList.add("is-valid");
        urlInput.classList.remove("is-invalid");
    }
    else
    {
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
    }
})
//Declare Local Storage Item to Save Data any time page reloading
localStorage.setItem("sitesData",JSON.stringify(sitesList));
//Submit Function Push Data After checking that Two Inputs Containes a Valid Data
function submit()
{
    if(nameInput.classList.contains("is-valid")&&
    urlInput.classList.contains("is-valid"))
    {
        let site = {
            siteName: nameInput.value,
            siteURL: urlInput.value
        }
        sitesList.push(site);
        localStorage.setItem("sitesData",JSON.stringify(sitesList));
        displayData();
        //The next two Line Make Two Input In Normal Style
        nameInput.classList.remove("is-valid");
        urlInput.classList.remove("is-valid");
    }
    else
    {
        boxModal.classList.remove("d-none");
    }
}

function displayData()
{
    let temp = "";
    for(let i = 0 ; i < sitesList.length ; i++)
    {
        temp = temp + 
        `<tr>
            <td>` + (i + 1) + `</td>
            <td>` + sitesList[i].siteName + `</td>
            <td><a class="btn btn-visit" href="`+ sitesList[i].siteURL + ` " target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></td>
            <td><button class="btn btn-delete" onclick="deleteSite(`+i+`)"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
        </tr>`
    }
    content.innerHTML = temp;
    nameInput.value = "";
    urlInput.value = "";
}
function deleteSite(index){
    sitesList.splice(index,1);
    displayData();
    localStorage.setItem("sitesData",JSON.stringify(sitesList));
}

//Anoumonus Function Let Me Close Alert By Clicking on Exit Icon
closeBtn.addEventListener("click",function()
{
    boxModal.classList.add("d-none");
})
//Anoumonus Function Let Me Close Alert By Clicking on Exit Button on Keyboard
document.addEventListener("keydown",function(e)
{
    if(e.key == "Escape")
    {
        boxModal.classList.add("d-none");
    }
} )
//Anoumonus Function Let Me Enter  Data To Table Content By Clicking on Enter Button on Keyboard
document.addEventListener("keydown",function(e){
    if(e.key == "Enter")
    {
        submit();
    }
})
