// URL for API
let apiUrl = 'https://prog2700.onrender.com/threeinarow/sample'; // On load use the sample 6 X 6 grid
let puzzleData; // Declare puzzleData globally. puzzleData holds the json file containing puzzle state
let difficulty;

// Fetch puzzle data from the API
async function fetchPuzzleData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

// Main function to initialize the game
async function initializeGame() {
  puzzleData = await fetchPuzzleData(); // Fetch and store puzzle state in puzzleData
  drawGrid(puzzleData);
  setupEventListeners();
}

// Draw the grid using the puzzle data
//Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
function drawGrid(puzzleData) {
  const container = document.getElementById('theGame');
  container.innerHTML = ''; // Clear any existing content
  //Create headings, buttons and checkboxes
  createElements();
  // Create table element
  const table = document.createElement('table');

  puzzleData.rows.forEach((row, rowIndex) => {
    const tr = document.createElement('tr');
    row.forEach((cell, colIndex) => {
      const td = document.createElement('td');
      td.dataset.row = rowIndex;
      td.dataset.col = colIndex;
      td.dataset.state = cell.currentState;
      td.dataset.correctState = cell.correctState;
      td.dataset.canToggle = cell.canToggle;

      setColor(td, cell.currentState);
      if (cell.canToggle) {
        td.classList.add('clickable');
      } else {
        td.classList.add('fixed');
      }

      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  // append created elements to the div aka container
  container.appendChild(table);
}

function createElements() {
  const container = document.getElementById('theGame');
  // Create a div element to hold buttons
  const buttonsDiv = document.createElement('div');
  buttonsDiv.id = 'buttonsDiv';

  // Create a div element to hold difficulty levels a tag
  const difficultyDiv = document.createElement('div');
  difficultyDiv.id = 'difficultyDiv';

  // Create a tag elements for difficulty levels
  const easyDifficulty = document.createElement('a');
  easyDifficulty.innerHTML = 'Easy';
  easyDifficulty.href = '#';
  easyDifficulty.id = 'easyOption';

  const mediumDifficulty = document.createElement('a');
  mediumDifficulty.innerHTML = 'Medium';
  mediumDifficulty.href = '#';
  mediumDifficulty.id = 'mediumOption';

  const hardDifficulty = document.createElement('a');
  hardDifficulty.innerHTML = 'Hard';
  hardDifficulty.href = '#';
  hardDifficulty.id = 'hardOption';

  // Create header
  const puzzleHeader = document.createElement('h2');
  puzzleHeader.innerHTML = 'Welcome to 3-In-A-Row Puzzle';

  // Create buttons and checkboxes
  const checkButton = document.createElement('button');
  checkButton.id = 'check-puzzle';
  checkButton.innerHTML = 'Check';

  // Create label element
  const checkboxLabel = document.createElement('label');
  checkboxLabel.innerHTML = '<b>Error Display</b>';
  checkboxLabel.htmlFor = 'show-errors';

  const difficultyLabel = document.createElement('label');
  difficultyLabel.innerHTML = '<b>Difficulty:</b> ';

  const solveButton = document.createElement('button');
  solveButton.id = 'solve-puzzle';
  solveButton.innerHTML = 'Solve Puzzle';

  const errorCheck = document.createElement('input');
  errorCheck.type = 'checkbox';
  errorCheck.id = 'show-errors';
  errorCheck.innerHTML = 'Show Errors';

  const resetButton = document.createElement('button');
  resetButton.id = 'reset-puzzle';
  resetButton.innerHTML = 'Reset Puzzle';

  // Append created elements to "theGame" container
  container.appendChild(puzzleHeader);
  container.appendChild(difficultyDiv);
  container.appendChild(buttonsDiv);
  document.getElementById('difficultyDiv').appendChild(difficultyLabel).appendChild(easyDifficulty);
  document.getElementById('difficultyDiv').appendChild(mediumDifficulty);
  document.getElementById('difficultyDiv').appendChild(hardDifficulty);
  document.getElementById('buttonsDiv').appendChild(checkButton);
  document.getElementById('buttonsDiv').appendChild(solveButton);
  document.getElementById('buttonsDiv').appendChild(resetButton);
  document.getElementById('buttonsDiv').appendChild(checkboxLabel).appendChild(errorCheck);

}

// Function to set difficulty
function setDifficulty(difficulty) {
  switch (difficulty) {
    case 'easy':
      apiUrl = 'https://prog2700.onrender.com/threeinarow/6x6';
      break;
    case 'medium':
      apiUrl = 'https://prog2700.onrender.com/threeinarow/10x10';
      break;
    case 'hard':
      apiUrl = 'https://prog2700.onrender.com/threeinarow/14x14';
      break

  }
  // Each time difficulty is set, reinitialize the game
  initializeGame();
}

// Change square color based on state
function setColor(td, state) {
  switch (parseInt(state, 10)) {
    case 0:
      td.style.backgroundColor = 'grey';
      break;
    case 1:
      td.style.backgroundColor = 'blue';
      break;
    case 2:
      td.style.backgroundColor = 'white';
      break;
  }
}

// Set up event listeners for the grid and buttons
function setupEventListeners() {
  const cells = document.querySelectorAll('td.clickable');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      let state = parseInt(cell.dataset.state, 10);
      state = (state + 1) % 3; // Cycle states from 0 to 1 to 2 and back to 0
      cell.dataset.state = state;
      setColor(cell, state);
    });
  });

  document.getElementById('check-puzzle').addEventListener('click', () => {
    checkPuzzleStatus();
  });

  document.getElementById('show-errors').addEventListener('change', (event) => {
    displayErrors(event.target.checked);
  });

  document.getElementById('solve-puzzle').addEventListener('click', () => {
    solvePuzzle();
  });
  document.getElementById('reset-puzzle').addEventListener('click', () => {
    resetPuzzle();
  });
  document.getElementById('easyOption').addEventListener('click', () => {
    setDifficulty('easy');
  });
  document.getElementById('mediumOption').addEventListener('click', () => {
    setDifficulty('medium');
  });
  document.getElementById('hardOption').addEventListener('click', () => {
    setDifficulty('hard');
  });
}

