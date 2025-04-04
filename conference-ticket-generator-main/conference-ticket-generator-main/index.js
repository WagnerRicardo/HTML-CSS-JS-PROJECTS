//ticket class

class ticketInfo{
    constructor(avatar, fullName, email, githubUser, ticketID, currentDate){

        this.avatar = avatar;
        this.fullName = fullName;
        this.email = email;
        this.githubUser = githubUser;
        this.ticketID = ticketID;
        this.currentDate = currentDate;

    }
}

//Image upload treatment

const avatarImg = document.querySelectorAll('.avatarImg');
const imageUpload = document.querySelector('#imageUpload');
const mainForm = document.querySelector('#mainForm');
const dragDrop = document.getElementById('drag-drop');
const uploadImgInfo = document.querySelector('.uploadImgInfo');
const iconInfo = document.querySelector('.iconInfo');
let avatarImgURL = ''

imageUpload.addEventListener("change", () => {
    uploadImgFile()
})

function uploadImgFile(imgFile = ''){
    imageFile = imgFile || imageUpload.files[0];

    if(imageFile.size > 500000){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = '#ff6347';
        uploadImgInfo.textContent = 'File too Large, please upload a file under 500kb.';
        return;
    }

    iconInfo.src = './assets/images/icon-info.svg'
    uploadImgInfo.style.color = '#ffffffb3';
    uploadImgInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        avatarImgURL = reader.result;

        avatarImg[0].setAttribute('src', avatarImgURL);
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

//actual submit

mainForm.addEventListener('submit', e => {

    e.preventDefault();

    //html objects

    const fNameHtmlObj = document.querySelector('#name');
    const emailHtmlObj = document.querySelector('#email');
    const githubUserHtmlObj = document.querySelector('#githubUser');

    let errorP = document.querySelectorAll('.errorP');
    let errorParagraphs = document.querySelectorAll('.errorP p');

    let fName = fNameHtmlObj.value;
    let email = emailHtmlObj.value;
    let githubUser = githubUserHtmlObj.value;

    //input validation

    if(!avatarImgURL){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = '#ff6347';
        uploadImgInfo.textContent = 'Please select an image for your avatar.';
        uploadImgInfo.focus();
        return;
    }
    if(!fName){
        errorP[0].classList.remove('deactivated');
        errorParagraphs[0].focus();
        return;
    }
    errorP[0].classList.add('deactivated');

    if(validateEmail(email) == false || !email){
        errorP[1].classList.remove('deactivated');
        errorParagraphs[1].focus();
        return;
    }
    errorP[1].classList.add('deactivated');

    if(validategGithub(githubUser) == false|| !githubUser){
        errorP[2].classList.remove('deactivated');
        errorParagraphs[2].focus();
        return;
    }
    errorP[2].classList.add('deactivated');

    //transfer to another page

    const ticketIDnumber = Math.round(ticketIDNumberGenerator(1, 99999));

    const todayDate = new Date();
    
    let ticket = new ticketInfo(avatarImgURL, fName, email, githubUser, ticketIDnumber, todayDate);

    sessionStorage.setItem("ticketData", JSON.stringify(ticket));

    sessionStorage.setItem('accesValidation', true);

    console.log(sessionStorage.getItem('ticketData'));

    window.location.href = "ticket.html";

})
