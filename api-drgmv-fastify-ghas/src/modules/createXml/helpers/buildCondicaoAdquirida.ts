import { CondicaoAdquirida } from '../../../models/condicaoAdquirida'

/** @description bioldCondicaoAdquirida builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCondicaoAdquirida(
  item: any,
): Promise<CondicaoAdquirida> {
  const condicaoAdquirida = new CondicaoAdquirida()
  condicaoAdquirida.setCodigoCondicaoAdquirida(item.CODIGOCONDICAOADQUIRIDA)
  condicaoAdquirida.setDataOcorrencia(item.DATAOCORRENCIA)
  condicaoAdquirida.setDataManifestacao(item.DATAMANIFESTACAO)
  condicaoAdquirida.setUf(item.UF)
  condicaoAdquirida.setCrm(item.CRN)

  return condicaoAdquirida
}
