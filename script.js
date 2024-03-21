const libraryContainer = document.querySelector('div.container');
const addBtn = document.querySelector('button#add-book');
const dialog = document.querySelector('dialog');
const newBook = document.querySelector('form');
const cancelBtn = document.querySelector('button[type=button]')

const libraryArray = [];


function Book(title, author, pages, read){
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Add default books
const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
const theTwoTowers = new Book('The Two Towers', 'J.R.R Tolkien', 352, 'read')
libraryArray.push(theHobbit, theTwoTowers);
libraryArray.forEach((book)=>{
  addBookToLibrary(book, libraryArray);
})




function addBookToLibrary(book, array){
  
    //create all card elements and assign the atributes
    const divCard = document.createElement('div');
    divCard.setAttribute('class', 'card');
    let uniqueID = Math.random().toString(36).slice(2, 11); //random id generator
    divCard.setAttribute('id', uniqueID);

    const title = document.createElement('p');
    title.setAttribute('class', 'title');

    const author = document.createElement('p');
    author.setAttribute('class', 'author');

    const pages = document.createElement('p');
    pages.setAttribute('class', 'pages');

    const read = document.createElement('p');
    read.setAttribute('class', 'read');

    const deleteBtn = document.createElement('button');
    let pos = array.length - 1;
    //link the card id to the delete button
    deleteBtn.setAttribute('btnid', uniqueID);
    deleteBtn.innerHTML = 'Delete';
    //add delete button, gests id from button and removes the card
    deleteBtn.addEventListener('click',() => {
      let id = deleteBtn.getAttribute('btnId');
      const card = document.querySelector('#' + CSS.escape(id));
      libraryContainer.removeChild(card);
      //remove the book from the array
      console.log(libraryArray.indexOf(book));
      libraryArray.splice(libraryArray.indexOf(book), 1);
    })

    //add elements to the div
    divCard.appendChild(title);
    divCard.appendChild(author);
    divCard.appendChild(pages);
    divCard.appendChild(read);
    divCard.appendChild(deleteBtn);

    //add content to the elements
    for(const property in book){
      divCard.querySelector('.' + CSS.escape(property)).textContent = book[property];
    }

    //add the book card to the page
    libraryContainer.appendChild(divCard)

    
}

// when the submit button is pressed, adds the elements to a 
// nodelist, and stores the user inputs to make a new book obj
newBook.addEventListener('submit',() => {
 
  const elements = newBook.elements;
  
  const title = elements[1].value;
  const author = elements[2].value;
  const pages = elements[3].value;
  const read = elements[4].value;
  
  const book = new Book(title, author, pages, read);
  libraryArray.push(book);
  addBookToLibrary(book, libraryArray);

  newBook.reset();
})


//cancel button == close the form ignoring the required fields and reset
cancelBtn.addEventListener('click', () => {
  newBook.reset();
  dialog.close();
})


addBtn.addEventListener('click',() => {
  dialog.showModal();
})


