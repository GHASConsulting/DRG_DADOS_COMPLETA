export class Rn {
  private pesoNascimento: string
  private idadeGestacional: string
  private comprimento: string
  private sexo: string
  private nascidoVivo: string
  private tocotraumatismo: string
  private apgar: string
  private apgarQuintoMinuto: string
  private alta48horas: string
  private numeroAutorizacaoMae: string
  private numeroAtendimentoMae: string
  private numeroCarteiraMae: string

  constructor() {
    this.pesoNascimento = ''
    this.idadeGestacional = ''
    this.comprimento = ''
    this.sexo = ''
    this.nascidoVivo = ''
    this.tocotraumatismo = ''
    this.apgar = ''
    this.apgarQuintoMinuto = ''
    this.alta48horas = ''
    this.numeroAutorizacaoMae = ''
    this.numeroAtendimentoMae = ''
    this.numeroCarteiraMae = ''
  }

  public setPesoNascimento(pesoNascimento) {
    this.pesoNascimento = pesoNascimento
  }

  public setIdadeGestacional(idadeGestacional) {
    this.idadeGestacional = idadeGestacional
  }

  public setComprimento(comprimento) {
    this.comprimento = comprimento
  }

  public setSexo(sexo) {
    this.sexo = sexo
  }

  public setNacidoVivo(nascidoVivo) {
    this.nascidoVivo = nascidoVivo
  }

  public setTocotraumatismo(tocotraumatismo) {
    this.tocotraumatismo = tocotraumatismo
  }

  public setApgar(apgar) {
    this.apgar = apgar
  }

  public setApgarQuintoMinuto(apgarQuintoMinuto) {
    this.apgarQuintoMinuto = apgarQuintoMinuto
  }

  public setAlta48horas(alta48horas) {
    this.alta48horas = alta48horas
  }

  public setNumeroAutorizacaoMae(numeroAutorizacaoMae) {
    this.numeroAutorizacaoMae = numeroAutorizacaoMae
  }

  public setNumeroAtendimentoMae(numeroAtendimentoMae) {
    this.numeroAtendimentoMae = numeroAtendimentoMae
  }

  public setNumeroCarteiraMae(numeroCarteiraMae) {
    this.numeroCarteiraMae = numeroCarteiraMae
  }

  public getData(): object {
    return {
      pesoNascimento: this.pesoNascimento,
      idadeGestacional: this.idadeGestacional,
      comprimento: this.comprimento,
      sexo: this.sexo,
      nascidoVivo: this.nascidoVivo,
      tocotraumatismo: this.tocotraumatismo,
      apgar: this.apgar,
      apgarQuintoMinuto: this.apgarQuintoMinuto,
      alta48horas: this.alta48horas,
      numeroAutorizacaoMae: this.numeroAutorizacaoMae,
      numeroAtendimentoMae: this.numeroAtendimentoMae,
      numeroCarteiraMae: this.numeroCarteiraMae,
    }
  }
}
