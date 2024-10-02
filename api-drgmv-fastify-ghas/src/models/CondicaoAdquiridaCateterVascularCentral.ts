export class CondicaoAdquiridaCateterVascularCentral {
  private codigoCondicaoAdquirida: string
  private dataOcorrencia: string

  public setCodigoCondicaoAdquirida(codigoCondicaoAdquirida) {
    this.codigoCondicaoAdquirida = codigoCondicaoAdquirida
  }

  public setDataOcorrencia(dataOcorrencia) {
    this.dataOcorrencia = dataOcorrencia
  }

  public getData(): object {
    return {
      codigoCondicaoAdquirida: this.codigoCondicaoAdquirida,
      dataOcorrencia: this.dataOcorrencia,
    }
  }
}
