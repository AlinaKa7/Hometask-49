const apiKey = 'AIzaSyAmyil453QqsvdBl4gRDJipiH7UbmngvQw'; 

const bookContainer = document.getElementById('book-container');

fetch(`https://www.googleapis.com/books/v1/volumes?q=traveling&key=${apiKey}`)
  .then(response => {
    if (response.status > 399) {
      return Promise.reject({ status: response.status, statusText: response.statusText });
    } 
    return response.json();
  })
  .then(data => {
    const books = data.items || [];
    displayBooks(books);
  })
  .catch(err => {
    const errTitle = document.createElement('p');
    errTitle.innerText = `Sorry, books are not found. ${err.statusText}`;
    errTitle.style.color = 'red';
    bookContainer.append(errTitle);
  })

function displayBooks(books) {
  books.forEach(book => {
    const card = document.createElement('div');
    const title = document.createElement('h3');
    const img = document.createElement('img');
    const author = document.createElement('p');
    const date = document.createElement('p');
    const description = document.createElement('p');

    card.classList.add('card');
    title.classList.add('book-title');
    img.classList.add('img');
    author.classList.add('author-name');
    date.classList.add('published-date');
    description.classList.add('description');

    title.innerText = book.volumeInfo.title;
    img.src = book.volumeInfo.imageLinks.thumbnail;
    author.innerText = `Authors: ${book.volumeInfo.authors}`;
    date.innerText = `Date of publishing: ${book.volumeInfo.publishedDate}`;
    description.innerText = book.volumeInfo.description;

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(author);
    card.appendChild(date);
    card.appendChild(description);
    bookContainer.appendChild(card);
  });
}