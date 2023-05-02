export function shuffleNumbers(array) {
    // Rend aléatoire les chiffres présents
    let currentIndex = array.length
    let randomIndex
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }
    return array
  }