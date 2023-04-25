function onsub(event){
    event.preventDefault()
    var rating = form['rating'].value
    console.log(rating)
    location.href = 'thanks.html'
}

if (document.forms[0]){
    var form = document.forms['form']
    form.addEventListener("submit", onsub) 
}