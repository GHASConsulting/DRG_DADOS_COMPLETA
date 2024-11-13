export class CidSecundario {
  private codigoCidSecundario: string

  constructor() {
    this.codigoCidSecundario = ''
  }

  public setCidSecundario(codigoCidSecundario) {
    this.codigoCidSecundario = codigoCidSecundario
  }

  public getData(): object {
    return {
      codigoCidSecundario: this.codigoCidSecundario,
    }
  }
}


