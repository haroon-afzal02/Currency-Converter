 const BASE_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


 const dropDowns = document.querySelectorAll('.dropdowns select');
 const btn = document.querySelector("button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select"); 


 for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currCode;
        newOpt.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOpt.selected= "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOpt.selected = "selected";
        }
        select.append(newOpt);
    }
    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })
 }

 const updateFlag = (sel) => {
    let currCode = sel.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = sel.parentElement.querySelector("img");
    img.src = newSrc;
 }
  const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    console.log(amountVal);

    if (amountVal === '' || amountVal < 1) {
        alert('Please! Enter a valid amount.')
    }

    let URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
     
    let finalAmount = (rate * amountVal).toFixed(2);
    let msg = document.querySelector(".msg");
    msg.innerText = `${amountVal}${fromCurr.value} = ${finalAmount}${toCurr.value}`;
  }

btn.addEventListener('click', (e) => {
    e.preventDefault();
    updateExchangeRate();
} );
window.addEventListener('load', (e) => {
    updateExchangeRate();
});
