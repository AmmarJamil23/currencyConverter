const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select"); // ✅ fixed
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;

        if (select.name === "from" && currcode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currcode === "PKR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    // update flag whenever user changes currency
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// function to change flag
const updateFlag = (element) => {
    let currCode = element.value; // currency code like USD, PKR
    let countrycode = countryList[currCode]; // map to country like US, PK
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`; 
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    // FIX: only fetch base currency
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    // get rate for target currency
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmount = parseFloat(amtVal) * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});