// Check the puzzle status and display a message
function checkPuzzleStatus() {
  const cells = document.querySelectorAll('td');
  let allCorrect = true;
  let allFilled = true;
  let partiallyCorrect = true;

  cells.forEach(cell => {
    const expectedState = parseInt(cell.dataset.correctState, 10);
    const currentState = parseInt(cell.dataset.state, 10);

    if (currentState !== expectedState) {
      allCorrect = false;
    }
    if (currentState === 0) {
      allFilled = false;
    }
    if (currentState !== 0 && currentState !== expectedState) {
      partiallyCorrect = false;
    }
  });

  if (allCorrect) {
    alert('You did it!!');
  } else if (partiallyCorrect && !allFilled) {
    alert('Looks good, keep going');
  } else {
    alert('Oops, something does not look right');
  }
}

// Display errors based on checkbox status
function displayErrors(showErrors) {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    const expectedState = parseInt(cell.dataset.correctState, 10);
    const currentState = parseInt(cell.dataset.state, 10);

    if (showErrors && currentState !== expectedState) {
      cell.classList.add('error');
    } else {
      cell.classList.remove('error');
    }
  });
}

// Function to solve the puzzle by setting each cell to its correct state
function solvePuzzle() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const correctState = puzzleData.rows[row][col].correctState;

    cell.dataset.state = correctState;
    setColor(cell, correctState);
  });
  alert("Puzzle Solved!");
}

// Function to reset the puzzle to its initial state
function resetPuzzle() {
  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const initialState = puzzleData.rows[row][col].currentState;

    cell.dataset.state = initialState;
    setColor(cell, initialState);
    cell.classList.remove('error'); // Clear any error indications
  });
  alert("Puzzle reset to initial state!");
}

// Initialize game on page load
initializeGame();
