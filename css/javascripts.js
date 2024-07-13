
// Function to fetch the list of books from BibleGateway
function loadBooks() {
    fetch('https://www.biblegateway.com/versions/King-James-Version-KJV-Bible/')
        .then(response => response.text())
        .then(html => {
            // Use DOMParser to parse HTML string
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract book options
            const bookSelect = document.getElementById('book');
            const bookOptions = doc.querySelectorAll('.bookLink');

            bookOptions.forEach(option => {
                const bookName = option.textContent.trim();
                const bookValue = option.getAttribute('href');
                const bookOption = document.createElement('option');
                bookOption.textContent = bookName;
                bookOption.value = bookValue;
                bookSelect.appendChild(bookOption);
            });
        })
        .catch(error => console.error('Error loading books:', error));
}

// Function to load chapters based on selected book
function loadChapters() {
    const bookSelect = document.getElementById('book');
    const selectedBook = bookSelect.value;

    if (selectedBook) {
        fetch(selectedBook)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const chapterSelect = document.getElementById('chapter');
                chapterSelect.innerHTML = ''; // Clear previous options

                // Extract chapter options
                const chapterOptions = doc.querySelectorAll('.chapnum');
                chapterOptions.forEach(option => {
                    const chapterNumber = option.textContent.trim();
                    const chapterUrl = option.querySelector('a').getAttribute('href');
                    const chapterOption = document.createElement('option');
                    chapterOption.textContent = chapterNumber;
                    chapterOption.value = chapterUrl;
                    chapterSelect.appendChild(chapterOption);
                });
            })
            .catch(error => console.error('Error loading chapters:', error));
    }
}

// Function to load selected chapter content
function loadChapter() {
    const chapterSelect = document.getElementById('chapter');
    const selectedChapter = chapterSelect.value;

    if (selectedChapter) {
        fetch(selectedChapter)
            .then(response => response.text())
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const chapterContent = doc.querySelector('.chapter');

                // Display chapter content
                document.getElementById('chapter-content').innerHTML = chapterContent.innerHTML;
            })
            .catch(error => console.error('Error loading chapter content:', error));
    }
}

// Load books when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

// link for a time for javascripts
document.addEventListener('DOMContentLoaded', (event) => {
    const dateElement = document.getElementById('date');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = currentDate.toLocaleDateString(undefined, options);
});
