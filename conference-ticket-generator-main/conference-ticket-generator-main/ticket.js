//html elements

const ticketHeader = document.querySelector('.ticketHeader');
const ticketAvatarImg = document.querySelector('#ticketAvatarImg');
const fullNameDisplay = document.querySelectorAll('.fullNameDisplay');
const fullEmailDisplay = document.querySelector('#fullEmailDisplay');
const githubProfile = document.querySelector('.githubProfile p');
const ticketNumber = document.querySelector('.ticketNumber p');
const todaysDate = document.querySelector('.todaysDate');
const currentLocation = document.querySelector('.currentLocation');

//ticket obj

let ticket = JSON.parse(sessionStorage.getItem('ticketData'));

const parsedDate = new Date(ticket.currentDate);

document.addEventListener('DOMContentLoaded', () =>
{
    if(!(sessionStorage.getItem('accesValidation'))){
        location.href = 'index.html';
    }
    if(ticket.avatar){
        ticketAvatarImg.src = ticket.avatar;
    }
    if(ticket.fullName){
        fullNameDisplay.forEach(element => {
        element.textContent = ticket.fullName;
        });
    }
    if(ticket.email){
        fullEmailDisplay.textContent = ticket.email;
    }

    if(ticket.githubUser){
        githubProfile.textContent = ticket.githubUser;
    }

    if(ticket.currentDate){
        todaysDate.textContent = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    ticketNumber.textContent = '#' + ticket.ticketID;

})