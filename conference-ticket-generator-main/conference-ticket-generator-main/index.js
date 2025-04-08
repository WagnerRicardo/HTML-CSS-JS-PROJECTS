//ticket class

class TicketInfo{
    constructor(avatar, fullName, email, githubUser, ticketID, currentDate){

        this.avatar = avatar;
        this.fullName = fullName;
        this.email = email;
        this.githubUser = githubUser;
        this.ticketID = ticketID;
        this.currentDate = currentDate;

    }
}

const MAX_IMAGE_SIZE = 500000; // 500kb
const ERROR_COLOR = '#ff6347';
const DEFAULT_COLOR = '#ffffffb3';

//DOM ELEMENTS

const avatarImg = document.querySelectorAll('.avatarImg');
const imageUpload = document.querySelector('#imageUpload');
const mainForm = document.querySelector('#mainForm');
const dragDrop = document.getElementById('drag-drop');
const uploadImgInfo = document.querySelector('.uploadImgInfo');
const iconInfo = document.querySelector('.iconInfo');

const fNameHtmlObj = document.querySelector('#name');
const emailHtmlObj = document.querySelector('#email');
const githubUserHtmlObj = document.querySelector('#githubUser');

let errorP = document.querySelectorAll('.errorP');
let errorParagraphs = document.querySelectorAll('.errorP p');

//Image upload treatment
let avatarImgURL = ''

imageUpload.addEventListener("change", () => {
    uploadImgFile()
})

function uploadImgFile(imgFile = ''){
    const imageFile = imgFile || imageUpload.files[0];

    if(imageFile.size > MAX_IMAGE_SIZE){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = ERROR_COLOR;
        uploadImgInfo.textContent = 'File too Large, please upload a file under 500kb.';
        return;
    }

    iconInfo.src = './assets/images/icon-info.svg'
    uploadImgInfo.style.color = DEFAULT_COLOR;
    uploadImgInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        avatarImgURL = reader.result;

        avatarImg[0].src = avatarImgURL;
    })

    reader.readAsDataURL(imageFile);

}


dragDrop.addEventListener('dragover', function(e) {
    e.preventDefault();
})

dragDrop.addEventListener('drop', function(e) {
    e.preventDefault();

    imgFile = e.dataTransfer.files[0]
    console.log(imgFile)

    uploadImgFile(imgFile);
})

//Clear storage

document.addEventListener('DOMContentLoaded', () =>
    {
        sessionStorage.clear();
    })

//form submit logic

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validategGithub(username) {
    return /^@[^\s]+$/.test(username);
}

function ticketIDNumberGenerator(min, max) {
    return Math.random() * (max - min) + min;
}

function showError(index) {
    if(index > errorP.length){
        return;
    }
    errorP[index].classList.remove('deactivated');
    errorParagraphs[index].focus();
}

function hideError(index) {
    errorP[index].classList.add('deactivated');
}

//actual submit

mainForm.addEventListener('submit', e => {

    e.preventDefault();

    //DOM ELEMENTS VALUES

    let fName = fNameHtmlObj.value;
    let email = emailHtmlObj.value;
    let githubUser = githubUserHtmlObj.value;

    //input validation

    if(!avatarImgURL){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = ERROR_COLOR;
        uploadImgInfo.textContent = 'Please select an image for your avatar.';
        uploadImgInfo.focus();
        return;
    }
    if(!fName){
        showError(0);
        return;
    }
    hideError(0);

    if(!validateEmail(email)){
        showError(1);
        return;
    }
    hideError(1);

    if(validategGithub(githubUser) == false|| !githubUser){
        showError(2);
        return;
    }
    hideError(2);

    //transfer to another page

    const ticketIDnumber = Math.round(ticketIDNumberGenerator(1, 99999));

    const todayDate = new Date();
    
    let ticket = new TicketInfo(avatarImgURL, fName, email, githubUser, ticketIDnumber, todayDate);

    sessionStorage.setItem("ticketData", JSON.stringify(ticket));

    sessionStorage.setItem('accesValidation', true);

    window.location.href = "ticket.html";

})
