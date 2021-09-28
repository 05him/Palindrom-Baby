function dateNumToStr(date){
    let dateStr={ day:"", month:"", year:""};
    if(date.day<10){
        dateStr.day = "0"+date.day;
    }
    else{
        dateStr.day= date.day.toString();
    }
    if(date.month<10){
        dateStr.month="0"+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

function strPalin(str){
    let arr=str.split("");
    let reverArr=arr.reverse();
    let reverStr = reverArr.join("");
    return str===reverStr;
}
function datePalin(date){
    let finalDate= dateNumToStr(date);
    let ddmmyyyy =finalDate.day + finalDate.month + finalDate.year ;
    let mmddyyyy= finalDate.month + finalDate.day + finalDate.year;
    let yyyymmdd= finalDate.year + finalDate.month + finalDate.day;
    let ddmmyy= finalDate.day + finalDate.month + finalDate.year.slice(-2);
    let mmddyy = finalDate.month + finalDate.day + finalDate.year.slice(-2);
    let yymmdd = finalDate.year.slice(-2) + finalDate.month + finalDate.day;
    let allDatesToStr = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
    for( let n of allDatesToStr){
        if(strPalin(n)){
            return true;
        }
    }
    return false;
}
function leapYear(year){ 
    if(year%400){return true;}
    else if(year%100){return true;}
    else if(year%4){return true;}
    else{return false;}
}
function nextDate(date){
    let finalDate={day:"",month:"",year:""}
    let daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];
    if(date.month ===2){
        if(leapYear(date.year)){
            if(date.day<=28){
                finalDate.day= date.day+1;
                finalDate.month= date.month;
            }
            else if (date.day===29){
                finalDate.day=1;
                finalDate.month=date.month+1;
            }
        }
        else {
            if(date.day===28){
                finalDate.day=1;
                finalDate.month=date.month+1;
            }
            else{
                finalDate.day=date.day+1;
                finalDate.month=date.month;
            }
        }
        finalDate.year=date.year;
    }
    else{
        if(date.day===daysInMonth[date.month-1]){
            finalDate.day=1
            if(date.month===12){
                finalDate.month=1;
                finalDate.year= date.year+1;
            }
            else{
                finalDate.month= date.month+1;
                finalDate.year= date.year;
            }       
        }
        else{
            finalDate.day=date.day+1;
            finalDate.month= date.month;
            finalDate.year=date.year;
        }
    }
    return finalDate;
} 
function nextPalin(date){
let otherDate = nextDate(date);
let nextTemp=1;
    while(1){
       if(datePalin(otherDate)){
           let result=[nextTemp,otherDate];
           return result;
       }
       else{
           otherDate = nextDate(otherDate);
           nextTemp+=1;
        
       }
    }
}
function preDate(date){
    let finalDate= {day:"", month:"", year:""}
    let daysInMonth =[31,28,31,30,31,30,31,31,30,31,30,31];
    if (date.day===1){
        finalDate.day=daysInMonth[date.month-2];
        if(date.month===1 ){
         finalDate.day=31;
        finalDate.month=12;
        finalDate.year=date.year-1;
        }
        else if(date.month===3){
            if(leapYear(date.year)){
                finalDate.day=29;
            }
            else{
                finalDate.day=28;
            }
        finalDate.month=date.month-1;
         finalDate.year=date.year;
        }
        else{
        finalDate.month=date.month-1;
        finalDate.year=date.year;
        }
        return finalDate;
    }
    else{
        finalDate.day=date.day-1;
        finalDate.month=date.month;
        finalDate.year=date.year;
        return finalDate;
    }
}
function prePalin(date){
let otherDate = preDate(date);
let preTemp = 1;
while(1){
    if(datePalin(otherDate)){
        return  [preTemp,otherDate];
    }
    else{
        otherDate=preDate(otherDate);
        preTemp+=1;
    }
}
}

let checkDate = {
    day:"",
    month:"",
    year:""
}
let userDate = document.querySelector('#userInput');
let p = document.querySelector('p');
let frm = document.querySelector('form');
let clrBtn = document.querySelector('.clear-btn');
let gif = document.querySelector('.processing-gif');
let footer = document.querySelector('footer');
gif.style.display="none";
clrBtn.addEventListener('click',()=>{
   p.innerText="";
   userDate.value="";
   p.style.display="none";
})
frm.addEventListener('submit',(e)=>{
    e.preventDefault();
    checkDate.day=Number(userDate.value.split("-")[2]);
    checkDate.month=Number(userDate.value.split("-")[1]);
    checkDate.year = Number(userDate.value.split("-")[0]);
    footer.style.marginTop="20vh";
    gif.style.display="block";
    p.innerText="Finding Palindrome with all the Nano Particles on the Earth"
    setTimeout(()=>{
        gif.style.display="none";
        footer.style.marginTop="1rem";
            if(datePalin(checkDate)){
                p.innerText="Yeee🤩🤩, You are a Palindrome Baby";
            }
            else{
            let nextPalinResult=nextPalin(checkDate);
            let prePalinResult = prePalin(checkDate);
                if(nextPalinResult[0]<prePalinResult[0]){
                p.innerText=`Naah u are not a Palindrome Baby😥. The closest Palindrome is in the future at ${nextPalinResult[0]} days that is  ${nextPalinResult[1].month}/${nextPalinResult[1].day}/${nextPalinResult[1].year}`;
                }
                else if (prePalinResult[0]<nextPalinResult[0]){
                p.innerText=`Naah you are not a Palindrome Baby 😥 and nearest palindrome is in the past at ${prePalinResult[0]} days that is ${prePalinResult[1].month}/${prePalinResult[1].day}/${prePalinResult[1].year}`;
                }
                else if (prePalinResult[0]===nextPalinResult[0]){
                p.innerText=`Naah you are not a Palindrome Baby 😥, there are 2 nearest palindrome on before one day and the other after one day`;
                }
            }
        },4000)
})


