const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const bookContainer = document.getElementById('book-container');
const bookDetailsDiv = document.getElementById('book-details');
const errorDiv = document.getElementById('search-error');
const totalResult = document.getElementById('total-result');

searchBtn.addEventListener('click', function () {
    const search = searchInput.value;

    // clear book search div
    bookContainer.innerHTML = '';

    if (search === '') {
        errorDiv.innerHTML = `<h2 class="text-center text-danger">Please write something..!!</h2>`;
        return;
    }

    // error clear 
    errorDiv.innerHTML = '';

    const url = `https://openlibrary.org/search.json?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data => bookSearch(data.docs));

    searchInput.value = '';

});

function bookSearch(books) {

    // total result section 
    const totalResult = document.getElementById('total-result');
    const div = document.createElement('div');
    div.innerHTML = `<h2 class=" text-primary">total found: ${books.length}</h2>`;
    totalResult.appendChild(div);

    books.forEach(book => {
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = div.innerHTML = `
        <div class="card">
         <img height="350px" width="180px" src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">Book Name: ${book.title}</h5>            
            <p class="card-text">Author: ${book.author_name}</p>
            <p class="card-text">Publisher: ${book.publisher}</p>
            <p class="card-text">Publish Year: ${book.publish_year}</p>
          </div>
        </div>
        `;
        bookContainer.appendChild(div);
    });
}







