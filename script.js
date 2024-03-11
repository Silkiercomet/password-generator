/* slider styled track */
for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}
/* slider styled track */

/*variables*/
const displayedLength = document.querySelector("#length")
const sliderValue = document.querySelector("#passwordlength")

/* Display current asked length */
  sliderValue.addEventListener("change", function(e){

    displayedLength.textContent = e.target.value
  })
/* Display current asked length */

/* checkboxes */

let options = ["uppercase"]

const checkboxesQuery = Array.from(document.querySelectorAll("input[type=checkbox]"))

checkboxesQuery.forEach(e => {
  e.addEventListener("click", function(e){

    if(e.target.checked){
      options.push(e.target.id)
    }else{
      options = options.filter(option => option !== e.target.id)
    }
  })
})

/* checkboxes */

/* generate password */
const optionsVariables = {
  uppercase : "ABCDEFGHIJKLMNOPQRSTUVXYZ",
  lowercase : "abcdefghijklmnopqrstuvxyz",
  numbers : "0123456789",
  symbols : "£$&()*+[]@#^-_!?"
}
const passwordForm = document.querySelector("#form")
const displayedPasword = document.querySelector("#generatePassword")
passwordForm.addEventListener("submit", function(e){
  e.preventDefault()
  if(!options) return
  let newPassword = ""
  for(let i = 0; i < sliderValue.value-1; i++){
    const selectedOption = options[Math.floor(Math.random() * options.length)]
    const workingOption = optionsVariables[selectedOption]
    newPassword += workingOption[[Math.floor(Math.random() * workingOption?.length)]]
  }
  displayedPasword.value = newPassword
  checkPassword(newPassword)
  // for valueInSlider -> randomNumberForoptions -> random number for option var 
})

/* generate password */

/* test password for score */
const scoreText = ["Super Weak", "Weak", "Medium", "Strong"]
const getScore = Array.from(document.querySelectorAll(".passwordStrength"))
const scoreDisplayedText = document.querySelector("#resultScore")
const checkPassword = (password) => {
  const score = zxcvbn(password).score
  getScore.forEach((bar, i) => {
    if(i < score){
      bar.classList.add("yellow")
    }else{
      bar.classList.remove("yellow")
    }
  })
}

/* test password for score */

/* copy to clipboard */
const copyBtn = document.querySelector("#clipboard")
const modal = document.querySelector(".modal")
copyBtn.addEventListener("click", function(e){
  copyToClipboard(displayedPasword)
})
async function copyToClipboard(inputElement) {
  // Copy the text inside the input element
  console.log(inputElement.value)
  try {
      await navigator.clipboard.writeText(inputElement.value);
      modal.classList.add("modalActive")
      setTimeout(function(){
        modal.classList.remove("modalActive")
      },1000)

  } catch (err) {
      console.error('Failed to copy text: ', err);
  }
 
}
