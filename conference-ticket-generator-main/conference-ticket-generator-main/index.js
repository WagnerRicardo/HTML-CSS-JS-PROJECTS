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

    console.log(imageFile.size);

    if(imageFile.size > 500000){
        iconInfo.src = './assets/images/icon-info2.svg'
        uploadImgInfo.style.color = '#ff6347';
        uploadImgInfo.textContent = 'File too Large, please upload a file under 500kb.';
        return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", () => {
        avatarImgURL = reader.result;

        avatarImg[0].setAttribute('src', avatarImgURL);
    })

    reader.readAsDataURL(imageFile);

    iconInfo.src = './assets/images/icon-info.svg'
    uploadImgInfo.style.color = '#ffffffb3';
    uploadImgInfo.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
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

function formSubmit(){
    mainForm.preventDefault();


    

    sessionStorage.setItem('accesValidation', true);
}
