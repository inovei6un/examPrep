window.addEventListener("load", solve);

function solve (){
    let clearButton = document.getElementsByClassName('clear-btn')[0];
    let completedOrders = document.getElementById('completed-orders')
    let receivedOrders = document.getElementById('received-orders')
    let productType = document.getElementById('type-product');
    let description = document.getElementById('description');
    let clientName = document.getElementById('client-name');
    let clientPhone = document.getElementById('client-phone');

    document.querySelector('button[type="submit"]').addEventListener('click', sendForm);

    function sendForm(event){
        let productTypeValue = productType.value;
        let descriptionValue = description.value;
        let clientNameValue = clientName.value;
        let clientPhoneValue = clientPhone.value;
        
        if (!descriptionValue || !clientNameValue || !clientPhoneValue) {
            return
        }

        let div = createDiv(productTypeValue, descriptionValue, clientNameValue, clientPhoneValue)

        description.value = '';
        clientName.value = '';
        clientPhone.value = '';

        receivedOrders.appendChild(div)


    }

    function createDiv(productTypeValue, descriptionValue, clientNameValue, clientPhoneValue) {
        let div = document.createElement('div');
        div.classList.add('container')

        let h2 = document.createElement('h2');
        h2.textContent = `Product type for repair: ${productTypeValue}`

        let h3 = document.createElement('h3');
        h3.textContent = `Client information: ${clientNameValue}, ${clientPhoneValue}`

        let h4 = document.createElement('h4');
        h4.textContent = `Description of the problem: ${descriptionValue}`

        let startButton = document.createElement('button');
        startButton.textContent = 'Start repair';
        startButton.classList.add('start-btn');
        startButton.addEventListener('click', function(event) {
            event.target.disabled = true
            finishButton.disabled = false

            finishButton.addEventListener('click', completeOrder);
        })

        let finishButton = document.createElement('button');
        finishButton.textContent = 'Finish repair';
        finishButton.classList.add('finish-btn');
        finishButton.disabled = true

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);
        div.appendChild(startButton);
        div.appendChild(finishButton);

        return div
    }

    function completeOrder(event) {
        divContainer = event.target.parentElement;
        completedOrders.appendChild(divContainer);

        let btns = divContainer.querySelectorAll('button')
        btns[0].remove()
        btns[1].remove()


        clearButton.addEventListener('click', wipeOrders);
    }

    function wipeOrders(event) {
        let containers = completedOrders.querySelectorAll('.container')
        Array.from(containers).forEach(container => container.remove()) 
    }
}