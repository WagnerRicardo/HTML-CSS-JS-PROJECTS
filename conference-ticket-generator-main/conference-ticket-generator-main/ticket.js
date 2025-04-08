document.addEventListener('DOMContentLoaded', handleTicketPage);

//DOM elements

const ticketHeader = document.querySelector('.ticketHeader');
const ticketAvatarImg = document.querySelector('#ticketAvatarImg');
const fullNameDisplay = document.querySelectorAll('.fullNameDisplay');
const fullEmailDisplay = document.querySelector('#fullEmailDisplay');
const githubProfile = document.querySelector('.githubProfile p');
const githubProfileLink = document.querySelector('.githubProfile a');
const ticketNumber = document.querySelector('.ticketNumber p');
const todaysDate = document.querySelector('.todaysDate');
const currentLocation = document.querySelector('.currentLocation');

//ticket obj

let ticket = null;

try {
    ticket = JSON.parse(sessionStorage.getItem('ticketData'));
} catch (e) {
    console.error("Invalid ticket data in sessionStorage:", e);
}

function githubLink(tag){
    let link = tag.replace('@', '');
    return `https://github.com/${link}`
}

function handleTicketPage(){
    //validation
    if(!(sessionStorage.getItem('accesValidation')) || !ticket){
        location.href = 'index.html?acessError=FormNotFilled';
    }
    if(ticket?.avatar){
        ticketAvatarImg.src = ticket.avatar;
    }
    if(ticket?.fullName){
        fullNameDisplay.forEach(element => {
        element.textContent = ticket.fullName;
        });
    }
    if(ticket?.email){
        fullEmailDisplay.textContent = ticket.email;
    }

    if(ticket?.githubUser){
        githubProfile.textContent = ticket.githubUser;
        githubProfileLink.href = githubLink(ticket.githubUser);
    }

    const parsedDate = new Date(ticket.currentDate);

    if(ticket?.currentDate){
        todaysDate.textContent = parsedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    ticketNumber.textContent = `#${ticket?.ticketID}`;

}