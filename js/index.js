window.onload = () => {
    document.getElementById('startButton').onclick = () => {
        game.init();
    };
    
    const button = document.getElementById('startButton')
    
    const audio = new Audio('./sounds/music.mp3')
    
    
    
    button.onclick = function () {
        button.style.display = "none"
        audio.play()
        game.init()
    }
};






