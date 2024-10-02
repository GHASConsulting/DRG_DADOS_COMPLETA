import { CondicaoAdquiridaCateterVascularCentral } from '../../../models/CondicaoAdquiridaCateterVascularCentral'

/** @description bioldCondicaoAdquirida builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCondicaoAdquiridaCateterVascularCentral(
  item: any,
): Promise<CondicaoAdquiridaCateterVascularCentral> {
  const condicaoAdquiridaCateterVascularCentral =
    new CondicaoAdquiridaCateterVascularCentral()
  condicaoAdquiridaCateterVascularCentral.setCodigoCondicaoAdquirida(
    item.CD_COND_ADQ_CATETER,
  )
  condicaoAdquiridaCateterVascularCentral.setDataOcorrencia(
    item.DT_OCORRENCIA_CATETER,
  )

  return condicaoAdquiridaCateterVascularCentral
}
