/**********************************************
 * STARTER CODE                               *
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**
 * help()
 * Displays the game instructions.
 * @Return: String
 */

function help () {
  return `Welcome to Scramble. 
The game where you unscramble letters to make words.

Once you start the game, you will be given a scrambled word.
If you correctly guess the word, you will receive a point.
If you guess incorrectly you will receive a strike.
You can also pass on a word. 

To start a new game use start().
To make guess use guess('word').
To skip a word use pass().
To show these instructions again use help().`
}

// Displays the instructions when the page loads.
console.log(help())

/**********************************************
 * YOUR CODE BELOW                            *
 **********************************************/

const words = [
  'CARRION',
  'FRIDGE',
  'MICROWAVE',
  'SOUND',
  'PASSAGE',
  'DEFACTOR',
  'REDACTED',
  'MELODIC',
  'SNAKE',
  'EUPHORIA']

const game = {
  active: false,
  words: [],
  word: '',
  scrambled: '',
  strikes: 0,
  points: 0,
  maxStrikes: 5,
  passes: 3,
  minPasses: 0,
  passCost: 1,
}


function start () {
  if (!game.active) {
    game.active = true
    game.strikes = 0
    game.points = 0
    game.passes = 2
    game.words = shuffle(words)
    game.word = game.words.shift()
    game.scrambled = shuffle(game.word)
    var sentence = 'The game has begun!\n First word: '
    var fullOutput = sentence + game.scrambled
    return fullOutput
  } else {
    return 'There is already an active game'
  }
}

function guess (i) {
  if (game.active) {
    if (game.strikes < game.maxStrikes - 1) {
      if (i.toUpperCase() === game.word) {
        game.points = game.points += 1
        if (game.words.length >= 1) {
          game.word = game.words.shift()
          game.scrambled = shuffle(game.word)
          while (game.scrambled === game.word) {
            game.scrambled = shuffle(game.word)
          }
          var correctSentence = i.toUpperCase() + ' is correct! +1pt*\n Next word: '
          var correctOutput = correctSentence + game.scrambled
          return correctOutput
        } else {
          game.active = false
          var winSentence = 'Congratulations, you have successfully guessed all of the words!\n Total points: '
          return winSentence + game.points
        }
      } else {
        game.strikes += 1
        for (i = 0; i < 1; i++) {
          var strikesAccumulated = game.strikes
          var strikeSentence = 'You have guessed wrong. You get a strike, (' + strikesAccumulated + ' of 5).\n Try again: '
          var strikesOutput = strikeSentence + game.scrambled
          return strikesOutput
        }
      }
    } else {
      game.active = false
      return 'You have reached the maximum strike count (5 of 5), game over!'
    }
  } else {
    return 'There is currently no active game running, please use the command "start()" to begin a new game.'
  }
}

function pass () {
  if (game.active) {
    if (game.points >= game.passCost) {
      if (game.passes > game.minPasses) {
        if (game.words.length >= 1) {
          game.points = game.points -= game.passCost
          game.passes--
          game.word = game.words.shift()
          game.scrambled = shuffle(game.word)
          while (game.scrambled === game.word) {
            game.scrambled = shuffle(game.word)
          }
          var passSentence = 'You used a pass!\n Next word: '
          var passOutput = passSentence + game.scrambled
          return passOutput
        } else {
          game.active = false
          var winSentence = 'Congratulations!\nYou have used a pass to complete the game.\n Total points: '
          return winSentence + game.points
        }
      } else {
        var noPassSentence = 'Passes are out of stock...\nTry again: '
        var noPassOutput = noPassSentence + game.scrambled
        return noPassOutput
      }
    } else {
      var pointsRemaining = game.passCost - game.points
      var noFundsSentence = 'You need ' + pointsRemaining + ' more points to redeem a pass...\n Try again: '
      var noFundsOutput = noFundsSentence + game.scrambled
      return noFundsOutput
    }
  } else {
    return 'There is currently no active game running, please use the command start() to begin a new game.'
  }
}
