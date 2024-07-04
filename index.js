const d = document;
let myLibrary = [];
const $modal = d.querySelector("#modal");
const $container = d.getElementById("main");

// Se escucha en evento click en todo el document para luego delegar dichos eventos.
d.addEventListener("click", (e)=>{
    console.log(e.target);

    if (e.target.matches("#newBook")) {
        $modal.showModal();
    }

    if (e.target.matches("#btn-cerrar-modal")) {
        $modal.close();
    }

    if (e.target.matches("#clear")) {
        $container.innerHTML = "";
    }

    if (e.target.matches("#closeModal")) {
        $modal.close();
    }

    if (e.target.matches("#submit")) {
        e.preventDefault();
        let $title_form = d.querySelector("#title").value,
         $author_form = d.querySelector("#author").value,
         $pages_form = d.querySelector("#pages").value,
         id = new Date().getTime(),
         read;
        ;

        if (d.getElementById("radio1").checked) {
            read = true;
        }

        if (d.getElementById("radio2").checked) {
            read = false;
        }


        if ($title_form && $author_form && $pages_form && read) {
            //Llama la funcion constructora de libros
            addBookToLibrary(new Book(id, $title_form, $author_form, $pages_form, read));
            //limpia la pantalla
            $container.innerHTML = "";
            //llama la funcion que carga las card en pantalla a partir del arreglo que contiene los libros
            onloadCards();
            d.querySelector("#title").value = "";
            d.querySelector("#author").value = "";
            d.querySelector("#pages").value = "";
            d.querySelector("#radio1").checked = false;
            d.querySelector("#radio2").checked = false;

            $modal.close();
        } else  {
            alert("Completa todos los campos");
        }

    }

    if (e.target.matches(".delete")) {
        const txtOrigin = e.target.id;
        const regex = /[^0-9]/g; // Expresión regular para eliminar letras
        const txtFilter = txtOrigin.replace(regex, "");

        let id = parseInt(txtFilter);
        deleteCard(id);
        $container.innerHTML = "";
        onloadCards();
    }

    if (e.target.matches(".change")) {
        const txtOrigin = e.target.id;
        const regex = /[^0-9]/g; // Expresión regular para eliminar letras
        const txtFilter = txtOrigin.replace(regex, "");

        let id = parseInt(txtFilter);
        changeCard(id);
        $container.innerHTML = "";
        onloadCards();
    } 

})

// Funcion constructura de libros
function Book(id, title, author, pages, read) {  
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + ", " + this.read;
    }
}

// Funcion que agrega los libros de tipo object en arreglo que almacena todos los libros
function addBookToLibrary(book) {
    myLibrary.push(book);
}


addBookToLibrary(new Book(1, "El alquimista", "Paulo Coelho", 192, true));
addBookToLibrary(new Book(2, "El hombre que calculaba", "Malba Tahan", 288, true));
addBookToLibrary(new Book(3, "Piense y hagase rico", "Napoleon Hill", 320, false));
addBookToLibrary(new Book(4, "Metafisica 4 en 1", "Conny Mendez", 314, true));


function onloadCards() {
    
    myLibrary.map(el => {
        $container.innerHTML += `
        <div class="card">
            <h3 class="card-title">${el.title}</h3>
            <div class="card-content">
                <p class="card-author">Autor: ${el.author}</p> 
                <p class="card-pages">${el.pages} paginas</p>
                <div class="card-read">
                    <span>Leído:</span>
                    ${el.read ? `<img src="images/leido.png" alt="leido" />` : `<img src="images/noLeido.png" alt="noLeido" />`}
                </div>
            </div>
            <div class="buttons">
                <button id="change${el.id}" class="change">Cambiar</button>
                <button id="del${el.id}" class="delete">Eliminar</button>
            </div>
        </div>
        `;
    })
    
}
onloadCards(); 


function deleteCard(id) {
    let filter = myLibrary.filter(e => e.id !== id);
    myLibrary = filter;
}


function changeCard(id) {

    for (const elem of myLibrary) {
        if (elem.id === id) {
         elem.read ? elem.read = false : elem.read = true;
        }
    }
}




