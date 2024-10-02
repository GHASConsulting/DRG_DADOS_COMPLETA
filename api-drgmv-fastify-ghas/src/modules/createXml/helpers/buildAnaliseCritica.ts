import { AnaliseCritica } from '../../../models/AnaliseCritica'

/** @description build a cateter vascular central */
export async function buildAnaliseCritica(item: any): Promise<AnaliseCritica> {
  const analiseCritica = new AnaliseCritica()
  analiseCritica.setAnaliseCritica(item.DS_ANALISE)
  analiseCritica.setDataAnalise(item.DT_ANALISE)
  return analiseCritica
}
