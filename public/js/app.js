const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit' , (e)=> {
    e.preventDefault();
    const location = search.value;   
    if(!location){
        return (msg1.textContent = 'Please enter the location.',  
               msg2.textContent ='')      
    }
    const loc = 'http://localhost:3000/weathers?address=' + location;    
    fetch(loc).then((response) => {
        return response.json()
    }).then((data) => {        
        msg1.textContent = data.forecast;
        msg2.textContent = data.location;
    })
})
