import knex from '../../../config/database'
import { CondicaoAdquiridaCateterVascularCentral } from '../../../models/CondicaoAdquiridaCateterVascularCentral'
import { AltaAdministrativa } from '../../../models/altaAdministrativa'
import { CondicaoAdquirida } from '../../../models/condicaoAdquirida'
import { Internacao } from '../../../models/internacao'
import { PartoAdequado } from '../../../models/partoAdequado'
import { converterData } from '../../../utils/formatDate_yyyy-mm-dd'
import { buildAnaliseCritica } from './buildAnaliseCritica'
import { buildCateterVascularCentral } from './buildCateterVascularCentral'
import { buildCidSecundario } from './buildCidSecundario'
import { buildCondicaoAdquirida } from './buildCondicaoAdquirida'
import { buildCondicaoAdquiridaCateterVascularCentral } from './buildCondicaoAdquiridaCateterVascularCentral'
import {
  buildCondicaoAdquiridaSondaVesicalDeDemora,
} from './buildCondicaoAdquiridaSondaVesicalDeDemora'
import { buildCondicaoAdquiridaSuporteVentilatorio } from './buildCondicaoAdquiridaSuporteVentilatorio'
import { buildCti } from './buildCti'
import { buildHospital } from './buildHospital'
import { buildMedico } from './buildMedico'
import { buildOperadora } from './buildOperadora'
import { buildPaciente } from './buildPaciente'
import { buildPartoAdequado } from './buildPartoAdequado'
import { buildProcediemnto } from './buildProcedimento'
import { buidlRn } from './buildRn'
import { buildSondaVesicalDeDemora } from './buildSondaVesicalDeDemora'
import { buildSuporteVentilatorioFromDatabase } from './buildSuporteVentilatorio'

/**
 *
 * @param item is a item of select
 * @returns every data of <internacao> tag for mount a XML.
 */
