//ticket class

class ticketInfo{
    constructor(avatar, fullName, email, githubUser){

        this.avatar = avatar;
        this.fullName = fullName;
        this.email = email;
        this.githubUser = githubUser;

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

//form logic

document.addEventListener('DOMContentLoaded', () =>
    {
        sessionStorage.clear();
    })

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validategGithub(username) {
    return /^@[^\s]+$/.test(username);
}

mainForm.addEventListener('submit', e => {

    e.preventDefault();

    const fNameHtmlObj = document.querySelector('#name');
    const emailHtmlObj = document.querySelector('#email');
    const githubUserHtmlObj = document.querySelector('#githubUser');

    let errorP = document.querySelectorAll('.errorP');

    errorP.forEach(e => {
        e.textContent = '';
    });

    let fName = fNameHtmlObj.value;
    let email = emailHtmlObj.value;
    let githubUser = githubUserHtmlObj.value;

    if(!avatarImgURL){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = '#ff6347';
        uploadImgInfo.textContent = 'Please select an image for your avatar.';
        return;
    }
    if(!fName){
        errorP[0].textContent = 'Favor preencha seu nome'
        return;
    }

    if(validateEmail(email) == false || !email){
        errorP[1].textContent = 'Favor preencha seu email'
        return;
    }

    if(validategGithub(githubUser) == false|| !githubUser){
        errorP[2].textContent = 'Favor preencha seu Github'
        return;
    }
    
    let ticket = new ticketInfo(avatarImgURL, fName, email, githubUser);

    console.log(ticket)

    sessionStorage.setItem('accesValidation', true);

})
