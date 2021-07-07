//** Focus on the name field when the page first load */
const inputName = document.querySelector('#name');
inputName.focus();
/**----------------------------- */

/**OTHER JOB
 * If other is clicked in the job list, and input field will be display in the page where the user can put the job */
const otherJob = document.querySelector('#other-job-role');
otherJob.style.display= 'none';
const jobOptions = document.querySelector('#title');
let objects= jobOptions.getElementsByTagName('OPTION')[6];
jobOptions.addEventListener('change', (e) => {
    let clicked= e.target.value;
    if(clicked==="other"){
        otherJob.style.display = 'block';
    }else{
        otherJob.style.display = 'none';
    }

})

/**----------------------------- */

/**T-SHIRT COLOR
 * Changes the color options for the shirts depending which style of shirt is selected*/
const shirtDesign = document.querySelector('#design');
const shirtColor = document.querySelector('#color');
const colorOptions = shirtColor.children;
shirtColor.disabled = true;
shirtDesign.addEventListener('change', (e) => {
    shirtColor.disabled = false;
    for(i=0;i<colorOptions.length;i++){
        let selectedOption = colorOptions[i];
        let clicked= e.target.value;
        let attribute = selectedOption.getAttribute('data-theme');
        if(clicked===attribute){
            selectedOption.hidden = false;
            selectedOption.select = true ;
        } else if (clicked !== attribute){
            selectedOption.hidden= true;
            selectedOption.select= false;
        }
    }
})

/**----------------------------- */
/**PRICE OF THE ACTIVITIES FIELD
 * Every time a activity field is selected, its price will be added to the total cost */
const activitiesFieldSet = document.querySelector('#activities');
const pTotal = activitiesFieldSet.querySelector('#activities-cost');
let totalCost = 0;
activitiesFieldSet.addEventListener('change', (e) =>{
   
         
    let dataCost= +(e.target.getAttribute('data-cost'));
    if(e.target.checked===true){
        totalCost += dataCost;
        
    }else if(e.target.checked===false){
        totalCost-= dataCost;
     }
    pTotal.innerHTML = `$ ${totalCost}`


})
/**----------------------------- */
/**PAYMENT SELECTION
 * In the payment section, when PayPal/BitCoin is clicked, the credit card info inputs will disappear
 * When PayPal is selected, an information box will appear
 * When BitCoin is selected, an information box will appear
 * If Creadit Card is selected, inputs fields for credit card ifnormation will appear
 */

const paymentSelect = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const creditCardBox = document.querySelector('.credit-card-box');
const expirationBox = document.querySelector('.expiration-box');
paypal.style.display= 'none';
bitcoin.style.display= 'none';
paymentSelect.children[1].setAttribute("selected", true);

paymentSelect.addEventListener('change', (e)=>{
    let clicked= e.target.value;
    if(clicked==="credit-card"){
        creditCardBox.style.display= 'flex';
        expirationBox.style.display= 'flex';
    }
    if(clicked==="paypal"){
        paypal.style.display= 'block';
        bitcoin.style.display= 'none';
        creditCardBox.style.display= 'none';
        expirationBox.style.display= 'none';
    }else if(clicked==='bitcoin'){
        bitcoin.style.display= 'block';
        paypal.style.display= 'none';
        creditCardBox.style.display= 'none';
        expirationBox.style.display= 'none';
    }
})
 
/**----------------------------- */
/**Variables used for validation */
inputName
const inputEmail = document.querySelector('#email');
activitiesFieldSet
const cardNumber = document.querySelector('#cc-num');
const userZip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');
const form = document.querySelector('form');
/**----------------------------- */

/** NAME INPUT
 * Adds an event listener for the Input Name box. REAL TIME ERROR MESSAGE
 * If the name input value is not empty, the valid style will be added to the input box 
 * If the name input value is empty, the not-valid style will be added and a hint will be displayed telling the user what to do
 */
inputName.addEventListener('keyup', (e)=>{
    const hint =inputName.parentElement.lastElementChild;
    
    let nameValue = inputName.value;
    let nameTest= "";
    if(nameValue!=''){
        nameTest= true;
        inputName.parentNode.classList.remove('not-valid');
        inputName.parentNode.classList.add('valid');
        hint.style.display= "none";
        
    }else{
        inputName.parentNode.classList.remove('valid');
        inputName.parentNode.classList.add('not-valid');
        hint.style.display= "block";
        e.preventDefault();
        nameTest=false;
    }
    if(nameTest===false){
        e.preventDefault()
    }
    })
/**----------------------------- */
/**EMAIL INPUT
 * An event listener is added to the Input Email Box. REAL TIME ERROR MESSAGE
 * If the Email input is empty, a hint will be displayed. CONDITIONAL ERROR MESSAGE
 * If the email value is equal to the email regex, the valid style will be added to the input box 
 * If the email value is not equal to the email regex, the not-valid style will be added to the input box  and a different hint will be displayed
 */
