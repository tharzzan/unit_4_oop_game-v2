class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }


    /**
     * adds letter placeholders to the display when the game starts
     */
    addPhraseToDisplay() {
        for (const char of this.phrase) {
            const newLi = document.createElement('li')
            
            if (char === ' ') {
                newLi.className = 'space'
                newLi.textContent = ' '
            }
            else {
                newLi.className = `hide letter ${char}`
                newLi.textContent = char
            }

            document.querySelector('#phrase>ul').appendChild(newLi)
        }
    }


    /**
     * checks to see if the letter selected by the player matches a letter in the phrase
     * 
     * @param {string} char - the letter that's guessed by the user
     * @returns {boolean} TRUE if what user guessed matched what's in the phrase
     */
    checkLetter(char) {
        return this.phrase.includes(char.toLowerCase())
    }

    
    /**
     * reveals the letter(s) on the board that matches the player's selection
     * 
     * @param {string} char - letter that's correctly guessed by the user
     */
    showMatchedLetter(char) {
        const matchedLis = document.querySelectorAll(`li.letter.${char}`)

        for (const eachLi of matchedLis) {
            eachLi.className = `show letter ${char}`
        }
    }
}