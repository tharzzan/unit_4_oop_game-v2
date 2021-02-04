const game = new Game()

const startButton = document.getElementById('btn__reset')
const qwerty = document.getElementById('qwerty')


//#region ------- addEventListener  
startButton.addEventListener('click', () => {
    game.startGame()
})


qwerty.addEventListener('click', (event) => {

    if ((game.ready) && (event.target.tagName === 'BUTTON')) {
        game.handleInteraction(event.target.textContent)
    }
})


window.addEventListener('keyup', (event) => {
    const regex = /^[a-z]$/i
    
    if ((game.ready) && (regex.test(event.key))) {
        game.handleInteraction(event.key)
    }
})
//#endregion