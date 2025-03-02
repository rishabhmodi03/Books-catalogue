// Search and Filtering  
function filterBooks(query, books) {  
    const filtered = books.filter(book =>  
      book.name.toLowerCase().includes(query.toLowerCase()) ||  
      book.author.toLowerCase().includes(query.toLowerCase()) ||  
      (book.keywords || []).some(keyword =>  
        keyword.toLowerCase().includes(query.toLowerCase()))  
    );  
  
    // Highlight search terms in results  
    const highlighted = filtered.map(book => ({  
      ...book,  
      name: highlightTerm(book.name, query),  
      author: highlightTerm(book.author, query)  
    }));  
  
    renderBooks(highlighted);  
    showSuggestions(query, books);  
  }  
  
  // Highlight Helper Function  
  function highlightTerm(text, query) {  
    const regex = new RegExp(`(${query})`, 'gi');  
    return text.replace(regex, '<span class="highlight">$1</span>');  
  }  
  
  // Auto-Suggestions  
  function showSuggestions(query, books) {  
    const suggestions = document.getElementById('suggestions');  
    if (!suggestions) return;  
  
    suggestions.innerHTML = '';  
    if (query.length < 2) return;  
  
    const matches = books  
      .flatMap(book => [book.name, book.author, ...(book.keywords || [])])  
      .filter(text => text.toLowerCase().includes(query.toLowerCase()))  
      .slice(0, 5);  
  
    matches.forEach(match => {  
      const div = document.createElement('div');  
      div.className = 'suggestion-item';  
      div.innerHTML = highlightTerm(match, query);  
      div.addEventListener('click', () => {  
        searchBar.value = match;  
        filterBooks(match, books);  
        suggestions.innerHTML = '';  
      });  
      suggestions.appendChild(div);  
    });  
  }  
  
  // Voice Search (Web Speech API)  
  document.getElementById('voice-search').addEventListener('click', () => {  
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();  
    recognition.lang = 'hi-IN'; // Hindi language  
    recognition.start();  
  
    recognition.onresult = (event) => {  
      const transcript = event.results[0][0].transcript;  
      searchBar.value = transcript;  
      filterBooks(transcript, window.books); // Requires books to be in global scope  
    };  
  
    recognition.onerror = (event) => {  
      console.error('Speech recognition error:', event.error);  
    };  
  });  
  
  // Initialize Search (called from main.js)  
  window.filterBooks = filterBooks;  