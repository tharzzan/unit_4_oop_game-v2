class Game {
    constructor() {
        this.missed = 0
        this.phrases = ['Michael Sunday', 'Gabriel Monday', 'Uriel Tuesday', 'Raphael Wednesday', 'Selaphiel Thursday']
        this.activePhrase = null
        this.ready = false
    }
    

    startGame() {
        // hides the start screen overlay & set game ready status = true
        document.getElementById('overlay').style.display = 'none'
        this.ready = true

        // sets the activePhrase property with the chosen phrase Object & display it
        this.activePhrase = new Phrase(this.getRandomPhrase())
        this.activePhrase.addPhraseToDisplay()
    }


    /**
     * randomly retrieves one of the phrases stored in the phrases array and returns it
     * @returns {string} the chosen random phrase
     */
    getRandomPhrase() {
        const chosenIdx = Math.floor(Math.random() * this.phrases.length)

        return this.phrases[chosenIdx]
    }


    /**
     * this method checks to see if the button clicked by the player matches a letter in the phrase, and then directs the game based on a correct or incorrect guess
     */
    handleInteraction(char) {
        function changePressedKeyProp(prop, value) {
            const keyButtons = document.querySelectorAll('.key')

            for (const eachKey of keyButtons) {
                if (eachKey.textContent === char) {
                    eachKey[prop] = value
                }
            }
        }

        // 1. Disable the selected letter’s onscreen keyboard button
        changePressedKeyProp('disabled', true)
        
        // 2. Check whether the user guessed correctly or not
        if (this.activePhrase.checkLetter(char)) {
            changePressedKeyProp('className', 'key chosen')
            this.activePhrase.showMatchedLetter(char)
        }
        else {
            changePressedKeyProp('className', 'key wrong')
            this.removeLife()
        }

        // 3. Check whether it's game over or not
        if (this.checkForWin()) {
            this.gameOver('win')
        }
        else if (this.missed === 5) {
            this.gameOver('lose')
        }
    }


    /**
     * removes a life from the scoreboard
     */
    removeLife() {
        const heartIcons = document.querySelectorAll('.tries>img')

        heartIcons[this.missed].src = 'images/lostHeart.png'
        this.missed++
    }


    /**
     * this method checks to see if the player has revealed all of the letters in the active phrase
     * @returns {boolean} TRUE if the player has revealed all of the letters
     */
    checkForWin() {
        const notYetGuessedLis = document.querySelectorAll(`li.hide`)
        return notYetGuessedLis.length === 0
    }

    
    /**
     * this method displays the original start screen overlay, and updates the overlay with a friendly win or loss message
     */
    gameOver(condition) {
        const overlay = document.getElementById('overlay')
        const gameOverMsg = document.getElementById('game-over-message')

        // displays the original start screen
        overlay.style.display = ''

        if (condition === 'win') {
            gameOverMsg.textContent = 'Hooray!! You won...'
            overlay.className = 'win'
        }
        else if (condition === 'lose'){
            gameOverMsg.textContent = 'Oww no, please try again...'
            overlay.className = 'lose'
        }

        this.resetGame()
    }


    resetGame() {
        const ulPhrase = document.querySelector('#phrase>ul')
        const keyButtons = document.querySelectorAll('.key')
        const heartIcons = document.querySelectorAll('.tries>img')

        // 1. remove old-phrase's lis
        ulPhrase.innerHTML = ''

        // 2. reset all the keyboard buttons
        for (const eachKey of keyButtons) {
            eachKey.disabled = false
            eachKey.className = 'key'
        }

        // 3. reset the heart icons
        for (const icon of heartIcons) {
            icon.src = 'images/liveHeart.png'
        }

        // 4. reset the Game object
        this.activePhrase = null
        this.missed = 0
        this.ready = false
    }
}