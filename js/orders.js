const createOrderCard = orderData => {
    const article = document.createElement('article');
    article.classList.add('order-card');

    const statusMap = {
        0: { class: 'status-new', label: 'Нове' },
        1: { class: 'status-processing', label: 'В обробці' },
        2: { class: 'status-ready', label: 'Готово' },
        3: { class: 'status-delivered', label: 'Видано' }
    };

    const currentStatus = statusMap[orderData.status] || { class: '', label: orderData.status };

    const servicesHTML = orderData.services?.map(service => `
        <div class="service-row">
            <div>
                <strong>${service.name}</strong>
                <p>${service.description}</p>
            </div>
            <span>${service.price} ₴</span>
        </div>
    `).join('');

    const totalAmount = orderData.price || orderData.services.reduce((sum, s) => sum + s.price, 0);

    article.innerHTML = `
        <div class="order-card-header">
            <div>
                <span class="order-label">Замовлення №${orderData.id}</span>
                <p class="order-client">Клієнт: ${orderData.clientName}</p>
            </div>
            <span class="status-badge ${currentStatus.class}">${currentStatus.label}</span>
        </div>

        <div class="order-details">
            <div class="detail-row"><span>Email:</span><span>${orderData.email || 'Email відсутній'}</span></div>
            <div class="detail-row"><span>Телефон:</span><span>${orderData.phone}</span></div>
            <div class="detail-row"><span>Дата:</span><span>${new Date(orderData.start).toLocaleDateString()}</span></div>
        </div>

        <div class="order-services">
            <div class="services-title">Послуги:</div>
            ${servicesHTML}
        </div>

        <div class="order-footer">
            <span class="order-total">Всього: <strong>${totalAmount} ₴</strong></span>
            <div class="order-actions-row">
                <button class="btn-status btn-status-new" type="button" data-order-id="${orderData.id}" data-status="new">Нове</button>
                <button class="btn-status btn-status-processing" type="button" data-order-id="${orderData.id}" data-status="processing">В обробці</button>
                <button class="btn-status btn-status-ready" type="button" data-order-id="${orderData.id}" data-status="ready">Готово</button>
                <button class="btn-status btn-status-delivered" type="button" data-order-id="${orderData.id}" data-status="delivered">Видано</button>
            </div>
        </div>
    `;

    return article;
}

fetch('https://localhost:7254/Order')
    .then(response => response.json())
    .then(response => response.forEach(o => {
        const card = createOrderCard(o)
        document.querySelector('.orders-list').append(card)
    }))
