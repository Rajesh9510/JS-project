const quotetext=document.querySelector(".quote");
const author=document.querySelector(".author .name");
 const btn=document.querySelector("button");
const sound=document.querySelector(".sound");
const copy=document.querySelector(".copy");

btn.addEventListener("click",random=>
{
        btn.innerHTML="Loading.."
        fetch("https://api.quotable.io/random").then(res=>res.json()).then(result=>{
            
            quotetext.innerHTML=result.content;
            author.innerHTML=result.author;
            btn.innerHTML="New Quote";
        });
});
sound.addEventListener("click",()=>{
    let speak=new SpeechSynthesisUtterance(`${quotetext.innerHTML}`);
    speechSynthesis.speak(speak);
})
copy.addEventListener("click",()=>
{
    navigator.clipboard.writeText(quotetext.innerHTML);
})