inputEmail.addEventListener('keyup', (e)=>{
    const hint = inputEmail.parentElement.lastElementChild;
    let emailValue = inputEmail.value;
    const emailRegex = /\w+@[a-z]+(.com)+/ig;
    const valid = emailRegex.test(emailValue);

    if(!emailValue){
        hint.innerHTML = "Email cannot be empty";
    }else{
        if(valid){
            inputEmail.parentNode.classList.remove('not-valid');
            inputEmail.parentNode.classList.add('valid');
            hint.style.display= "none";
        }else{
            inputEmail.parentNode.classList.remove('valid');
            inputEmail.parentNode.classList.add('not-valid');
            hint.style.display= "block";
            e.preventDefault()
         }
    }
    
});
/**----------------------------- */
/**ACTIVITIES BOX
/**Creates a function that if at least one activity box is checked, the valid style is added to the legend of the field
 * If any activity box is checked, the not-valid style will be added instead and a hint will appear
 */
const activitiesBoxes = document.querySelector('#activities-box').children;
const activitiesBox = document.querySelector('#activities-box')
const legend = activitiesFieldSet.querySelector('legend')
const hint = activitiesBox.parentElement.lastElementChild;

function activitiesValidation(e){
    
    count = 0
    for (let i = 0; i < activitiesBoxes.length; i++) {
      if (activitiesBoxes[i].getElementsByTagName('input')[0].checked === true) {
        count +=1;
        legend.classList.remove('not-valid');
        legend.classList.add('valid');
        hint.style.display= "none";
          }   
    }if(count<1){
    legend.classList.remove('valid');
    legend.classList.add('not-valid');
    hint.style.display= "block"
    e.preventDefault();
    }
    return count > 0;
}
/**----------------------------- */
/**PAYMENT VALIDATION
 * Creates a function that uses regex to validate the card, cvv, and zip code inputs
 */
function paymentValidation(e){
    /**Validates the card input with the regex and adds the valid/not-valid class depending if the input is false or true
     * Displays the hint depending if its true or false
     */
    let cardValue = cardNumber.value;
    const hint = cardNumber.parentElement.lastElementChild;
    const creditCardRegex = /^[0-9]{13,16}$/;
    const validCard = creditCardRegex.test(cardValue);
    if(validCard===true){
        cardNumber.parentNode.classList.remove('not-valid');
        cardNumber.parentNode.classList.add('valid');
        hint.style.display= "none";
    }
    if(validCard===false){
        e.preventDefault()
        cardNumber.parentNode.classList.remove('valid');
        cardNumber.parentNode.classList.add('not-valid');
        hint.style.display= "block"
    }
    /**----------------------------- */
    /**Validates the Zip input with the regex and adds the valid/not-valid class depending if the input is false or true
     * Displays the hint depending if its true or false
     */
    let zipValue = userZip.value;
    const zipHint = userZip.parentElement.lastElementChild;
    const zipRegex = /^[0-9]{5}$/
    const validZip = zipRegex.test(zipValue);
    if(validZip===true){
        userZip.parentNode.classList.remove('not-valid');
        userZip.parentNode.classList.add('valid');
        zipHint.style.display= "none";
    }
    if(validZip===false){
        userZip.parentNode.classList.remove('valid');
        userZip.parentNode.classList.add('not-valid');
        zipHint.style.display= "block";
        e.preventDefault()
    }
    /**----------------------------- */
    /**Validates the cvv input with the regex and adds the valid/not-valid class depending if the input is false or true
     * Displays the hint depending if its true or false
     */
    let cvvValue = cvv.value;
    const cvvHint = cvv.parentElement.lastElementChild;
    const cvvRegex = /^[0-9]{3}$/;
    const validCvv = cvvRegex.test(cvvValue);
    if(validCvv===true){
        cvv.parentNode.classList.remove('not-valid');
        cvv.parentNode.classList.add('valid');
        cvvHint.style.display= "none";
    }
    if(validCvv===false){
        cvv.parentNode.classList.remove('valid');
        cvv.parentNode.classList.add('not-valid')
        cvvHint.style.display= "block";
        e.preventDefault()
    }
}
/**----------------------------- */
/**CALLS HTE FUNCTIONS BELOW */
form.addEventListener('submit', (e)=>{
    activitiesValidation(e);
    paymentValidation(e);
 })
 /**----------------------------- */
/**ACCESIBILITY */
/**Creates a function that adds and removes the focus style(Makes the selected activity box more obvious for the users) on the activities boxes */
activitiesBoxes
function focusClass(){
    for(let i=0;i<activitiesBoxes.length;i++){
        const checkbox = activitiesBoxes[i].getElementsByTagName('input')[0];
        checkbox.addEventListener("focus", (e)=>{
            e.target.parentNode.classList.add('focus');
        });
        checkbox.addEventListener('blur', (e=>{ 
            e.target.parentNode.classList.remove('focus');
        }));
    };
};
/**----------------------------- */
/**PREVENTS THE USER SELECTING ACTIVITIES THAT HAVE THE SAME DAY AND TIME */
/**Creates a function that if a clicked activity box has the same date and time that another, will disable the latter*/
function activitiesPrevent(){
    activitiesFieldSet.addEventListener('change', (e) => {
        const input = e.target;
        const attribute = input.getAttribute('data-day-and-time');

        for (let i = 0; i < activitiesBoxes.length; i++) {
            const checkbox = activitiesBoxes[i].getElementsByTagName('input')[0];
            checkboxType = checkbox.getAttribute("data-day-and-time");
            
            if(attribute === checkboxType && input !== checkbox){
                checkbox.disabled ? checkbox.disabled = false : checkbox.disabled = true;
            };
        };
    });
};
/**Calls both functions below */
focusClass();
activitiesPrevent();