export async function buildInternacao(item: any): Promise<Internacao> {
  const TBL_MEDICO = process.env.TBL_MEDICO
  const TBL_CID_SEC = process.env.TBL_CID_SEC
  const TBL_PROCEDIMENTO = process.env.TBL_PROCEDIMENTO
  const TBL_CTI = process.env.TBL_CTI
  const TBL_RN = process.env.TBL_RN
  const TBL_SUPORTEVENTILATORIO = process.env.TBL_SUPORTEVENTILATORIO
  const TBL_CATETERVASCULARCENTRAL = process.env.TBL_CATETERVASCULARCENTRAL
  const TBL_SONDAVESICALDEDEMORA = process.env.TBL_SONDAVESICALDEDEMORA
  const TBL_CONDICAOADQUIRIDA = process.env.TBL_CONDICAOADQUIRIDA
  const TBL_PARTO_ADEQUADO = process.env.TBL_PARTO_ADEQUADO
  const TBL_CONDICAOADQUIRIDA_CATETERVASCULARCENTRAL =
    process.env.TBL_CONDICAOADQUIRIDA_CATETERVASCULARCENTRAL
  const TBL_CONDICAOADQUIRIDA_SONDAVESICALDEDEMORA =
    process.env.TBL_CONDICAOADQUIRIDA_SONDAVESICALDEDEMORA
  const TBL_CONDICAOADQUIRIDA_SUPORTEVENTILATORIO =
    process.env.TBL_CONDICAOADQUIRIDA_SUPORTEVENTILATORIO
  const TBL_ANALISECRITICA = process.env.TBL_ANALISECRITICA
  const internacao = new Internacao()

  const CD_DTI_ATENDIMENTO = item.CD_DTI_ATENDIMENTO
  internacao.setSituacao(item.SITUACAO_INTERNACAO)
  internacao.setCaraterInternacao(item.CARATER_INTERNACAO)
  internacao.setNumeroRegistro(item.NUMEROREGISTRO)
  internacao.setNumeroAtendimento(item.NR_ATENDIMENTO)
  internacao.setNumeroAutorizacao(item.NR_AUTORIZACAO)
  // console.log('item.dataAlta' + item.DT_ALTA)
  internacao.setLeito(item.DS_LEITO)
  const formatedDate: any = converterData(item.DT_INTERNACAO)
  internacao.setDataInternacao(formatedDate)

  const formatedDateAlta: any = converterData(item.DT_ALTA)
  internacao.setDataAlta(formatedDateAlta)
  internacao.setCondicaoAlta(item.CONDICAO_ALTA)
  internacao.setCodigoCidPrincipal(item.CD_CID_PRINCIPAL)
  internacao.setDataAutorizacao(item.DT_AUTORIZACAO)
  internacao.setInternadoOutrasVezes(item.INTERNADO_OUTRAS_VEZES)
  internacao.setReiternacao(item.REITERNACAO)
  internacao.setRecaida(item.RECAIDA)

  // eslint-disable-next-line eqeqeq
  if (item.SITUACAO_INTERNACAO == 2 || item.SITUACAO_INTERNACAO == 3) {
    internacao.setAcao('COMPLEMENTAR')
  } else {
    internacao.setAcao('')
  }

  const hospital = await buildHospital(item)
  internacao.addHospital(hospital)

  const paciente = await buildPaciente(item)
  if (item.CD_OPERADORA) {
    const operadora = await buildOperadora(item)
    paciente.setParticular('N')
    internacao.addOpradora(operadora)
  } else {
    paciente.setParticular('S')
    console.log('particular setado pra S')
  }
  internacao.addPaciente(paciente)

  const dataMedicoFromDatabase = await knex
    .select(
      'CD_DTI_ATENDIMENTO',
      'NM_MEDICO',
      'DDD_MEDICO',
      'NR_TELEFONE_MEDICO',
      'EMAIL_MEDICO',
      'UF_MEDICO',
      'CRM_MEDICO',
      'ESPECIALIDADE_MEDICO',
      'MEDICO_RESPONSAVEL',
      'TP_ATUACAO_MEDICO',
    )
    .distinct('CRM_MEDICO')
    .from(TBL_MEDICO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const medicalItens of dataMedicoFromDatabase) {
    const medico = await buildMedico(medicalItens)
    internacao.addMedico(medico)
  }

  const dataCidFromDatabase = await knex
    .select('CD_CID')
    .from(TBL_CID_SEC)
    .where({ CD_DTI_ATENDIMENTO })
  for (const cidItens of dataCidFromDatabase) {
    const cidSecundario = await buildCidSecundario(cidItens)
    internacao.addCodigoCidSecundario(cidSecundario)
  }

  const dataProcedimentoFromDatabase = await knex
    .select(
      'CD_PROCEDIMENTO',
      'DT_EXEC',
      'DT_SOLIC',
      'DT_FIM_EXEC',
      'CD_CIRURGIA_AVISO',
    )
    .distinct('CD_CIRURGIA_AVISO')
    .from(TBL_PROCEDIMENTO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const procedimentoItens of dataProcedimentoFromDatabase) {
    const procedimento = await buildProcediemnto(
      procedimentoItens,
      CD_DTI_ATENDIMENTO,
    )
    internacao.addProcedimento(procedimento)
  }
  const dataCtiFromDatabase = await knex
    .select(
      'DT_INICIAL_CTI',
      'DT_FINAL_CTI',
      'CD_CID_PRINCIPAL',
      'CONDICAO_ALTA_CTI',
      'UF_CTI',
      'CRM_CTI',
      'NM_HOSPITAL',
      'CD_HOSPITAL',
      'DS_LEITO',
      'TIPO',
    )
    .from(TBL_CTI)
    .where({ CD_DTI_ATENDIMENTO })
  for (const ctiItens of dataCtiFromDatabase) {
    const cti = await buildCti(ctiItens)
    internacao.addCti(cti)
  }

  const dataCondicaoAdquiridaFromDatabase = await knex
    .select(
      'CD_DTI_ATENDIMENTO',
      'CODIGOCONDICAOADQUIRIDA',
      'DATAOCORRENCIA',
      'DATAMANIFESTACAO',
      'UF',
      'CRM',
    )
    .from(TBL_CONDICAOADQUIRIDA)
    .where({ CD_DTI_ATENDIMENTO })
  console.log('AAA' + dataCondicaoAdquiridaFromDatabase)
  for (const itemCondicaoAdquirida of dataCondicaoAdquiridaFromDatabase) {
    const condicaoAdquirida = await buildCondicaoAdquirida(
      itemCondicaoAdquirida,
    )
    internacao.addCondicaoAdquirida(condicaoAdquirida)
  }

  const dataSuporteVentilatorioFromDatabase = await knex
    .select(
      'CD_DTI_ATENDIMENTO',
      'DT_INICIAL_SUP_VENTILATORIO',
      'DT_FINAL_SUP_VENTILATORIO',
    )
    .from(TBL_SUPORTEVENTILATORIO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const suporteVentilatorioItem of dataSuporteVentilatorioFromDatabase) {
    const suporteVentilatorio = await buildSuporteVentilatorioFromDatabase(
      suporteVentilatorioItem,
    )
    internacao.addSuporteVentilatorio(suporteVentilatorio)
  }

  const altaAdministrativa = new AltaAdministrativa()
  altaAdministrativa.setNumeroAtendimento(item.NR_ATEND_ALTA_ADM)
  altaAdministrativa.setNumeroAutorizacao(item.NR_AUTORIZACAO_ALTA_ADM)
  internacao.addAltaAdministrativa(altaAdministrativa)

  console.log('tabela parto' + TBL_PARTO_ADEQUADO)

  const dataPartoAdequado = await knex
    .select(
      'CD_ANT_OBSTETRICOS',
      'NR_CESAREAS_ANT',
      'CD_RN1',
      'CD_RN2',
      'CD_RN3',
      'CD_RN4',
      'CD_RN5',
      'CD_INICIO_PARTO',
      'IE_RUPTURA_UTERINA',
      'IE_LACERACAO_PERINEAL',
      'IE_TRANSFUSAO_SANGUINEA',
      'IE_MORTE_MATERNA',
      'IE_MORTE_FETAL',
      'IE_ADM_MATERNA',
      'IE_RETORNO_PARTO',
      'QT_SATISFACAO_HOSP',
      'QT_SATISFACAO_EQUIPE',
      'IE_CONTATO_PELE',
      'CD_POSICAO_PARTO',
      'IE_MEDICACAO_INDUCAO',
      'CD_OCITOCINA',
      'IE_PARTURIENTE_ACOMP',
      'IE_DOULA',
      'IE_EPISIOTOMIA',
      'IE_ALEITAMENTO',
      'CD_CLAMPEAMENTO',
      'IE_ANALGESIA',
      'DS_ANALGESIA',
      'QT_PER_CEF_RN1',
      'QT_PER_CEF_RN2',
      'QT_PER_CEF_RN3',
      'QT_PER_CEF_RN4',
      'QT_PER_CEF_RN5',
      'CD_MOT_CESARIANA',
      'NR_PAR_NAT_ANT',
      'CD_DTI_ATENDIMENTO',
    )
    .from(TBL_PARTO_ADEQUADO)
    .where({ CD_DTI_ATENDIMENTO })

  for (const item of dataPartoAdequado) {
    const partoAdequado = await buildPartoAdequado(item)
    internacao.addPartoAdequado(partoAdequado)
  }

  const dataSondaVesicalDeDemoraFromDatabase = await knex
    .select('*')
    .from(TBL_SONDAVESICALDEDEMORA)
    .where({ CD_DTI_ATENDIMENTO })

  for (const itemSonda of dataSondaVesicalDeDemoraFromDatabase) {
    const sondaVesicalDeDemora = await buildSondaVesicalDeDemora(itemSonda)
    internacao.addSondaVesicalDeDemora(sondaVesicalDeDemora)
  }

  const dataCateterVascularCentralFromDatabase = await knex
    .select('*')
    .from(TBL_CATETERVASCULARCENTRAL)
    .where({ CD_DTI_ATENDIMENTO })

  for (const itemCateter of dataCateterVascularCentralFromDatabase) {
    const cateterVascularCentral =
      await buildCateterVascularCentral(itemCateter)

    internacao.addCateterVascularCentral(cateterVascularCentral)
  }

  const dataCondicaoAdquiridaCateterVascularCentral = await knex
    .select('CD_COND_ADQ_CATETER', 'DT_OCORRENCIA_CATETER')
    .from(TBL_CONDICAOADQUIRIDA_CATETERVASCULARCENTRAL)
    .where({ CD_DTI_ATENDIMENTO })
  for (const item of dataCondicaoAdquiridaCateterVascularCentral) {
    const condicaoAdquiridaCateterVascularCentral =
      await buildCondicaoAdquiridaCateterVascularCentral(item)
    internacao.addCondicaoAdquiridaCateterVascularCentral(
      condicaoAdquiridaCateterVascularCentral,
    )
  }
  console.log('Antes cond SONDA = ' + TBL_CONDICAOADQUIRIDA_SONDAVESICALDEDEMORA)

  const dataCondicaoAdquiridaSondaVesicalDeDemora = await knex
    .select('CD_COND_ADQ_SONDA', 'DT_OCORRENCIA_SONDA')
    .from(TBL_CONDICAOADQUIRIDA_SONDAVESICALDEDEMORA)
    .where({ CD_DTI_ATENDIMENTO })
  for (const item of dataCondicaoAdquiridaSondaVesicalDeDemora) {
    const condicaoAdquiridaSondaVesicalDeDemora =
      await buildCondicaoAdquiridaSondaVesicalDeDemora(item)
    internacao.addCondicaoAdquiridaSondaVesicalDeDemora(
      condicaoAdquiridaSondaVesicalDeDemora,
    )
  }

  const dataCondicaoAdquiridaSuporteVentilatorio = await knex
    .select('CD_COND_ADQ_SUP_VENT', 'DT_OCORRENCIA_SUP_VENT')
    .from(TBL_CONDICAOADQUIRIDA_SUPORTEVENTILATORIO)
    .where({ CD_DTI_ATENDIMENTO })
  for (const item of dataCondicaoAdquiridaSuporteVentilatorio) {
    const condicaoAdquiridaSuporteVentilatorio =
      await buildCondicaoAdquiridaSuporteVentilatorio(item)
    internacao.addCondicaoAdquiridaSuporteVentilatorio(
      condicaoAdquiridaSuporteVentilatorio,
    )
  }

  const dataAnalsieCritica = await knex
    .select('DT_ANALISE', 'DS_ANALISE')
    .from(TBL_ANALISECRITICA)
    .where({ CD_DTI_ATENDIMENTO })
  for (const item of dataAnalsieCritica) {
    const analiseCritica = await buildAnaliseCritica(item)
    internacao.addAnaliseCritica(analiseCritica)
  }

  const dataRn = await knex
    .select(
      'PESO_NASCIMENTO',
      'IDADE_GESTACIONAL',
      'QT_COMPRIMENTO',
      'IE_SEXO',
      'IE_NASC_VIVO',
      'IE_TOCOTRAUMATISMO',
      'IE_APGAR',
      'VL_APGAR_QUINTO_MIN',
      'IE_ALTA_48HRS',
      'NR_AUTORIZACAO_MAE',
      'NR_ATENDIMENTO_MAE',
      'NR_CARTEIRINHA_MAE',
    )
    .from(TBL_RN)
    .where({ CD_DTI_ATENDIMENTO })
  for (const item of dataRn) {
    const rn = await buidlRn(item)
    internacao.addRn(rn)
  }

  return internacao
}
