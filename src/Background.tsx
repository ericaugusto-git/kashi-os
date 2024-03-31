import wallpaer from './assets/wallpaper.mp4'


function Background(){
    return (
        <video autoPlay muted loop id="myVideo">
        <source src={wallpaer} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
}

export default Background;