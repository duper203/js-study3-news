const API_KEY = "3d39a63aab7a449389159ce1efc1a684"
let news=[]
const getLatestNews=async()=>{
    const url= new URL(
        `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
    );
    console.log("uuu", url);
    const response= await fetch(url);
    const data = await response.json();
    news=data.articles;
    console.log("iii", data);
};


getLatestNews();


