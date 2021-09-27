// It's common to write utility functions or even classes, then export what you want people to use

const guitaristOptions = [
    { name: "Jeff Loomis", image: "https://www.ultimate-guitar.com/static/article/news/5/66485_0_wide_ver1505394095.jpg" },
    { name: "B.B. King", image: "https://www.chicagotribune.com/resizer/jE-UU3MmUBjFZ01zqp4evh5EKWM=/1200x0/top/arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/4ZT7Y5FTQZDTVJDOWS3PJ2H3NY.jpg" },
    { name: "Plini", image: " https://upload.wikimedia.org/wikipedia/commons/2/20/Plini248_300x_RG.jpg" },
    { name: "Adam Jones", image: "https://m.media-amazon.com/images/M/MV5BYzk3ODhiMmEtMTcxYy00OGI0LWJiY2QtZDYzOTc0Y2ViMzNjXkEyXkFqcGdeQXVyMjUyNDk2ODc@._V1_.jpg" },
    { name: "Sarah Longfield", image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Sarah_Longfield_and_her_signature_Strandberg_Boden_8_string_%28cropped%29.jpg" },
    { name: "Ikkyu Nakajima", image: "https://thumbs.dreamstime.com/b/tricot-singer-ikkyu-nakajima-band-performance-festival-rock-people-hradec-kralove-czech-republic-july-51791035.jpg" },
    { name: "Orianthi", image: " https://guitar.com/wp-content/uploads/2020/11/Orianthi-Studio-Chris-Ace-17@1400x1050.jpg" },
    { name: "Brittany Howard", image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2016_07/1418576/160124-nbcblk28-howard.jpg" },
    { name: "Josh Homme", image: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_49/2256226/171210-josh-homme-se-140p.jpg" },
    { name: "Guthrie Govan", image: "https://cdn.mos.cms.futurecdn.net/AE8GWzw956JWAfZthtpJ67.jpg" }
];

let workingList = [...guitaristOptions];

let getGuitarist = () => {
    let selection = Math.floor(Math.random() * workingList.length);
    let ret = workingList[selection];
    workingList.splice(selection, 1);
    if (workingList.length <= 0) {
        workingList = [...guitaristOptions];
    }
    console.log(ret);
    return ret;
}

// This exports both the getGutiarist function and the guitaristOptions const
// The guitaristOptions const is being renamed to master, so end users will have to import master
export { getGuitarist, guitaristOptions as master };