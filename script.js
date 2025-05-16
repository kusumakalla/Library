const myLibrary = [];

function Book(title, author, pages, read_or_not) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read_or_not = read_or_not;
    this.info = function () {
        let read = read_or_not ? "read" : "not read yet";
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + read;
    }
}

let theHobbit = new Book("theHobbit", "J.R.R. Tolkien", 295, false);
console.log(theHobbit.info());

function addBookToLibrary(title, author, pages, read_or_not) {
    const item = new Book(title, author, pages, read_or_not);
    item.id = crypto.randomUUID();
    myLibrary.push(item);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false)
addBookToLibrary("Roses are Bood red", "Novoneel Chakraborthy", 280, true)
addBookToLibrary("The Girl in Room 105", "Chetan Bhagath", 356, false)

let book_container = document.querySelector(".Book_container");
function displayBooks() {
    for (const item of myLibrary) {
        const book_div = document.createElement("div");
        const title = document.createElement("h4")
        title.innerText = "Title : " + item.title;
        title.classList.add("title");
        book_div.appendChild(title);

        const author = document.createElement("p")
        author.innerText = "Author : " + item.author;
        author.classList.add("author");
        book_div.appendChild(author);

        const pages = document.createElement("p")
        pages.innerText = "Pages : " + item.pages;
        pages.classList.add("pages");
        book_div.appendChild(pages);

        const status = document.createElement("p")
        status.innerText = item.read_or_not ? "read" : "Not read yet"
        status.classList.add("status");
        book_div.appendChild(status);

        book_div.classList.add("book_div");
        book_container.appendChild(book_div);

        const rem_btn = document.createElement("button");
        rem_btn.innerText = "Remove";
        rem_btn.setAttribute("id", item.id);
        book_div.appendChild(rem_btn);

        rem_btn.addEventListener("click", () => {
            console.log(rem_btn.id);
            myLibrary.splice(myLibrary.findIndex((i) => i.id === rem_btn.id), 1);
            book_container.innerHTML = "";
            displayBooks()
        })
    }
}

displayBooks();

/* Add new book */
let form = document.querySelector("form");
let add_new_btn = document.querySelector(".add_new_btn");
let newbookdialogue = document.querySelector(".newbookdialogue");
let addbutton = document.querySelector("#addbutton");
let output = document.querySelector("output");

let form_title = document.getElementById("form_title");
let form_author = document.getElementById("form_author");
let form_pages = document.getElementById("form_pages");
let form_status = document.getElementById("form_status");




add_new_btn.addEventListener("click", () => {
    newbookdialogue.showModal();
});

// newbookdialogue.addEventListener("close", (e) => {
//     if (newbookdialogue.returnValue == "") {
//         output.value = "no return value";
//     }
//     else {
//         output.value = newbookdialogue.returnValue;
//     }
// });

addbutton.addEventListener("click", (event) => {
    event.preventDefault();
    if (form_title.value != "") {
        newbookdialogue.close();
        // output.innerText = form_title.value + " " + form_status.checked;

        addBookToLibrary(form_title.value, form_author.value, form_pages.value, form_status.checked);
        console.log(myLibrary);
        book_container.innerHTML = "";
        displayBooks()
        form.reset();
    }
    else
        newbookdialogue.close();
})