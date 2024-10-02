import { CondicaoAdquiridaSondaVesicalDeDemora } from '../../../models/CondicaoAdquiridaSondaVesicalDeDemora'

/** @description bioldCondicaoAdquirida builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCondicaoAdquiridaSondaVesicalDeDemora(
  item: any,
): Promise<CondicaoAdquiridaSondaVesicalDeDemora> {
  const condicaoAdquiridaSondaVesicalDeDemora =
    new CondicaoAdquiridaSondaVesicalDeDemora()
  condicaoAdquiridaSondaVesicalDeDemora.setCodigoCondicaoAdquirida(
    item.CD_COND_ADQ_SONDA,
  )
  condicaoAdquiridaSondaVesicalDeDemora.setDataOcorrencia(
    item.DT_OCORRENCIA_SONDA,
  )

  return condicaoAdquiridaSondaVesicalDeDemora
}
