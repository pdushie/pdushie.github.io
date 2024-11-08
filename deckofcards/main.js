/*
        Author: Philip Dushie
        Date: November 8, 2024
        Project: Deck of cards viewer
        Component: main.js
*/
// API to get and display cards, their names, and value from the deck of cards API
let numberOfCardsToDraw;

document.querySelector('button').addEventListener("click", () => {
    // clear section container if it already has content
    if (document.querySelector('section').children.length !== 0) {
        document.querySelector('section').innerHTML='';
    }

    // Get number of cards to draw from input box and convert it into an integer
    numberOfCardsToDraw = parseInt(document.querySelector('#cardCount').value);

    //Trigger display deck of cards function after getting number of cards to draw in the immediate line step above
    displayDeckOfCards()
});



async function getDeckOfCards() {
    try {
        const url = `https://www.deckofcardsapi.com/api/deck/new/draw/?count=${numberOfCardsToDraw}`
        const response = await fetch(url);
        const deckOfCards = await response.json();
        return deckOfCards;
    } catch (error) {
        console.log("Failed to fetch data", error)
    }
}

async function displayDeckOfCards() {
    fetchedDeckOfCards = await getDeckOfCards();
    //Show number of cards left in deck of cards
    document.querySelector('span').innerHTML = `<b>Cards Left in Deck: ${fetchedDeckOfCards.remaining}</b>`;
    
    fetchedDeckOfCards.cards.forEach((item) => {
        const cardHolder = document.createElement('div');
        cardHolder.innerHTML = `<h3>Code: ${item.code}</h3>
        <img src=${item.image}>
        <p><b>Value: </b><span>${item.value}</span>
        <p><b>Suit: </b>${item.suit}</p>
        `;
        document.querySelector('section').append(cardHolder);
    });
    console.log(document.querySelector('section').children);
}