import '../helpers/string.js'

export default function Inventory () {

    const
        content = document.getElementById('inventory-panel'),
        locations = document.getElementById('locations');

    if (!content) return false;

    fetch('/data/printers.json').then(status).then(json).then(d => {

        const inventory = document.createDocumentFragment();

        for (let prop in d) {
            if (prop == 'common') continue;

            const group = document.createElement('section');
            group.id = prop;

            locations.innerHTML += `<li>${prop}</li>`;

            const
                _this = d[prop], len = _this.length
            for (let i = 0; i < len; i++) {
                _this[i].inherit && Object.assign(_this[i], d.common[_this[i].inherit]);
            }

            const heading = document.createElement('h1');
            heading.innerText = prop;

            group.appendChild(heading);
            populate(group, _this);
            inventory.appendChild(group)
        }

        content.appendChild(inventory);
    });

    function populate (parent, data, isSubField) {
        if (Array.isArray(data)) data.forEach(d => populate(parent, d));
        else {
            const elm = document.createElement('article');
            elm.classList.add('item');
            isSubField && elm.classList.add('sub');

            for (let prop in data) {
                if (prop == 'inherit') continue;
                if (prop == 'problems') {
                    elm.innerHTML += `<p>Problems: ${data.problems.length}</p>`;
                    data[prop].forEach(d => populate(elm, d, true))
                }
                else elm.innerHTML += `<p>${prop.capitalize()}: ${data[prop]}</p>`;
            }
            parent.appendChild(elm);
        }
    }
}

function status (res) {
    if (res.status >= 200 && res.status < 300) {
        return Promise.resolve(res)
    } else return Promise.reject( new Error(res.statusText) )
}

function json (res) {
    return res.json()
}
