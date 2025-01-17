// Mendapatkan elemen DOM
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Fungsi untuk menambah item ke daftar to-do
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText !== "") {
        // Membuat elemen list baru
        const li = document.createElement('li');
        li.textContent = todoText;
        
        // Membuat tombol hapus untuk setiap item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        
        // Menambahkan event listener ke tombol hapus
        deleteButton.addEventListener('click', function() {
            // Tampilkan alert konfirmasi
            const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus tugas "${todoText}"?`);
            if (confirmDelete) {
                todoList.removeChild(li); // Menghapus item jika konfirmasi adalah "OK"
                alert(`Tugas "${todoText}" berhasil dihapus.`);
            }
        });
        
        li.appendChild(deleteButton); // Menambahkan tombol hapus ke item
        todoList.appendChild(li); // Menambahkan item ke daftar to-do
        todoInput.value = ''; // Mengosongkan input
    }
}

// Event listener untuk tombol tambah
addButton.addEventListener('click', addTodo);

// Event listener untuk menambah tugas saat tekan Enter
todoInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});
