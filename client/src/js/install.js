const butInstall = document.getElementById('buttonInstall');


window.addEventListener('beforeinstallprompt', (event) => {
    window.defferedPrompt = event;
}); 


butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;
    
    if(!promptEvent){
        return;
    }
    promptEvent.prompt();
    window.defferedPrompt= null;
});


window.addEventListener('appinstalled', (event) => {

    window.defferedPrompt = null;
});
