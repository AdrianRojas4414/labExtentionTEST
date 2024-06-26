export class ModifiedLinesMetric {
    value = 0;
    points = 0;
    feedbackMessage = "";
  
    constructor(value) {
      this.value = value;
      this.assignPoints();
      this.assignFeedbackMessage();
    }
  
    getValue() {
      return this.value;
    }
  
    getPoints() {
      return this.points;
    }
  
    getFeedbackMessage() {
      return this.feedbackMessage;
    }
  
    isIncorrect() {
      return this.value == 0;
    }
  
    isCorrect() {
      return this.value > 0 && this.value <= 35;
    }
  
    isRelativelyGood() {
      return this.value > 35 && this.value <= 50;
    }
  
    assignPoints() {
      switch (true) {
        case this.isIncorrect():
          this.points = 0;
          break;
        case this.isCorrect():
          this.points = 100;
          break;
        case this.isRelativelyGood():
          this.points = 70;
          break;
        default:
          this.points = 10;
          break;
      }
    }
    assignFeedbackMessage() {
      switch (true) {
        case this.isIncorrect():
          this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. Debes hacer los cambios necesarios para el ciclo TDD en tu código antes de hacer un commit. No te desanimes. ¡Aplica lo aprendido en la siguiente!`
          break;
        case this.isCorrect():
          this.feedbackMessage = `✔ Líneas de código modificadas: ${this.value}. El código sufrió pocos cambios. ¡Buen trabajo! ¡Sigue así!`
          break;
        case this.isRelativelyGood():
          this.feedbackMessage = `🤔 Líneas de código modificadas: ${this.value}. Muchas líneas de código modificadas para ser un ciclo TDD, debes reducir los cambios que realizas al código en cada ciclo ¡Lo harás mejor en el siguiente commit!`
          break;
        default:
          this.feedbackMessage = `❌ Líneas de código modificadas: ${this.value}. Demasiadas líneas de código añadidas. Debes hacer solo los cambios necesarios en cada ciclo de TDD. ¡Vamos, puedes hacerlo mejor y tendrás más puntos!`
          break;
      }
    }
  }