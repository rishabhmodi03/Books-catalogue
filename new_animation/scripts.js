document.addEventListener('DOMContentLoaded', () => {
    const bookGrid = document.getElementById('bookGrid');

    fetch('data/books.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';

                const bookImage = document.createElement('img');
                bookImage.src = 'https://via.placeholder.com/200x300'; // Placeholder image URL
                bookImage.alt = book.title;

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

                bookCard.appendChild(bookImage);
                bookCard.appendChild(bookContent);

                bookGrid.appendChild(bookCard);
            });
        })
        .catch(error => console.error('Error loading books:', error));
});



