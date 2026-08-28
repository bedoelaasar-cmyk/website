document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const nameInput =
        document.getElementById("name");

    const amountInput =
        document.getElementById("amount");

    const typeInput =
        document.getElementById("type");

    const addButton =
        document.getElementById("addButton");

    const transactionList =
        document.getElementById("transactionList");

    const totalIncome =
        document.getElementById("totalIncome");

    const totalExpenses =
        document.getElementById("totalExpenses");

    const balance =
        document.getElementById("balance");


    /* =========================================
       TRANSACTION DATA
    ========================================= */

    let transactions =
        JSON.parse(
            localStorage.getItem("transactions")
        ) || [];


    /* =========================================
       ADD TRANSACTION
    ========================================= */

    addButton.addEventListener(
        "click",
        function () {

            const name =
                nameInput.value.trim();

            const amount =
                Number(amountInput.value);

            const type =
                typeInput.value;


            if (name === "") {

                showNotification(
                    "Please enter a transaction name."
                );

                nameInput.focus();

                return;
            }


            if (
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                showNotification(
                    "Please enter a valid amount."
                );

                amountInput.focus();

                return;
            }


            const transaction = {

                id: Date.now(),

                name: name,

                amount: amount,

                type: type
            };


            transactions.push(transaction);


            saveTransactions();

            renderTransactions();

            updateSummary();


            nameInput.value = "";

            amountInput.value = "";

            typeInput.value = "expense";


            showNotification(
                "Transaction added successfully ✓"
            );
        }
    );


    /* =========================================
       RENDER TRANSACTIONS
    ========================================= */

    function renderTransactions() {

        transactionList.innerHTML = "";


        if (transactions.length === 0) {

            transactionList.innerHTML = `
                <div class="empty-message">
                    No transactions yet.
                </div>
            `;

            return;
        }


        transactions
            .slice()
            .reverse()
            .forEach(function (transaction) {

                const card =
                    document.createElement("div");

                card.className =
                    "transaction";


                const info =
                    document.createElement("div");

                info.className =
                    "transaction-info";


                const name =
                    document.createElement("span");

                name.className =
                    "transaction-name";

                name.textContent =
                    transaction.name;


                const type =
                    document.createElement("span");

                type.className =
                    "transaction-type";

                type.textContent =
                    transaction.type === "income"
                        ? "Income"
                        : "Expense";


                info.appendChild(name);

                info.appendChild(type);


                const amount =
                    document.createElement("span");

                amount.className =
                    `transaction-amount ${transaction.type}`;


                const sign =
                    transaction.type === "income"
                        ? "+"
                        : "-";


                amount.textContent =
                    `${sign}${transaction.amount.toFixed(2)} EGP`;


                const deleteButton =
                    document.createElement("button");

                deleteButton.type = "button";

                deleteButton.className =
                    "delete-btn";

                deleteButton.textContent =
                    "×";

                deleteButton.dataset.id =
                    transaction.id;

                deleteButton.setAttribute(
                    "aria-label",
                    "Delete transaction"
                );


                card.appendChild(info);

                card.appendChild(amount);

                card.appendChild(deleteButton);


                transactionList.appendChild(card);
            });
    }


    /* =========================================
       DELETE TRANSACTION
    ========================================= */

    transactionList.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".delete-btn"
                );


            if (!button) {
                return;
            }


            const id =
                Number(button.dataset.id);


            transactions =
                transactions.filter(
                    function (transaction) {

                        return transaction.id !== id;
                    }
                );


            saveTransactions();

            renderTransactions();

            updateSummary();


            showNotification(
                "Transaction deleted."
            );
        }
    );


    /* =========================================
       SUMMARY
    ========================================= */

    function updateSummary() {

        let income = 0;

        let expenses = 0;


        transactions.forEach(
            function (transaction) {

                if (
                    transaction.type ===
                    "income"
                ) {

                    income +=
                        transaction.amount;

                } else {

                    expenses +=
                        transaction.amount;
                }
            }
        );


        const currentBalance =
            income - expenses;


        totalIncome.textContent =
            `${income.toFixed(2)} EGP`;


        totalExpenses.textContent =
            `${expenses.toFixed(2)} EGP`;


        balance.textContent =
            `${currentBalance.toFixed(2)} EGP`;


        balance.style.color =
            currentBalance < 0
                ? "#dc2626"
                : "#16a34a";
    }


    /* =========================================
       SAVE
    ========================================= */

    function saveTransactions() {

        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions)
        );
    }


    /* =========================================
       NOTIFICATION
    ========================================= */

    function showNotification(message) {

        let notification =
            document.querySelector(
                ".notification"
            );


        if (!notification) {

            notification =
                document.createElement("div");

            notification.className =
                "notification";

            document.body.appendChild(
                notification
            );
        }


        notification.textContent =
            message;


        notification.classList.add(
            "show"
        );


        setTimeout(
            function () {

                notification.classList.remove(
                    "show"
                );

            },
            2500
        );
    }


    /* =========================================
       CREATE SKY
    ========================================= */

    function createSky() {

        const sky =
            document.createElement("div");

        sky.className = "sky";


        /* Sun */

        const sun =
            document.createElement("div");

        sun.className = "sun";


        /* Moon */

        const moon =
            document.createElement("div");

        moon.className = "moon";


        /* Clouds */

        const cloud1 =
            document.createElement("div");

        cloud1.className =
            "cloud cloud-1";


        const cloud2 =
            document.createElement("div");

        cloud2.className =
            "cloud cloud-2";


        const cloud3 =
            document.createElement("div");

        cloud3.className =
            "cloud cloud-3";


        /* Stars */

        const stars =
            document.createElement("div");

        stars.className = "stars";


        for (let i = 0; i < 90; i++) {

            const star =
                document.createElement("span");

            star.className = "star";


            const x =
                Math.random() * 100;

            const y =
                Math.random() * 100;


            const size =
                Math.random() * 3 + 1;


            const delay =
                Math.random() * 3;


            star.style.left =
                `${x}%`;

            star.style.top =
                `${y}%`;

            star.style.width =
                `${size}px`;

            star.style.height =
                `${size}px`;

            star.style.animationDelay =
                `${delay}s`;


            stars.appendChild(star);
        }


        sky.appendChild(sun);

        sky.appendChild(cloud1);

        sky.appendChild(cloud2);

        sky.appendChild(cloud3);

        sky.appendChild(moon);

        sky.appendChild(stars);


        document.body.prepend(sky);
    }


    /* =========================================
       SCROLL SKY
    ========================================= */

    function updateSky() {

        const scrollTop =
            window.scrollY;


        const pageHeight =
            document.documentElement.scrollHeight;


        const screenHeight =
            window.innerHeight;


        const maxScroll =
            pageHeight - screenHeight;


        if (maxScroll <= 0) {
            return;
        }


        const progress =
            Math.min(
                1,
                Math.max(
                    0,
                    scrollTop / maxScroll
                )
            );


        document.documentElement.style
            .setProperty(
                "--scroll",
                progress.toFixed(3)
            );
    }


    window.addEventListener(
        "scroll",
        updateSky,
        {
            passive: true
        }
    );


    /* =========================================
       DAY / NIGHT / AUTO
    ========================================= */

    const dayButton =
        document.getElementById("dayMode");

    const nightButton =
        document.getElementById("nightMode");

    const autoButton =
        document.getElementById("autoMode");


    let themeMode = "auto";


    function setTheme(mode) {

        themeMode = mode;


        dayButton.classList.remove(
            "active"
        );

        nightButton.classList.remove(
            "active"
        );

        autoButton.classList.remove(
            "active"
        );


        if (mode === "day") {

            dayButton.classList.add(
                "active"
            );


            document.documentElement.style
                .setProperty(
                    "--scroll",
                    "0"
                );

            return;
        }


        if (mode === "night") {

            nightButton.classList.add(
                "active"
            );


            document.documentElement.style
                .setProperty(
                    "--scroll",
                    "1"
                );

            return;
        }


        autoButton.classList.add(
            "active"
        );


        updateSky();
    }


    if (
        dayButton &&
        nightButton &&
        autoButton
    ) {

        dayButton.addEventListener(
            "click",
            function () {

                setTheme("day");
            }
        );


        nightButton.addEventListener(
            "click",
            function () {

                setTheme("night");
            }
        );


        autoButton.addEventListener(
            "click",
            function () {

                setTheme("auto");
            }
        );
    }


    /* =========================================
       ENTER KEY
    ========================================= */

    nameInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                amountInput.focus();
            }
        }
    );


    amountInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                addButton.click();
            }
        }
    );


    /* =========================================
       INITIALIZE
    ========================================= */

    createSky();

    setTheme("auto");

    renderTransactions();

    updateSummary();

});