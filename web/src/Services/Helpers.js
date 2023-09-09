export function hideFooterAndHeader(){
    document.getElementById('header').style.display = "none";
    document.getElementById('footer').style.display = "none";
}


export function ParseDate(date){
    let res = date?.slice(0,10);
    let year = res?.slice(0,4);
    let day = res?.slice(8,10);
    let month = res?.slice(5, 7);
    

    switch(+month){
        case 1:{
            res = `Січень ${day}, ${year}`
            break;
        }
        case 2 :{
            res = `Лютий ${day}, ${year}`
            break;
        }
        case 3 :{
            res = `Березень ${day}, ${year}`
            break;
        }
        case 4 :{
            res = `Квітень ${day}, ${year}`
            break;
        }
        case 5 :{
            res = `Травень ${day}, ${year}`
            break;
        }
        case 6 :{
            res = `Червень ${day}, ${year}`
            break;
        }
        case 7 :{
            res = `Липень ${day}, ${year}`
            break;
        }
        case 8 :{
            res = `Серпень ${day}, ${year}`
            break;
        }
        case 9 :{
            res = `Вересень ${day}, ${year}`
            break;
        }
        case 10 :{
            res = `Жовтень ${day}, ${year}`
            break;
        }
        case 11 :{
            res = `Листопад ${day}, ${year}`
            break;
        }
        case 12 :{
            res = `Грудень ${day}, ${year}`
            break;
        }
        default: console.log("hello");
    }
    console.log(res);
    return res;
}