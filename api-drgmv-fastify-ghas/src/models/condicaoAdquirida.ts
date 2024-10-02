export class CondicaoAdquirida {
  private codigoCondicaoAdquirida: string
  private dataOcorrencia: string
  private dataManifestacao: string
  private uf: string
  private crm: string

  constructor() {
    this.codigoCondicaoAdquirida = ''
    this.dataOcorrencia = ''
    this.dataManifestacao = ''
    this.uf = ''
    this.crm = ''
  }

  public setCodigoCondicaoAdquirida(codigoCondicaoAdquirida) {
    this.codigoCondicaoAdquirida = codigoCondicaoAdquirida
  }

  public setDataOcorrencia(dataOcorrencia) {
    this.dataOcorrencia = dataOcorrencia
  }

  public setDataManifestacao(dataManifestacao) {
    this.dataManifestacao = dataManifestacao
  }

  public setUf(uf) {
    this.uf = uf
  }

  public setCrm(crm) {
    this.crm = crm
  }

  public getData(): object {
    return {
      codigoCondicaoAdquirida: this.codigoCondicaoAdquirida,
      dataOcorrencia: this.dataOcorrencia,
      dataManifestacao: this.dataManifestacao,
      uf: this.uf,
      crm: this.crm,
    }
  }
}
