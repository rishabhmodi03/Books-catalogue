document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('bookGrid');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            renderBooks(data);
            searchButton.addEventListener('click', () => filterBooks(data));
            searchInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    filterBooks(data);
                }
            });
        })
        .catch(error => console.error('Error loading books:', error));

    function renderBooks(books) {
        bookGrid.innerHTML = '';
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            const bookContent = document.createElement('div');
            bookContent.className = 'content';

            const bookTitle = document.createElement('div');
            bookTitle.className = 'title';
            bookTitle.textContent = book.title;

            const bookAuthor = document.createElement('div');
            bookAuthor.className = 'author';
            bookAuthor.textContent = book.author;

            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'buttons';

            const downloadBtn = document.createElement('button');
            downloadBtn.className = 'download-btn';
            downloadBtn.textContent = 'Download';
            downloadBtn.onclick = () => {
                window.location.href = book.url;
            };

            const viewBtn = document.createElement('button');
            viewBtn.className = 'view-btn';
            viewBtn.textContent = 'View Online';
            viewBtn.onclick = () => {
                window.open(book.url, '_blank');
            };

            buttonsContainer.appendChild(downloadBtn);
            buttonsContainer.appendChild(viewBtn);

            bookContent.appendChild(bookTitle);
            bookContent.appendChild(bookAuthor);
            bookContent.appendChild(buttonsContainer);

            bookCard.appendChild(bookContent);

            bookGrid.appendChild(bookCard);
        });
    }

    function filterBooks(books) {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) || 
            book.author.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    }
});



