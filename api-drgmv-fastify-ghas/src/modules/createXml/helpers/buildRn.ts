import { Rn } from '../../../models/Rn'

/** @description bioldCondicaoAdquirida builder, recive a item of itens in the select, return a CidSecundario */
export async function buidlRn(item: any): Promise<Rn> {
  const rn = new Rn()
  rn.setPesoNascimento(item.PESO_NASCIMENTO)
  rn.setIdadeGestacional(item.IDADE_GESTACIONAL)
  rn.setComprimento(item.QT_COMPRIMENTO)
  rn.setSexo(item.IE_SEXO)
  rn.setNacidoVivo(item.IE_NASC_VIVO)
  rn.setTocotraumatismo(item.IE_TOCOTRAUMATISMO)
  rn.setApgar(item.IE_APGAR)
  rn.setApgarQuintoMinuto(item.VL_APGAR_QUINTO_MIN)
  rn.setAlta48horas(item.IE_ALTA_48HRS)
  rn.setNumeroAutorizacaoMae(item.NR_AUTORIZACAO_MAE)
  rn.setNumeroAtendimentoMae(item.NR_ATENDIMENTO_MAE)
  rn.setNumeroAutorizacaoMae(item.NR_CARTEIRINHA_MAE)
  return rn
}
