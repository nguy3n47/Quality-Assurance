import { americanOnly } from './american-only.js';
import { britishOnly } from './british-only.js';
import { americanToBritishSpelling } from './american-to-british-spelling.js';
import { americanToBritishTitles } from './american-to-british-titles.js';

let selector = document.querySelector('#locale-select')
let translateButton = document.querySelector('#translate-btn')
let textBox = document.querySelector('#text-input')
let translatedBox = document.querySelector('#translated-sentence')
let errorBox = document.querySelector('#error-msg')
let clearButton = document.querySelector('#clear-btn')

let mode = 'american-to-british'
let translationList = []
Object.keys(americanOnly).forEach((key) =>{
	translationList.push([
		key, americanOnly[key]
	])
})
Object.keys(americanToBritishSpelling).forEach((key) =>{
	translationList.push([
		key,
		americanToBritishSpelling[key]
	])
})
Object.keys(americanToBritishTitles).forEach((key) =>{
	translationList.push([
		key,
		americanToBritishTitles[key]
	])
})
Object.keys(britishOnly).forEach((key) =>{
	translationList.push([
		britishOnly[key],
		key
	])
})
console.log('Translation List :')
console.log(translationList)

let translate = () => {

	errorBox.innerText = ''
	if(textBox.value === ''){
		errorBox.innerText = 'Error: No text to translate.'
		return
	}
	
	let newString = textBox.value

	if(mode === 'american-to-british'){
		translationList.forEach((term) => {
			newString = newString.replace(term[0], "<span class='highlight'>" + term[1] + "</span>")
		})
	}else{
		translationList.forEach((term) => {
			newString = newString.replace(term[1], "<span class='highlight'>" + term[0] + "</span>")
		})
	}

	let timeRegex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g

	let times = newString.match(timeRegex)
		if(times){
			times.forEach((time) => {
				if(mode === 'american-to-british'){
					newString = newString.replace(time, "<span class='highlight'>" + time.replace(':', '.') + "</span>")
				}else{
					newString = newString.replace(time, "<span class='highlight'>" + time.replace('.', ':') + "</span>")
				}
			})
		}

	if(newString == textBox.value){
		translatedBox.innerText = 'Everything looks good to me!'
		return
	}
	translatedBox.innerHTML = newString
}

translateButton.onclick = translate

selector.onchange = () => {
	mode = selector.value
	console.log('Mode changed to ' + mode)
}

clearButton.onclick = () => {
	textBox.value = ''
	translatedBox.innerHTML = ''
	errorBox.innerText = ''
}

/* 
  Export your functions for testing in Node.
  Note: The `try` block is to prevent errors on
  the client side
*/
try {
  module.exports = {

  }
} catch (e) {}