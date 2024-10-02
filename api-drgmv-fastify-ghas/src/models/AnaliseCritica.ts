export class AnaliseCritica {
  private dataAnalise: string
  private analiseCritica: string

  public setDataAnalise(dataAnalise) {
    this.dataAnalise = dataAnalise
  }

  public setAnaliseCritica(analiseCritica) {
    this.analiseCritica = analiseCritica
  }

  public getData(): object {
    return {
      dataAnalise: this.dataAnalise,
      analiseCritica: this.analiseCritica,
    }
  }
}
