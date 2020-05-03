// All the DOM selectors stored as short variables
const board = document.getElementById('board')
const winOrLose = document.getElementById('winOrLose')
const winOrLoseText = document.getElementById('winOrLoseText')
const restartButton = document.getElementById('restart')
const playAgainButton = document.getElementById('playAgain')
const filterButton = document.getElementById('filter')
const questions = document.getElementById('questions')

// Array of objects of the characters
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hairColor: 'hidden',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoke: false,
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoke: false,
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hairColor: 'grey',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoke: true,
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hairColor: 'black',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hairColor: 'purple',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoke: true,
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hairColor: 'brown',
    eyeColor: 'blue',
    glasses: true,
    hat: true,
    smoke: true,
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: true,
    smoke: true,
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hairColor: 'white',
    eyeColor: 'hidden',
    glasses: false,
    hat: true,
    smoke: false,
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoke: false,
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hairColor: 'black',
    eyeColor: 'blue',
    glasses: true,
    hat: false,
    smoke: false,
  },

  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoke: false,
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hairColor: 'grey',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoke: false,
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoke: false,
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hairColor: 'black',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoke: false,
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: true,
    smoke: false,
  },
]

// Global variables
let secret, latestAnswer, characters

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  characters.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly set a secret person
const setSecret = () => {
  secret = characters[Math.floor(Math.random() * characters.length)]
}

// when clicking guess, you first have to conform that you want to make a guess
const guess = (suspect) => {
  const makeAGuess = confirm(`Are you sure you want to guess on ${suspect}?`)

  if (makeAGuess) {
    checkMyGuess(suspect)
  }
}

// If you confirm, this function is invoked
const checkMyGuess = (suspect) => {
  if (suspect === secret.name) {
    winOrLoseText.innerHTML = `YAY! Congrats <br>
     – you won! <span role="image" aria-label="cheer">🙌</span>`
  } else {
    winOrLoseText.innerHTML = `Oh no! You guessed wrong. Game over! <span role="image" aria-label="angry">😤</span>`
  }
  winOrLose.style.display = 'flex'
  board.style.display = 'none'
}

// setting the latestAnswer object when you select something in the dropdown
const handleQuestions = () => {
  const value = questions.value
  const optionGroup =
    questions.options[questions.selectedIndex].parentNode.label

  if (optionGroup === 'hair color') {
    latestAnswer = {
      key: 'hairColor',
      value: value,
      keep: secret.hairColor === value,
      group: optionGroup,
    }
  } else if (optionGroup === 'eye color') {
    latestAnswer = {
      key: 'eyeColor',
      value: value,
      keep: secret.eyeColor === value,
      group: optionGroup,
    }
  } else {
    latestAnswer = {
      key: value,
      value: secret[value],
      keep: secret[value],
      group: optionGroup,
    }
  }
}
// This function is invoked whne you clikc on find out.
// It'll filter the characters array and redraw the game board.
const filterCharacters = () => {
  const { keep, key, value, group } = latestAnswer

  if (group === 'Accessories') {
    if (keep) {
      alert(`Yes, the person has ${key}! Keep all that has ${key}`)
    } else {
      alert(`No, the person doesn't have ${key}! Remove all that has ${key}`)
    }
    characters = characters.filter((person) => person[key] === value)
  } else {
    if (keep) {
      alert(
        `Yes, the person has ${value} ${group}! Keep all with ${value} ${group}.`
      )
      characters = characters.filter((person) => person[key] === value)
    } else {
      alert(
        `No, the person doesn't have ${value} ${group}! Remove all with ${value} ${group}.`
      )
      characters = characters.filter((person) => person[key] !== value)
    }
  }

  generateBoard()
}

// the function to start (and restart) the game
const start = () => {
  characters = CHARACTERS // reset characters to the inital array
  winOrLose.style.display = 'none' // dont show the win/lose screen
  board.style.display = 'flex' // show the game board again
  setSecret() // set a new secret person
  generateBoard() // draw the board with all the people
}

// Starts the game when website is loaded
start()

// All the event listeners
restartButton.addEventListener('click', start)
playAgainButton.addEventListener('click', start)
filterButton.addEventListener('click', filterCharacters)
questions.addEventListener('change', handleQuestions)
