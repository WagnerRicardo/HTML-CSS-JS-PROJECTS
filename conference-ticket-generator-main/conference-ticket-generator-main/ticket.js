//Image upload treatment

const avatarImg = document.querySelectorAll('.avatarImg');
const imageUpload = document.querySelector('#imageUpload');
const mainForm = document.querySelector('#mainForm');

let avatarImgURL = sessionStorage.getItem("AvatarImage");

document.addEventListener('DOMContentLoaded', () =>
{
    if(!(sessionStorage.getItem('accesValidation'))){
        location.href = 'index.html';
    }
    if(avatarImgURL){
        avatarImg[0].src = avatarImgURL;
    }

})