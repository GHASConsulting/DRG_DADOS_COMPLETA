import { CodigoCidSecundario } from '../../../models/cidSecundario'

/** @description CidSecundario builder, recive a item of itens in the select, return a CidSecundario */
export async function buildCidSecundario(
  cidItens: any,
): Promise<CodigoCidSecundario> {
  const codigoCidSecundario = new CodigoCidSecundario()
  codigoCidSecundario.setCidSecundario(cidItens.CD_CID)

  return codigoCidSecundario
}
