// https://what-problem-does-it-solve.com/webpack/css.html
import './css/styles.css';

/* globals document:true */
import playerObject from './playerObject';
import startGame from './startGame';
import wait from './utilities/wait';

// eslint-disable-next-line func-names
(async function() {
  const checkForEnterKey = (event) => {
    event.preventDefault();
    if (event.key === 'Enter') {
      // eslint-disable-next-line no-use-before-define
      addPlayerNameToPlayerObject();
    }
  };
  const addPlayerNameToPlayerObject = () => {
    const playerNameInputValue =
      playerObject.domElements.playerNameInputBox.value;
    if (playerNameInputValue) {
      document.getElementById('player_name_entry_div').hidden = true;
      playerObject.domElements.playerNameSubmitButton.removeEventListener(
        'click',
        addPlayerNameToPlayerObject,
      );
      playerObject.domElements.playerNameInputBox.removeEventListener(
        'keyup',
        checkForEnterKey,
      );
      playerObject.playerName = playerNameInputValue;
    }
  };
  if (!playerObject.playerName) {
    playerObject.domElements.playerNameSubmitButton.addEventListener(
      'click',
      addPlayerNameToPlayerObject,
    );
    playerObject.domElements.playerNameInputBox.addEventListener(
      'keyup',
      checkForEnterKey,
    );
    document.getElementById('loading_text').hidden = true;
    document.getElementById('player_name_entry_div').hidden = false;
    playerObject.domElements.playerNameInputBox.focus();

    while (!playerObject.playerName) {
      // eslint-disable-next-line no-await-in-loop
      await wait(1);
    }
  }
  await startGame();
})();
