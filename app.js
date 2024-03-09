const images = ['Pictures/cat-cake.jpg', 'Pictures/cat-cake.jpg', 'Pictures/cat-books.jpg', 'Pictures/cat-books.jpg', 'Pictures/cat-box.png', 'Pictures/cat-box.png'];
const allCards = document.querySelectorAll('.card')
let playerMessage = document.querySelector('.player-message')

// randomly reorder images
function shuffle(images) {
    images.sort(() => Math.random() - 0.5)
    return images
}

// assign images to cards
function assignImages(cards, images) {
    shuffle(images);
    for (let i = 0; i < images.length; i++) {
        let picture = document.createElement('img');
        picture.src = images[i];
        cards[i].appendChild(picture);
    }
}

assignImages(allCards, images);


// game logic - check if cards match and if player won
function matchCards() {
    let first = "";         //first card choice
    let second = "";        //second card choice
    let matchCounter = 0;

    allCards.forEach(function (card) {
        card.addEventListener('click', function () {
            let cardImg = card.querySelector('img');   //selecting image of each card 
            if (!first && !second) {                   //first card choice
                first = card;
                cardImg.classList.add('flip');
            } else if (card === first) {            //player clicks on the same card twice
                cardImg.classList.remove('flip');
                first = "";
                playerMessage.innerText = "No Match";
                playerMessage.style.color = '#e4000f';
            } else if (first && !second) {          //second card choice
                second = card;
                cardImg.classList.add('flip');
                if (first.innerHTML === second.innerHTML) {
                    // Cards match
                    first = "";
                    second = "";
                    playerMessage.innerText = "You've Got A Match";
                    playerMessage.style.color = '#7de2d1';
                    matchCounter += 2;
                    if (matchCounter >= allCards.length) {
                        playerMessage.innerText = "All cards matched. You won!";   //all cards matched
                        playerMessage.style.color = '#7de2d1';
                        setTimeout(() => {
                            alert("All cards matched. You Won!");
                        }, 500);

                    }
                } else {
                    // Cards don't match
                    playerMessage.innerText = "No Match";
                    playerMessage.style.color = '#e4000f';

                    setTimeout(() => {
                        first.querySelector('img').classList.remove('flip');
                        second.querySelector('img').classList.remove('flip');
                        first = "";
                        second = "";
                    }, 1000);
                }
            }
        })
    })
}



matchCards();
