class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }
}

class Library {
    constructor() {
        this.myLibrary = [];
        this.$modal = document.querySelector("#modal");
        this.$container = document.getElementById("main");
        this.init();
    }

    init() {
        this.addEventListeners();
        this.loadInitialBooks();
        this.renderBooks();
    }

    addEventListeners() {
        document.addEventListener("click", (e) => {
            if (e.target.matches("#newBook")) {
                this.$modal.showModal();
            }

            if (e.target.matches("#btn-cerrar-modal") || e.target.matches("#closeModal")) {
                this.$modal.close();
            }

            if (e.target.matches("#clear")) {
                this.$container.innerHTML = "";
            }

            if (e.target.matches("#submit")) {
                e.preventDefault();
                this.handleSubmit();
            }

            if (e.target.matches(".delete")) {
                this.handleDelete(e.target.id);
            }

            if (e.target.matches(".change")) {
                this.handleChange(e.target.id);
            }
        });
    }

    loadInitialBooks() {
        this.addBookToLibrary(new Book(1, "El alquimista", "Paulo Coelho", 192, true));
        this.addBookToLibrary(new Book(2, "El hombre que calculaba", "Malba Tahan", 288, true));
        this.addBookToLibrary(new Book(3, "Piense y hagase rico", "Napoleon Hill", 320, false));
        this.addBookToLibrary(new Book(4, "Metafisica 4 en 1", "Conny Mendez", 314, true));
    }

    addBookToLibrary(book) {
        this.myLibrary.push(book);
    }

    handleSubmit() {
        const title = document.querySelector("#title").value;
        const author = document.querySelector("#author").value;
        const pages = document.querySelector("#pages").value;
        const id = new Date().getTime();
        const read = document.getElementById("radio1").checked;

        if (title && author && pages && (read || document.getElementById("radio2").checked)) {
            this.addBookToLibrary(new Book(id, title, author, pages, read));
            this.clearForm();
            this.renderBooks();
            this.$modal.close();
        } else {
            alert("Completa todos los campos");
        }
    }

    clearForm() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#pages").value = "";
        document.querySelector("#radio1").checked = false;
        document.querySelector("#radio2").checked = false;
    }

    renderBooks() {
        this.$container.innerHTML = "";
        this.myLibrary.forEach(book => {
            this.$container.innerHTML += `
            <div class="card">
                <h3 class="card-title">${book.title}</h3>
                <div class="card-content">
                    <p class="card-author">Autor: ${book.author}</p> 
                    <p class="card-pages">${book.pages} paginas</p>
                    <div class="card-read">
                        <span>Leído:</span>
                        ${book.read ? `<img src="images/leido.png" alt="leido" />` : `<img src="images/noLeido.png" alt="noLeido" />`}
                    </div>
                </div>
                <div class="buttons">
                    <button id="change${book.id}" class="change">Cambiar</button>
                    <button id="del${book.id}" class="delete">Eliminar</button>
                </div>
            </div>
            `;
        });
    }

    handleDelete(targetId) {
        const id = this.extractIdFromTarget(targetId);
        this.myLibrary = this.myLibrary.filter(book => book.id !== id);
        this.renderBooks();
    }

    handleChange(targetId) {
        const id = this.extractIdFromTarget(targetId);
        const book = this.myLibrary.find(book => book.id === id);
        if (book) {
            book.read = !book.read;
            this.renderBooks();
        }
    }

    extractIdFromTarget(targetId) {
        const regex = /[^0-9]/g; // Expresión regular para eliminar letras
        const txtFilter = targetId.replace(regex, "");
        return parseInt(txtFilter);
    }
}

// Inicializa la biblioteca
const library = new Library();