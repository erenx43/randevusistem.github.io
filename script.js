const shopData = {
    "Diamond Barber": [{n: "Saç", p: 400}, {n: "Cilt Bakımı", p: 300}, {n: "Boya & Kesim", p: 700}, {n: "Sakal", p: 200}],
    "VIP Kuaförü": [{n: "Boya", p: 600}, {n: "Saç Bakımı", p: 500}, {n: "Kesim", p: 500}],
    "Efsane Stil": [{n: "Klasik Kesim", p: 250}, {n: "Fön", p: 100}, {n: "Sakal", p: 100}]
};

function updateServices() {
    const shop = document.getElementById('shopName').value;
    const sSelect = document.getElementById('service');
    sSelect.innerHTML = '<option value="" disabled selected>Hizmet seçin...</option>';
    
    shopData[shop].forEach(s => {
        let opt = new Option(`${s.n} - ${s.p} TL`, s.n);
        opt.dataset.price = s.p;
        sSelect.add(opt);
    });
}

document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const app = {
        id: Date.now(),
        shop: document.getElementById('shopName').value,
        name: document.getElementById('fullName').value,
        service: document.getElementById('service').value,
        price: document.getElementById('service').options[document.getElementById('service').selectedIndex].dataset.price,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value
    };

    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    apps.push(app);
    localStorage.setItem('appointments', JSON.stringify(apps));
    display();
    this.reset();
});

function deleteApp(id) {
    let apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    apps = apps.filter(a => a.id !== id);
    localStorage.setItem('appointments', JSON.stringify(apps));
    display();
}

function display() {
    const apps = JSON.parse(localStorage.getItem('appointments') || '[]');
    const list = document.getElementById('listItems');
    document.getElementById('count').textContent = apps.length;
    list.innerHTML = '';

    apps.forEach(a => {
        list.innerHTML += `
            <div class="appointment-card">
                <div class="card-content">
                    <h4>${a.name}</h4>
                    <p><b>${a.shop}</b> | ${a.service}</p>
                    <p>${a.date} - ${a.time} | <b>${a.price} TL</b></p>
                </div>
                <button class="delete-btn" onclick="deleteApp(${a.id})">İptal</button>
            </div>
        `;
    });
}


window.onload = display;
