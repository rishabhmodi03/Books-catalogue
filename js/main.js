// DOM Elements  
const bookGrid = document.getElementById('book-grid');  
const searchBar = document.getElementById('search-bar');  
const themeToggle = document.getElementById('theme-toggle');  
const loader = document.createElement('div');  
loader.className = 'loader';  

// Load Books from JSON  
async function loadBooks() {  
  try {  
    bookGrid.appendChild(loader);  
    const response = await fetch('https://rishabhmodi03.github.io/Books-catalogue/books.json');  
    const books = await response.json();  
    loader.remove();  
    return books;  
  } catch (error) {  
    loader.remove();  
    bookGrid.innerHTML = '<p class="error">Failed to load books. Please try again.</p>';  
    console.error(error);  
  }  
}  

// Render Book Cards  
function renderBooks(books) {  
  bookGrid.innerHTML = '';  
  books.forEach(book => {  
    const card = document.createElement('div');  
    card.className = 'book-card scroll-reveal';  
    card.innerHTML = `  
      <h3>${book.name}</h3>  
      <div class="buttons">  
        <button class="btn btn-preview" onclick="previewBook('${book.previewUrl}')">Preview</button>  
        <a href="${book.downloadUrl}" class="btn btn-download" download>Download</a>  
      </div>  
    `;  
    bookGrid.appendChild(card);  
  });  
}  

// Preview Book (Modal)  
window.previewBook = (url) => {  
  const modal = document.createElement('div');  
  modal.className = 'modal';  
  modal.innerHTML = `  
    <div class="modal-content">  
      <span class="close">&times;</span>  
      <iframe src="${url}" style="width:100%; height:80vh;"></iframe>  
    </div>  
  `;  
  document.body.appendChild(modal);  

  // Close Modal  
  modal.querySelector('.close').addEventListener('click', () => {  
    modal.remove();  
  });  
};  

// Theme Toggle  
themeToggle.addEventListener('click', () => {  
  document.body.classList.toggle('dark-mode');  
  themeToggle.classList.add('active');  
  setTimeout(() => themeToggle.classList.remove('active'), 500);  

  // Save preference to localStorage  
  const isDark = document.body.classList.contains('dark-mode');  
  localStorage.setItem('theme', isDark ? 'dark' : 'light');  
});  

// Check LocalStorage for Theme  
if (localStorage.getItem('theme') === 'dark') {  
  document.body.classList.add('dark-mode');  
}  

// Initialize  
document.addEventListener('DOMContentLoaded', async () => {  
  const books = await loadBooks();  
  if (books) {  
    renderBooks(books);  
    // Initialize search (will link to search.js later)  
    searchBar.addEventListener('input', (e) => filterBooks(e.target.value, books));  
  }  
});  
