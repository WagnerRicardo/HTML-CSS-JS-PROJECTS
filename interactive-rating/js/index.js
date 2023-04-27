function onsub(event){
    event.preventDefault()
    var rating = form['rating'].value
    if (rating != 0){
        console.log(rating)
        sessionStorage.setItem("rate", rating);
        location.href = 'thanks.html'    
    }
}
//adding an event on submit if a form exists
if (document.forms[0]){
    var form = document.forms['form']
    form.addEventListener("submit", onsub) 
}
//displaying the rating on the thanks page
if(document.getElementById('rateValue')){
    let span = document.getElementById('rateValue')
    let rate = sessionStorage.getItem('rate')
    span.innerHTML = rate
}