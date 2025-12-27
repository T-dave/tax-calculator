const tax = document.querySelector("#tax");
const quantity = document.querySelector("#quantity");
const enter = document.querySelector("#calculate-btn");
const clear = document.querySelector("#clear-btn");
const label = document.querySelector(".label");
function money(val){
    if(isNaN(val)){
        label.innerText="";
        return "Invalid Amount";
    }
    let amount = val.toString().split("");
   let balance = [];
   if(amount.includes(".")){
    balance = amount.splice(amount.indexOf("."));
   }
   let amountArr = amount.join("").toString().split("");
   for(let x = 0; x < amount.length; x++){
    if(x % 3 === 0 && x !== 0){
        amountArr.splice(amount.length-x, 0, ",");
    }
   }
   return "₦" + amountArr.join("") + balance.join("");
}
function filterMoney(val){
    const result = +val.split("").filter((n)=>n !== ",").join("");
    return result.toFixed(2);
}

function checkTax(val){
    const amount = filterMoney(val);
    const taxable = amount - 800000;
    const first = 2200000;
    const second = 9000000;
    const third = 13000000;
    const fourth = 25000000;
    let remaining;
    let result;

    if(amount <= 800000){
        return 0;
    }else if(amount <= 3000000){
        result = taxable * 0.15;
        return result.toFixed(2);
    }else if(amount <= 12000000){
        remaining = taxable - first;
        result = (first * 0.15) + (remaining * 0.18);
        return result.toFixed(2);
    }else if(amount <= 25000000){
        remaining = taxable - first - second;
        result = (first * 0.15) + (second * 0.18) + (remaining * 0.21);
        return result.toFixed(2);
    }else if(amount <= 50000000){
        remaining = taxable - first - second - third;
        result = (first * 0.15) + (second * 0.18) + (third * 0.21) + (remaining * 0.23);
        return result.toFixed(2);
    }else{
        remaining = taxable - first - second - third - fourth;
        result = (first * 0.15) + (second * 0.18) + (third * 0.21) + (fourth * 0.23) + (remaining * 0.25);
        return result.toFixed(2);
    }
}
function updateTax(){
    tax.innerHTML = money(checkTax(quantity.value));
    // tax.innerHTML = "You owe: ₦" + money(checkTax(quantity.value)) + " from your ₦" + money(filterMoney(quantity.value)) + " income";
    // quantity.value = "";
    quantity.blur();
}
function checkDisabled(value){
    if(value.length === 0){
        enter.disabled = true;
        clear.disabled = true;
    }else{
        enter.disabled = false;
        clear.disabled = false;
    }
};
enter.addEventListener("click", ()=>{
    updateTax();
    enter.disabled = true;
})
quantity.addEventListener("keydown", (event)=>{
    if (event.key === 'Enter') {
        updateTax();
        enter.disabled = true;
    }
    
})
quantity.addEventListener("focus", (event)=>{
    checkDisabled(event.target.value);
    label.innerText="Estimated Tax:";
    // tax.innerHTML = "";
})
quantity.addEventListener("input", (event)=>{
    checkDisabled(event.target.value);
})
clear.addEventListener("click", ()=>{
    tax.innerHTML = "";
    quantity.value = "";
    enter.disabled = true;
    clear.disabled = true;
})
