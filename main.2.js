const name = document.getElementById("name");
const amount = document.getElementById("amount");
const type = document.getElementById("type");
const button = document.getElementById("addButton");

const incomeText = document.getElementById("totalIncome");
const expenseText = document.getElementById("totalExpenses");
const balanceText = document.getElementById("balance");
const list = document.getElementById("transactionList");

let income = 0;
let expenses = 0;

button.addEventListener("click", function () {

    if (name.value === "" || amount.value === "") {
        alert("Please enter a name and amount");
        return;
    }

    const money = Number(amount.value);

    const transaction = document.createElement("div");
    transaction.className = "transaction";

    if (type.value === "income") {
        income += money;
        transaction.textContent = name.value + " + " + money + " EGP";
    } else {
        expenses += money;
        transaction.textContent = name.value + " - " + money + " EGP";
    }

    list.appendChild(transaction);

    incomeText.textContent = income + " EGP";
    expenseText.textContent = expenses + " EGP";
    balanceText.textContent = (income - expenses) + " EGP";

    name.value = "";
    amount.value = "";
});