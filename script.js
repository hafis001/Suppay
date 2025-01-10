document.addEventListener('DOMContentLoaded', () => {
    const airtimeForm = document.getElementById('airtimeForm');
    const dataForm = document.getElementById('dataForm');
    const tvForm = document.getElementById('tvForm');
    const transactionLogs = document.getElementById('transactionLogs');

    // Handle Airtime Topup form submission
    airtimeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const network = document.getElementById('network').value;
        const amount = document.getElementById('amount').value;
        const phone_number = document.getElementById('phone_number').value;

        const transaction = {
            reference_number: generateReference(),
            service: 'Airtime',
            description: `${network} Airtime Topup`,
            phone_number,
            amount,
            transaction_mode: 'Debit',
            initial_balance: 100.00,  // Placeholder value for initial balance
            final_balance: 100.00 - parseFloat(amount),  // Placeholder value for final balance
            status: 'Pending',
            date: new Date().toLocaleString()
        };

        addTransactionToLogs(transaction);
        clearForm(airtimeForm);
    });

    // Handle Data Bundle form submission
    dataForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const price = document.getElementById('data_price').value;
        const validity = document.getElementById('validity').value;
        const phone_number = document.getElementById('phone_number_data').value;

        const transaction = {
            reference_number: generateReference(),
            service: 'Data',
            description: `Data Bundle of ${price} for ${validity} days`,
            phone_number,
            amount: price,
            transaction_mode: 'Debit',
            initial_balance: 50.00,  // Placeholder value for initial balance
            final_balance: 50.00 - parseFloat(price),  // Placeholder value for final balance
            status: 'Pending',
            date: new Date().toLocaleString()
        };

        addTransactionToLogs(transaction);
        clearForm(dataForm);
    });

    // Handle TV Subscription form submission
    tvForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const provider = document.getElementById('provider').value;
        const package = document.getElementById('package').value;
        const duration = document.getElementById('duration').value;
        const phone_number = document.getElementById('phone_number_tv').value;

        const transaction = {
            reference_number: generateReference(),
            service: 'Cable TV',
            description: `${provider} - ${package} Subscription for ${duration} days`,
            phone_number,
            amount: 30.00,  // Placeholder price
            transaction_mode: 'Debit',
            initial_balance: 20.00,  // Placeholder value for initial balance
            final_balance: 20.00 - 30.00,  // Placeholder value for final balance
            status: 'Pending',
            date: new Date().toLocaleString()
        };

        addTransactionToLogs(transaction);
        clearForm(tvForm);
    });

    // Generate a reference number
    function generateReference() {
        return 'REF' + Math.floor(Math.random() * 1000000);
    }

    // Add transaction to logs
    function addTransactionToLogs(transaction) {
        const transactionElement = document.createElement('div');
        transactionElement.classList.add('transaction-item');
        transactionElement.innerHTML = `
            <strong>${transaction.service} - ${transaction.reference_number}</strong><br>
            Description: ${transaction.description}<br>
            Amount: ${transaction.amount}<br>
            Status: ${transaction.status}<br>
            Date: ${transaction.date}
        `;
        transactionLogs.appendChild(transactionElement);
    }

    // Clear form fields after submission
    function clearForm(form) {
        form.reset();
    }
});
