document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('book-grid');
    const searchInput = document.getElementById('search-input');

    // Fetch books data from books.json
    fetch('https://rishabhmodi03.github.io/Books-catalogue/books.json')
        .then(response => response.json())
        .then(books => {
            displayBooks(books);
            searchInput.addEventListener('input', () => searchBooks(books));
        })
        .catch(error => console.error('Error fetching books:', error));

    // Display books in the grid
    function displayBooks(books) {
        bookGrid.innerHTML = '';
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            bookCard.innerHTML = `
                <img src="assets/${book.preview-url}" alt="${book.name} Preview">
                <div class="card-content">
                    <h2>${book.name}</h2>
                    <div class="buttons">
                        <button onclick="openPreview('${book.preview-url}')">Preview</button>
                        <button onclick="downloadBook('${book.download-url}')">Download</button>
                    </div>
                </div>
            `;
            bookGrid.appendChild(bookCard);
        });
    }

    // Search books based on input
    function searchBooks(books) {
        const query = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.name.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query) ||
            book.tags.some(tag => tag.toLowerCase().includes(query))
        );
        displayBooks(filteredBooks);
    }

    // Open book preview
    function openPreview(url) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <iframe src="${url}" width="100%" height="600px"></iframe>
            </div>
        `;
        document.body.appendChild(modal);

        // Close modal when clicking the close button
        modal.querySelector('.close-button').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    // Download book
    function downloadBook(url) {
        window.open(url, '_blank');
    }
});