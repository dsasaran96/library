//dom cache
let grid = document.getElementById("bookGrid");
let gridText = document.getElementById("gridText");
let author = document.getElementById("modalAuthor");
let title = document.getElementById("modalTitle");
let pages = document.getElementById("modalPages");
let isRead = document.getElementById("modalRead");
let submit = document.getElementById("Submit");
let modal = document.getElementById("Modal");
let plus = document.getElementById("Plus");
let span = document.getElementsByClassName("close")[0];
let bookForm = document.getElementById("bookForm");


//book class
class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

//UI class

class UI {
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }

    static resetBooksGrid = () => {
        grid.innerHTML = '';
    }

    static updateBooksGrid = () => {
        UI.resetBooksGrid();
        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const divCreate = document.createElement('div');
        let checkRead = function (read) {
            if(read == true) {
                return "<p class='readGreen'>read<p>";
            } else {
               return "<p class='readRed'>not read<p></p>";
            }
        };
            
        divCreate.innerHTML = `<div class="book-card">
        <h1>${book.title}</h1>
        <h2>${book.author}</h2>
        <p>${book.pages}</p>
        ${checkRead(book.read)}
        <button class="btn btnDel del">X</button>
        </div>`;

        grid.appendChild(divCreate);
    }

    static deleteBook(el) {
        if(el.classList.contains('del')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        title.value = '';
        author.value = '';
        pages.value = '';
        isRead.checked = false;
    }
}

//store class

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(title) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.title === title) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//event: display books

document.addEventListener('DOMContentLoaded', UI.displayBooks);

//event: add book

submit.addEventListener('click', (e) => {
    const titleAdd = title.value;
    const authorAdd = author.value;
    const pagesAdd = pages.value;
    const isReadAdd = isRead.checked;

    if(titleAdd === '' || authorAdd === '' || pagesAdd === '') {
        alert('Please fill in all fields');
    } else {

    const book = new Book(titleAdd, authorAdd, pagesAdd, isReadAdd);

    Store.addBook(book);
    UI.addBookToList(book);
    UI.clearFields();
}});

//event: remove book

grid.addEventListener('click', (e) => {
    UI.deleteBook(e.target);
    UI.updateBooksGrid();
    Store.removeBook(e.target.parentElement.parentElement.firstElementChild.textContent);
    Store.removeBook(e.target.parentElement.firstElementChild.textContent);
})

//modal show/hide

plus.onclick = function () {
    modal.style.display = "block";
    plus.style.display = "none";
}

span.onclick = function() {
    modal.style.display = "none";
    plus.style.display = "block";
}

submit.onclick = function () {
    modal.style.display = 'none';
    plus.style.display = 'block';
} 

window.onclick = function(event) {
    if(event.target == modal) {
        modal.style.display = "none";
        plus.style.display = "block";
    }
}
