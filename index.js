
async function getBackgroundImage(){
    const res = await fetch('https://picsum.photos/1920/768?grayscale');
    const blob = await res.blob(); 
    const url = await URL.createObjectURL(blob); 
    document.body.style.backgroundImage = `url(${url})`
}
getBackgroundImage(); 