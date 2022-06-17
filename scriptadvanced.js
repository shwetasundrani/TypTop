const typingText = document.querySelector(".typing-text p"),
inpField=document.querySelector(".wrapper .input-field"),
timeTag=document.querySelector(".time span b")
mistakesTag=document.querySelector(".mistakes span"),
wpmTag=document.querySelector(".wpm span"),
cpmTag=document.querySelector(".cpm span"),
tryAgainBtn= document.querySelector("button");

let timer;
maxTime=30,
timeLeft =maxTime,
charIndex = mistakes = isTyping=0;
function randomParagraph()
{
        //getting random number and it will always less than the paragraph length
    let randIndex=Math.floor(Math.random()*paragraphs.length)
    typingText.innerHTML="";
    //getting random item from the paragraphs array,splitting all characters
    //of it ,adding each character inside span and then adding this span inside p tag
    paragraphs[randIndex].split("").forEach(span =>
        {
                let spanTag=`<span>${span}</span>`;
                typingText.innerHTML+=spanTag;
        });
        typingText.querySelectorAll("span")[0].classList.add("active");
        //focusing input feild on keydown or click event
document.addEventListener("keydown",() => inpField.focus());
typingText.addEventListener("click",() => inpField.focus());

}
function initTyping()
{
        const  characters = typingText.querySelectorAll("span");
        let typedChar=inpField.value.split("")[charIndex];
        if(charIndex < characters.length-1 && timeLeft > 0)
        {
          if(!isTyping)
        //once the timer start it wont restarts either we write further or clear the text
        {
                timer=setInterval(initTimer,1000);
                isTyping=true;
        }
        
        //if the user has not entered any character or pressed backspace
        if(typedChar==null)
        {
                charIndex--;
                //decreament the mistakes only if the charIndex span contains incorrect
                if(characters[charIndex].classList.contains("incorrect"))
                {
                        mistakes--;
                }
                characters[charIndex].classList.remove("correct","incorrect")
        }
        else
        {
                if(characters[charIndex].innerText === typedChar)
        {
                //if user typed character and shown character matched then add the
                //correct class elseincreament the mistakes and  add the incorrect class
                characters[charIndex].classList.add("correct");
        }
        else
        {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
        }
        charIndex++;

        }
        
        //increament charIndex either user typed correct or incorrect character
        
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime-timeLeft)) * 60);
        //if wpm is 0, empty or infinity then setting its value to 0
        wpm=wpm < 0 || !wpm || wpm=== Infinity ? 0 : wpm;
        mistakesTag.innerText = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText=charIndex - mistakes;
        }
        else
        {
                clearInterval(timer);
        }
}
function initTimer()
{
        //if timeleft is greater than 0 then decreament the timeleft else clear the timeleft
        if(timeLeft>0)
        {
                timeLeft--;
                timeTag.innerText=timeLeft;
        }
        else{
                inpField.value="";
                clearInterval(timer);
        }
}

function resetGame()
{
        //calling load paragraph fuction and
        // resetting each  variables and elements value to default
        randomParagraph();
        inpField.value="";
        clearInterval(timer);
        timeLeft =maxTime,
        charIndex = mistakes = isTyping=0;
        timeTag.innerText=timeLeft;
        mistakesTag.innerText = mistakes;
        wpmTag.innerText = 0;
        cpmTag.innerText=0;
}
randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click",resetGame);