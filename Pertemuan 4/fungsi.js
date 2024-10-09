var dataBarang = [
    "Buku Tulis",
    "Pensil",
    "Spidol"
];

function showBarang() {
    var listBarang = document.getElementById("list-barang");
    listBarang.innerHTML = "";

    for (let i = 0; i < dataBarang.length; i++) {
        var btnEdit = `<button class="btn btn-sm btn-warning me-1" onclick="editBarang(${i})">Edit</button>`;
        var btnHapus = `<button class="btn btn-sm btn-danger" onclick="deleteBarang(${i})">Hapus</button>`;

        listBarang.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${dataBarang[i]}
                <div>
                    ${btnEdit}
                    ${btnHapus}
                </div>
            </li>`;
    }
}

function addBarang() {
    var input = document.querySelector("input[name=barang]");
    if (input.value.trim() !== "") {
        dataBarang.push(input.value);
        input.value = "";
        showBarang();
    }
}

function editBarang(id) {
    var newBarang = prompt("Nama baru", dataBarang[id]);
    if (newBarang !== null && newBarang.trim() !== "") {
        dataBarang[id] = newBarang;
        showBarang();
    }
}

function deleteBarang(id) {
    if (confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
        dataBarang.splice(id, 1);
        showBarang();
    }
}

showBarang();