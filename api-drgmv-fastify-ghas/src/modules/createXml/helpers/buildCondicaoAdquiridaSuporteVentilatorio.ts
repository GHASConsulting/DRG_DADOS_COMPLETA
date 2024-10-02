import { CondicaoAdquiridaSuporteVentilatorio } from '../../../models/condicaoAdquiridaSuporteVentilatorio'

/** @description bioldCondicaoAdquirida builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCondicaoAdquiridaSuporteVentilatorio(
  item: any,
): Promise<CondicaoAdquiridaSuporteVentilatorio> {
  const condicaoAdquiridaSuporteVentilatorio =
    new CondicaoAdquiridaSuporteVentilatorio()
  condicaoAdquiridaSuporteVentilatorio.setDataOcorrencia(
    item.DT_OCORRENCIA_SUP_VENT,
  )
  condicaoAdquiridaSuporteVentilatorio.setCodigoCondicaoAdquirida(
    item.CD_COND_ADQ_SUP_VENT,
  )
  return condicaoAdquiridaSuporteVentilatorio
}
