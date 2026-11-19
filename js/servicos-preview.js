const serviceCatalogData = `
ON-LINE|2A VIA DE ACORDO – GUIIAS PARA PAGAMENTO
ON-LINE|2A VIA IPTU
ON-LINE|ACESSO A ISSO PARA AUTÔNOMOS
ON-LINE|ACESSO AO E-MAIL INSTITUCIONAL
ON-LINE|ACESSO CONSULTA TAXAS DIVERSAS
ON-LINE|AUDIENCIA PÚBLICA
ON-LINE|CALENDÁRIO LETIVO
ON-LINE|CAMARA MUNICIPAL DE ARRAIAL DO CABO
ON-LINE|CARDÁPIO ESCOLAR
ON-LINE|CERTIDÃO – EMISSÃO
ON-LINE|CERTIDÃO – EMISSÃO
ON-LINE|COMPRAS E LICITAÇÃO – PORTAL
ON-LINE|CONCURSOS PÚBLICOS
ON-LINE|CONSELHO MUNICIPAL DE MEIO-AMBIENTE
ON-LINE|CONSULTA PÚBLICA – PPA
ON-LINE|CONTRACHEQUE ONLINE
ON-LINE|DESPESAS
ON-LINE|DIÁRIO OFICIAL ELETÔNICO
ON-LINE|E-SIC
ON-LINE|EDITAL DE CHAMAMENTO PÚBLICO
ON-LINE|EMISSÃO DE IRRF
ON-LINE|FALA BR
ON-LINE|FILA DE ESPERA CRECHE
ON-LINE|FUNDO MUNICIPAL DE MEIO-AMBIENTE
ON-LINE|GED – SERVIDOR
ON-LINE|IDAC DIGITAL
ON-LINE|INFORMATIVO GIRA-RENDA CABISTA
ON-LINE|ITBI
ON-LINE|LEI DE DIRETRIZES ORÇAMENTÁRIAS – LDO
ON-LINE|LICITAÇÕES
ON-LINE|LOA – LEI ORÇAMENTÁRIA ANUAL
ON-LINE|NOTA FISCAL ELETRONICA
ON-LINE|OUVIDORIA – FIPAC
ON-LINE|OUVIDORIA – SECRETARIA DE EDUCAÇÃO
ON-LINE|OUVIDORIA – SECRETARIA DE SAÚDE
ON-LINE|OUVIDORIA CONTROLADORIA GERAL DO MUNICIPIO
ON-LINE|OUVIDORIA GERAL DO MUNICÍPIO DE ARRAIAL DO CABO
ON-LINE|OUVIDORIA IDAC
ON-LINE|PLANO MUNICIPAL DE EDUCAÇÃO
ON-LINE|PLANO PLURIANUAL – PPA
ON-LINE|PORTAL DA TRANSPARÊNCIA
ON-LINE|PORTAL DA TRANSPARÊNCIA FIPAC
ON-LINE|PORTAL DA TRANSPARÊNCIA IDAC
ON-LINE|PORTAL DE COMPRAS E LICITAÇÃO – MODERNIZAÇÃO
ON-LINE|PORTAL DE COMPRAS E LICITAÇÃO – NOVO
ON-LINE|PROCESSOS SELETIVOS
ON-LINE|PROCESSO SELETIVO IDAC
ON-LINE|PROTOCOLO WEB – CONSULTA DE PROCESSOS
ON-LINE|PROTOCOLO WEB – PARA SERVIDOR
ON-LINE|RECEITAS
ON-LINE|RELATÓRIO DA VIGILANCIA SOCIOASSISTENCIAL
ON-LINE|RELATÓRIO DE GESTÃO
ON-LINE|RELATORIO FISCALIZAÇÃO 2023
ON-LINE|RELATÓRIO FISCALIZAÇÃO PARTE i
ON-LINE|SISEDUC – SERVIDOR
ON-LINE|SISEDUC PORTAL DO ALUNO
ON-LINE|TAXA PARA VEÍCULO DE TURISMO
ON-LINE|TRANSPARÊNCIA PMAC
ON-LINE|TRANSPARENCIA EDUCAÇÃO
ON-LINE|VALIDAÇÃO CONTRACHEQUE
ON-LINE|WEBMAIL SERVIDOR
PRESENCIAL|APOIO A EVENTOS CULTURAIS
PRESENCIAL|APREENSÃO DE ANIMAIS
PRESENCIAL|ATENDIMENTO PRESENCIAL
PRESENCIAL|ATENDIMENTO SAÚDE
PRESENCIAL|BENEFICIOS EVENTUAIS
PRESENCIAL|CASA DO AUTISTA
PRESENCIAL|CENTRO DE ATENÇÃO PSICOSOCIAL – CAPS
PRESENCIAL|CENTRO DE ESPECIALIDADES ODONTOLÓGICAS – CEO
PRESENCIAL|CENTRO MUNICIPAL DE DOENÇAS INFECCIOSAS
PRESENCIAL|CENTRO MUNICIPAL DE REABILITAÇÃO DE ARRAIAL DO CABO
PRESENCIAL|CENTRO OFTALMOLÓGICO
PRESENCIAL|CIEP 147 MUNICIPALIZADO
PRESENCIAL|CNES
PRESENCIAL|CNS
PRESENCIAL|COLÉGIO MUNICIPAL FRANCISCO PORTO DE AGUIAR
PRESENCIAL|COLÉGIO MUNICIPAL VERA FELIZARDO
PRESENCIAL|COMTRANS
PRESENCIAL|CONSELHO TUTELAR
PRESENCIAL|CONSELHOS VINCULADOS
PRESENCIAL|COORDENADORIA ADMINISTRATIVA E PLANEJAMENTO
PRESENCIAL|CRAS CENTRAL
PRESENCIAL|CRAS FIGUEIRA
PRESENCIAL|CRAS MONTE ALTO
PRESENCIAL|CREAS
PRESENCIAL|CRECHE MUNICIPAL ADIR FIRMO ALVES CUNHA
PRESENCIAL|CRECHE MUNICIPAL HELENA SARAIVA RODRIGUES
PRESENCIAL|CRECHE MUNICIPAL IEDA CORREA DE MACEDO TEIXEIRA
PRESENCIAL|CRECHE MUNICIPAL MARIA CANDIDA DE CAMPOS SOARES
PRESENCIAL|CRECHE MUNICIPAL MARIA DO SOCORRO DANTAS
PRESENCIAL|CRECHE MUNICIPAL STELLA FRAGA
PRESENCIAL|CRECHE MUNICIPAL VICENTE RODRIGUES
PRESENCIAL|DEFESA CIVIL
PRESENCIAL|DEPARTAMENTO DE CADASTRO IMOBILIÁRIO
PRESENCIAL|DEPARTAMENTO DE DÍVIDA ATIVA
PRESENCIAL|DEPARTAMENTO DE ISS
PRESENCIAL|DEPARTAMENTO DE TRIBUTOS IMOBILIÁRIOS E OUTRAS RECEITAS
PRESENCIAL|DIREITOS HUMANOS
PRESENCIAL|DIRETORIA DE ARRECADAÇÃO
PRESENCIAL|ESCOLA MUNICIIPAL SAGRADO CORAÇÃO DE JESUS
PRESENCIAL|ESCOLA MUNICIPAL ADOLPHO BERANGER JUNIOR
PRESENCIAL|ESCOLA MUNICIPAL FRANCISCO LUIZ SOBRINHO
PRESENCIAL|ESCOLA MUNICIPAL JOÃO TORRES
PRESENCIAL|ESCOLA MUNICIPAL SOTERO TEIXEIRA DE SOUZA
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMIÍLIA JUAREZ FELIX PACHECO
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMÍLIA – BOA VISTA
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMÍLIA – CANAA
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMILIA – MONTE ALTO
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMILIA – PRAINHA
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMÍLIA – SABIÁ
PRESENCIAL|ESTRATÉGIA DE SAÚDE DA FAMÍLIA – TEREZA VIEIRA FRANCISCONE
PRESENCIAL|FOMENTO A CULTURA
PRESENCIAL|GABINETE DO PREFEITO
PRESENCIAL|GESTÃO DE ESPAÇOS CULTURAIS
PRESENCIAL|GESTÃO PARTICIPATIVA DA POLÍTICA CULTURAL
PRESENCIAL|GESTÃO SUAS
PRESENCIAL|GUARDA MUNICIPAL
PRESENCIAL|GUARDA VIDA
PRESENCIAL|HOSPITAL MUNICIPAL DE ARRAIAL DO CABO
PRESENCIAL|IDAC
PRESENCIAL|INSTITUTO DE PREVIDÊNCIA CABISTA – IPC
PRESENCIAL|JARDIM DE INFANCIA MUNICIPAL EMILIA CORREA DE MACEDO
PRESENCIAL|JUNTA MILITAR
PRESENCIAL|MEIO-AMBIENTE PESQUISA CIENCIA TECNOLOGIA ESPORTE E LAZER
PRESENCIAL|OFICINAS CULTURAIS GRATUITAS
PRESENCIAL|OUVIDORIA – SECRETARIA DE EDUCAÇÃO
PRESENCIAL|PATRULHA MARIA DA PENHA
PRESENCIAL|POLICLÍNICA MUNICIPAL DE ARRAIAL DO CABO
PRESENCIAL|PONTO DE INFORMAÇÕES TURÍSTICAS
PRESENCIAL|PRESERVAÇÃO DO PATRIMÔNIO CULTURAL
PRESENCIAL|PROGRAMA CRIANÇA FELIZ
PRESENCIAL|PROGRAMA GIRA-RENDA CABISTA
PRESENCIAL|PROGRAMA MELHOR IDADE
PRESENCIAL|PROGRAMA TERRITÓRIOS CULTURAIS
PRESENCIAL|PROMOÇÃO E DIVULGAÇÃO DA CULTURA CABISTA
PRESENCIAL|PRONTO SOCORRO DE FIGUEIRA
PRESENCIAL|PROTEÇÃO SOCIAL BÁSICA
PRESENCIAL|PROTEÇÃO SOCIAL ESPECIAL
PRESENCIAL|PROTOCOLO
PRESENCIAL|RECURSOS HUMANOS
PRESENCIAL|RECURSOS HUMANOS ATENDIMENTO
PRESENCIAL|REGULARIZAÇÃO FUNDIÁRIA (SOCIAL E ESPECÍFICO)
PRESENCIAL|SALA DO EMPREENDEDOR
PRESENCIAL|SECRETARIA DE DESENVOLVIMENTO SOCIAL TRABALHO E RENDA
PRESENCIAL|SECRETARIA DE MOBILIDADE URBANA
PRESENCIAL|SECRETARIA DE ORDEM PÚBLICA POSTURAS E FISCALIZAÇÃO
PRESENCIAL|SECRETARIA DE SERVIÇOS PÚBLICOS
PRESENCIAL|SEDE DO CADASTRO ÚNICO
PRESENCIAL|SERVIÇO DE ACOLHIMENTO EM FAMÍLIA A ACOLHEDORA
PRESENCIAL|SETOR ADMINISTRATIVO – CONTABILIDADE
PRESENCIAL|SUPERINTENDENCIA DA JUVENTUDE
PRESENCIAL|SUPERINTENDENCIA DA MULHER
PRESENCIAL|TRANSPORTE UNIVERSITÁRIO
PRESENCIAL|VIGILANCIA SOCIOASSISTENCIAL E GESTÃO DO TRABALHO
`
  .trim()
  .split("\n")
  .map((row) => {
    const [modality, ...nameParts] = row.split("|");
    return { modality, name: nameParts.join("|").trim() };
  });

if (serviceCatalogData.length !== 154) {
  throw new Error("A prévia do catálogo deve conter 154 serviços.");
}

const serviceLinks = new Map([
  [
    "2A VIA DE ACORDO – GUIIAS PARA PAGAMENTO",
    "https://arraial.egov.modernizacao.com.br/ecac/form.jsp?sys=TTB&action=openform&formID=500000152&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
  ],
  [
    "2A VIA IPTU",
    "https://arraial.egov.modernizacao.com.br/ecac/form.jsp?sys=TTB&action=openform&formID=500000111&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
  ],
  [
    "ACESSO A ISSO PARA AUTÔNOMOS",
    "https://arraial.egov.modernizacao.com.br/ecac/form.jsp?sys=TTB&action=openform&formID=500000200&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
  ],
  [
    "ACESSO AO E-MAIL INSTITUCIONAL",
    "https://mail.hostinger.com/auth/login",
  ],
  [
    "ACESSO CONSULTA TAXAS DIVERSAS",
    "https://arraial.egov.modernizacao.com.br/ecac/form.jsp?sys=TTB&action=openform&formID=500000191&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
  ],
  [
    "AUDIENCIA PÚBLICA",
    "https://transparencia.arraial.modernizacao.com.br/ver20230623/form.jsp?sys=LAI&action=openform&formID=500000725",
  ],
  [
    "CALENDÁRIO LETIVO",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000678",
  ],
  [
    "CAMARA MUNICIPAL DE ARRAIAL DO CABO",
    "https://arraialdocabo.rj.leg.br/",
  ],
  [
    "CARDÁPIO ESCOLAR",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000679",
  ],
  [
    "CERTIDÃO – EMISSÃO",
    [
      "https://arraial.egov.modernizacao.com.br/ecac/openform.do?sys=TTB&action=openform&formID=500000136&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
      "https://arraial.egov.modernizacao.com.br/ecac/openform.do?sys=TTB&action=openform&formID=500000120&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
    ],
  ],
  [
    "COMPRAS E LICITAÇÃO – PORTAL",
    "https://www.idac.rj.gov.br/transparencia_web",
  ],
  [
    "CONCURSOS PÚBLICOS",
    "https://www.arraial.rj.gov.br/concursos",
  ],
  [
    "CONSELHO MUNICIPAL DE MEIO-AMBIENTE",
    "https://transparencia.arraial.modernizacao.com.br/ver20230623/form.jsp?sys=LAI&action=openform&formID=500000946",
  ],
  ["CONSULTA PÚBLICA – PPA", "https://www.arraial.rj.gov.br/ppa"],
  [
    "CONTRACHEQUE ONLINE",
    "https://arraial.egov.modernizacao.com.br/portal/openform.do?sys=PSP&action=openform&formID=8274",
  ],
  ["DESPESAS", "https://www.fipac.rj.gov.br/despesas_index"],
  ["DIÁRIO OFICIAL ELETÔNICO", "https://old.arraial.rj.gov.br/diarios_oficiais_web"],
  [
    "E-SIC",
    "https://falabr.cgu.gov.br/web/login?tipo=8&redirect=/manifestacao/criar?tipo=8",
  ],
  [
    "EDITAL DE CHAMAMENTO PÚBLICO",
    "https://www.arraial.rj.gov.br/edital-cultura-003-2025",
  ],
  [
    "EMISSÃO DE IRRF",
    "https://arraial.egov.modernizacao.com.br/ecac/openform.do?sys=TTB&action=openform&formID=500000222&filter=ACE_Parametro_Tipo_Acesso.Codigo=1",
  ],
  [
    "FALA BR",
    "https://falabr.cgu.gov.br/web/?modoOuvidoria=1&ouvidoriaInterna=false",
  ],
  ["FILA DE ESPERA CRECHE", "https://filadeespera.siseducarraial.org.br/"],
  [
    "FUNDO MUNICIPAL DE MEIO-AMBIENTE",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500001030",
  ],
  ["GED – SERVIDOR", "https://ged.siseducarraial.org.br/login"],
  ["IDAC DIGITAL", "https://idac.rj.gov.br/"],
  [
    "INFORMATIVO GIRA-RENDA CABISTA",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000592",
  ],
  [
    "ITBI",
    "https://trbac.modernizacao.com.br/trb5/form.jsp?sys=TR2&action=openform&formID=464570825",
  ],
  [
    "LEI DE DIRETRIZES ORÇAMENTÁRIAS – LDO",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000747",
  ],
  ["LICITAÇÕES", "https://www.fipac.rj.gov.br/licitacao_index"],
  [
    "LOA – LEI ORÇAMENTÁRIA ANUAL",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000751",
  ],
  ["NOTA FISCAL ELETRONICA", "https://arraial.modernizacao.com.br/"],
  ["OUVIDORIA – FIPAC", "https://www.fipac.rj.gov.br/ouvidoria_web"],
  [
    "OUVIDORIA – SECRETARIA DE EDUCAÇÃO",
    "https://www.arraial.rj.gov.br/ouvidoria",
  ],
  [
    "OUVIDORIA – SECRETARIA DE SAÚDE",
    "https://www.arraial.rj.gov.br/ouvidoria",
  ],
  [
    "OUVIDORIA CONTROLADORIA GERAL DO MUNICIPIO",
    "https://www.arraial.rj.gov.br/ouvidoria",
  ],
  [
    "OUVIDORIA GERAL DO MUNICÍPIO DE ARRAIAL DO CABO",
    "https://www.arraial.rj.gov.br/ouvidoria",
  ],
  ["OUVIDORIA IDAC", "https://www.idac.rj.gov.br/ouvidoria_web"],
  [
    "PLANO MUNICIPAL DE EDUCAÇÃO",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000677",
  ],
  [
    "PLANO PLURIANUAL – PPA",
    "https://transparencia.arraial.modernizacao.com.br/ver20230623/form.jsp?sys=LAI&action=openform&formID=500000749",
  ],
  [
    "PORTAL DA TRANSPARÊNCIA",
    "https://transparencia.arraial.modernizacao.com.br/",
  ],
  [
    "PORTAL DA TRANSPARÊNCIA FIPAC",
    "https://www.fipac.rj.gov.br/transparencia_web",
  ],
  [
    "PORTAL DA TRANSPARÊNCIA IDAC",
    "https://transparencia.idac.rj.gov.br/",
  ],
  [
    "PORTAL DE COMPRAS E LICITAÇÃO – MODERNIZAÇÃO",
    "https://transparencia.arraial.modernizacao.com.br/",
  ],
  [
    "PORTAL DE COMPRAS E LICITAÇÃO – NOVO",
    "https://www.arraial.rj.gov.br/portalcidadao/portallicitacao",
  ],
  [
    "PROCESSOS SELETIVOS",
    "https://www.arraial.rj.gov.br/processoseletivo",
  ],
  ["PROCESSO SELETIVO IDAC", "https://aprocesso.com.br/idac"],
  [
    "PROTOCOLO WEB – CONSULTA DE PROCESSOS",
    "https://arraial.egov.modernizacao.com.br/adm/form.jsp?sys=PRO&action=openform&formID=7175",
  ],
  [
    "PROTOCOLO WEB – PARA SERVIDOR",
    "https://loginunico.arraial.modernizacao.com.br/loginunico/open.do?sys=SLU",
  ],
  ["RECEITAS", "https://www.fipac.rj.gov.br/receitas_index"],
  [
    "RELATÓRIO DA VIGILANCIA SOCIOASSISTENCIAL",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500000745",
  ],
  [
    "RELATÓRIO DE GESTÃO",
    "https://transparencia.arraial.modernizacao.com.br/webrun/form.jsp?sys=LAI&action=openform&formID=500001033",
  ],
  [
    "RELATORIO FISCALIZAÇÃO 2023",
    "https://transparencia.arraial.modernizacao.com.br/webrun/tmp/PortalServices/RELATORIO_FISCALIZACAO_2023.pdf",
  ],
  [
    "RELATÓRIO FISCALIZAÇÃO PARTE i",
    "https://transparencia.arraial.modernizacao.com.br/webrun/tmp/PortalServices/RELATORIO-FISCALIZACAO-2024.pdf",
  ],
  ["SISEDUC – SERVIDOR", "https://siseducarraial.org.br/"],
  ["SISEDUC PORTAL DO ALUNO", "https://portaldoaluno.siseducarraial.org.br/"],
  [
    "TAXA PARA VEÍCULO DE TURISMO",
    "https://arraial.egov.modernizacao.com.br/trb/form.jsp?sys=TR2&action=openform&formID=500000208",
  ],
  [
    "TRANSPARÊNCIA PMAC",
    "https://transparencia.arraial.modernizacao.com.br/",
  ],
  [
    "TRANSPARENCIA EDUCAÇÃO",
    "https://transparencia.arraial.modernizacao.com.br/?serv=179",
  ],
  [
    "VALIDAÇÃO CONTRACHEQUE",
    "https://arraial.egov.modernizacao.com.br/portal/form.jsp?sys=PSP&action=openform&formID=8745",
  ],
  ["WEBMAIL SERVIDOR", "https://mail.hostinger.com/"],
]);

const serviceCatalogPanels = document.querySelectorAll(
  ".service-catalog-panel[data-modality]",
);
const serviceCatalogSearch = document.getElementById("serviceCatalogSearch");

if (serviceCatalogPanels.length !== 2) {
  throw new Error("A prévia deve ter menus para serviços on-line e presenciais.");
}

if (!serviceCatalogSearch) {
  throw new Error("Não foi possível inicializar a busca compartilhada de serviços.");
}

const serviceDetailsDialog = document.getElementById("serviceDetailsDialog");
const serviceDetailsTitle = document.getElementById("serviceDetailsTitle");
const serviceDetailsContent = document.getElementById("serviceDetailsContent");
const serviceDetailsClose = document.getElementById("serviceDetailsClose");

if (
  !serviceDetailsDialog ||
  !serviceDetailsTitle ||
  !serviceDetailsContent ||
  !serviceDetailsClose
) {
  throw new Error("Não foi possível inicializar os detalhes dos serviços.");
}

const missingOnlineLinks = serviceCatalogData
  .filter(
    ({ modality, name }) => modality === "ON-LINE" && !serviceLinks.has(name),
  )
  .map(({ name }) => name);
const missingInPersonDetails = serviceCatalogData
  .filter(
    ({ modality, name }) =>
      modality === "PRESENCIAL" && !inPersonServiceDetails.has(name),
  )
  .map(({ name }) => name);

if (missingOnlineLinks.length > 0) {
  throw new Error(`Faltam links oficiais para: ${missingOnlineLinks.join(", ")}.`);
}

if (missingInPersonDetails.length > 0) {
  throw new Error(
    `Faltam detalhes para: ${missingInPersonDetails.join(", ")}.`,
  );
}

function normalizeServiceSearch(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatServiceName(name) {
  const lowerCaseName = name.toLocaleLowerCase("pt-BR");
  return lowerCaseName.replace(/\p{L}/u, (letter) =>
    letter.toLocaleUpperCase("pt-BR"),
  );
}

function createServiceDetailSection(details) {
  const section = document.createElement("section");
  section.className = "service-details-location";

  if (details.location) {
    const heading = document.createElement("h3");
    heading.textContent = details.location;
    section.append(heading);
  }

  const list = document.createElement("dl");
  const fields = [
    ["Dias de funcionamento", details.days],
    ["Horário de funcionamento", details.hours],
    ["Responsável", details.responsible],
    ["Endereço", details.address],
    ["Telefone", details.phone],
    ["E-mail", details.email],
    ["Descrição", details.description],
  ];

  fields.forEach(([label, value]) => {
    if (!value) {
      return;
    }

    const row = document.createElement("div");
    const term = document.createElement("dt");
    const description = document.createElement("dd");
    row.className = "service-details-row";
    term.textContent = label;
    description.textContent = value;
    row.append(term, description);
    list.append(row);
  });

  section.append(list);
  return section;
}

function showServiceDetails(name) {
  const details = inPersonServiceDetails.get(name);

  if (!details) {
    throw new Error(`Não há detalhes cadastrados para "${name}".`);
  }

  serviceDetailsTitle.textContent = formatServiceName(name);
  serviceDetailsContent.replaceChildren(
    ...details.map(createServiceDetailSection),
  );
  serviceDetailsDialog.showModal();
}

serviceDetailsClose.addEventListener("click", () => {
  serviceDetailsDialog.close();
});
serviceDetailsDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  serviceDetailsDialog.close();
});
serviceDetailsDialog.addEventListener("click", (event) => {
  if (event.target === serviceDetailsDialog) {
    serviceDetailsDialog.close();
  }
});

function getServiceIcon(name) {
  const serviceName = normalizeServiceSearch(name);
  const iconRules = [
    [/concurs|seletiv/, "fa-file-signature"],
    [/saude|hospital|caps|odontolog|oftalm|policlinica|doencas infecciosas|reabilitacao|cnes|cns/, "fa-heart-pulse"],
    [/escola|colegio|creche|ciep|letivo|escolar|siseduc|educacao|aluno|ensino/, "fa-graduation-cap"],
    [/cras|creas|social|suas|renda|beneficio|acolhimento|protecao|cadastro unico|crianca feliz|melhor idade|conselho tutelar|direitos humanos|socioassistencial|familia/, "fa-people-group"],
    [/meio ambiente|ambiental|sustent|fundo municipal de meio/, "fa-leaf"],
    [/cultura|cultural|patrimonio|eventos culturais|oficinas culturais/, "fa-masks-theater"],
    [/compra|licitac|edital|chamamento publico/, "fa-file-signature"],
    [/transparen/, "fa-chart-line"],
    [/iptu|itbi|\biss\b|isso para autonomos|taxa|tribut|arrecadacao|receita|despesa|divida ativa|fiscal|loa|ppa|ldo|irrf|acordo|pagamento|nota fiscal/, "fa-coins"],
    [/certidao|protocolo|processo|emissao|documento|diario oficial/, "fa-file-lines"],
    [/ouvidoria|e-sic|fala br/, "fa-comments"],
    [/defesa civil|guarda|apreensao|patrulha|junta militar/, "fa-shield-halved"],
    [/transporte|onibus|mobilidade|veiculo|turismo|comtrans|guarda vida|informacoes turisticas/, "fa-bus"],
    [/servidor|contracheque|ged|webmail|recursos humanos|administrativo|contabilidade|superintendencia|gabinete|secretaria|coordenadoria|administracao/, "fa-building"],
    [/conselho|camara municipal|prefeitura|municipal|idac|fipac|ipc/, "fa-landmark"],
    [/empreendedor|empresa/, "fa-briefcase"],
    [/pesquisa|ciencia|tecnologia|esporte|lazer/, "fa-flask"],
    [/informat|relatorio|plano|gestao/, "fa-chart-line"],
    [/e-mail|webmail|email/, "fa-envelope"],
  ];

  return (
    iconRules.find(([pattern]) => pattern.test(serviceName))?.[1] ??
    "fa-clipboard-list"
  );
}

const serviceIllustrationsByIcon = new Map([
  ["fa-file-signature", "edital.svg"],
  ["fa-heart-pulse", "saude.svg"],
  ["fa-graduation-cap", "educacao.svg"],
  ["fa-people-group", "social.svg"],
  ["fa-leaf", "ambiente.svg"],
  ["fa-masks-theater", "cultura.svg"],
  ["fa-chart-line", "transparencia.svg"],
  ["fa-coins", "iptu.svg"],
  ["fa-file-lines", "documentos.svg"],
  ["fa-comments", "esic.svg"],
  ["fa-shield-halved", "seguranca.svg"],
  ["fa-bus", "onibus.svg"],
  ["fa-building", "administracao.svg"],
  ["fa-landmark", "prefeitura.svg"],
  ["fa-briefcase", "empresas.svg"],
  ["fa-flask", "ciencia.svg"],
  ["fa-envelope", "email.svg"],
  ["fa-clipboard-list", "servico.svg"],
]);

function getServiceIllustration(name) {
  const serviceName = normalizeServiceSearch(name);
  const illustrationRules = [
    [/iptu/, "iptu.svg"],
    [/diario oficial/, "diario.svg"],
    [/contracheque/, "contracheque.svg"],
    [/transparencia/, "transparencia.svg"],
    [/onibus/, "onibus.svg"],
    [/governo digital/, "governo-digital.svg"],
    [/(e-sic|fala br)/, "esic.svg"],
    [/\bsei\b/, "sei.svg"],
    [/protocolo.*(servidor|funcionario)/, "protocolo-servidor.svg"],
    [/protocolo.*cidadao/, "protocolo-cidadao.svg"],
  ];

  const illustration = illustrationRules.find(([pattern]) =>
    pattern.test(serviceName),
  )?.[1];

  return illustration ?? serviceIllustrationsByIcon.get(getServiceIcon(name));
}

function getServiceCategory(name) {
  const serviceName = normalizeServiceSearch(name);
  const categoryRules = [
    [
      /saude|hospital|caps|odontolog|oftalm|policlinica|doencas infecciosas|reabilitacao|cnes|cns/,
      "saude",
    ],
    [
      /escola|colegio|creche|ciep|escolar|educacao|siseduc|aluno|ensino|infancia|calendario letivo/,
      "educacao",
    ],
    [
      /cadastro imobiliario|regularizacao fundiaria|urbanismo|habitacao|obras/,
      "urbanismo",
    ],
    [
      /cras|creas|social|suas|beneficio|acolhimento|protecao|cadastro unico|crianca feliz|melhor idade|conselho tutelar|direitos humanos|socioassistencial|gira-renda|superintendencia da mulher|superintendencia da juventude/,
      "assistencia",
    ],
    [
      /cultura|cultural|patrimonio|oficinas|espacos culturais|esporte|lazer|turisticas/,
      "cultura-lazer",
    ],
    [
      /comtrans|mobilidade|transporte|onibus|guarda vida/,
      "mobilidade",
    ],
    [
      /iptu|itbi|\biss\b|isso para autonomos|taxa|tribut|arrecadacao|receita|despesa|divida ativa|fiscal(?!izacao)|loa|ppa|ldo|irrf|acordo|pagamento|nota fiscal|contabilidade/,
      "tributos",
    ],
    [
      /empreendedor|processo seletivo|concursos|desenvolvimento economico|trabalho e renda/,
      "emprego-renda",
    ],
    [
      /servidor|contracheque|ged|webmail|recursos humanos|validacao contracheque|e-mail institucional/,
      "servidor",
    ],
    [
      /servicos publicos|ordem publica|posturas|apreensao de animais|defesa civil/,
      "servicos-urbanos",
    ],
    [
      /meio[- ]ambiente|ambiental|fundo municipal de meio|pesquisa ciencia tecnologia/,
      "servicos-urbanos",
    ],
    [
      /ouvidoria|e-sic|fala br|protocolo|atendimento presencial/,
      "atendimento",
    ],
  ];

  return (
    categoryRules.find(([pattern]) => pattern.test(serviceName))?.[1] ??
    "governo"
  );
}

function createHomeServiceCard({ modality, name }, serviceLink) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const illustration = getServiceIllustration(name);
  const icon = document.createElement("img");
  const details = document.createElement("div");
  const detailsContent = document.createElement("div");
  const summary = document.createElement("p");
  const action = document.createElement("a");

  if (!illustration) {
    throw new Error(`Falta ilustração para "${name}".`);
  }

  card.className = "service-card";
  card.dataset.serviceCategory = getServiceCategory(name);
  card.dataset.modality = modality;
  card.setAttribute("role", "listitem");
  title.dataset.modality = modality;
  icon.className = "service-card-illustration";
  icon.src = `img/service-icons/${illustration}`;
  icon.alt = "";
  icon.setAttribute("aria-hidden", "true");
  title.append(icon, document.createTextNode(formatServiceName(name)));

  details.className = "service-card-details";
  detailsContent.className = "service-card-details-content";
  summary.textContent =
    modality === "PRESENCIAL"
      ? inPersonServiceDetails.get(name)?.find(
          ({ description, address }) => description || address,
        )?.description ||
        inPersonServiceDetails.get(name)?.find(({ address }) => address)
          ?.address ||
        "Confira os detalhes de atendimento disponíveis."
      : "Acesse o portal oficial do serviço.";
  detailsContent.append(summary);

  if (modality === "ON-LINE") {
    if (!serviceLink) {
      throw new Error(`Falta link oficial para "${name}".`);
    }

    action.href = serviceLink;
    action.textContent = "Acessar serviço";
  } else {
    action.href = "#serviceDetailsDialog";
    action.setAttribute("aria-haspopup", "dialog");
    action.textContent = "Ver atendimento";
    action.addEventListener("click", (event) => {
      event.preventDefault();
      showServiceDetails(name);
    });
  }

  action.className = "btn";
  detailsContent.append(action);
  details.append(detailsContent);
  card.append(title, details);
  return card;
}

const homeServiceGrid = document.getElementById("homeServicesGrid");
const homeServiceEmpty = document.getElementById("serviceCategoryEmpty");
const homeServiceCount = document.getElementById("serviceDirectoryCount");

if (!homeServiceGrid || !homeServiceEmpty || !homeServiceCount) {
  throw new Error("Não foi possível inicializar o catálogo de serviços.");
}

const homeServicesFragment = document.createDocumentFragment();
const homeServiceLinkOccurrences = new Map();
const sortedHomeServices = [...serviceCatalogData].sort((first, second) =>
  first.name.localeCompare(second.name, "pt-BR", {
    numeric: true,
    sensitivity: "base",
  }),
);

sortedHomeServices.forEach(({ modality, name }) => {
  const configuredLinks =
    modality === "ON-LINE" ? serviceLinks.get(name) : undefined;
  const occurrence = homeServiceLinkOccurrences.get(name) ?? 0;
  const serviceLink = Array.isArray(configuredLinks)
    ? configuredLinks[occurrence]
    : configuredLinks;

  if (Array.isArray(configuredLinks)) {
    homeServiceLinkOccurrences.set(name, occurrence + 1);
  }

  homeServicesFragment.append(
    createHomeServiceCard({ modality, name }, serviceLink),
  );
});

homeServiceCount.textContent = `${serviceCatalogData.length} serviços`;
homeServiceGrid.replaceChildren(homeServicesFragment, homeServiceEmpty);

serviceCatalogPanels.forEach((panel) => {
  const { modality } = panel.dataset;
  const serviceCatalogList = panel.querySelector(".service-catalog-list");
  const serviceCatalogCount = panel.querySelector(".service-catalog-count");
  const serviceCatalogEmpty = panel.querySelector(".service-catalog-empty");
  const modalityServices = serviceCatalogData.filter(
    (service) => service.modality === modality,
  ).sort((first, second) =>
    first.name.localeCompare(second.name, "pt-BR", {
      numeric: true,
      sensitivity: "base",
    }),
  );

  if (
    !serviceCatalogList ||
    !serviceCatalogSearch ||
    !serviceCatalogCount ||
    !serviceCatalogEmpty ||
    modalityServices.length === 0
  ) {
    throw new Error(`Não foi possível inicializar o menu ${modality}.`);
  }

  function renderServices() {
    const searchTerm = normalizeServiceSearch(serviceCatalogSearch.value);
    const visibleServices = modalityServices.filter(({ name }) =>
      normalizeServiceSearch(name).includes(searchTerm),
    );
    const fragment = document.createDocumentFragment();
    const serviceLinkOccurrences = new Map();

    visibleServices.forEach(({ name }) => {
      const item = document.createElement("li");
      const illustration = getServiceIllustration(name);
      const icon = document.createElement("img");
      const configuredLinks =
        modality === "ON-LINE" ? serviceLinks.get(name) : undefined;
      const occurrence = serviceLinkOccurrences.get(name) ?? 0;
      const serviceLink = Array.isArray(configuredLinks)
        ? configuredLinks[occurrence]
        : configuredLinks;
      const serviceName = document.createElement(
        modality === "ON-LINE" ? "a" : "button",
      );
      const marker = document.createElement("span");

      if (Array.isArray(configuredLinks)) {
        serviceLinkOccurrences.set(name, occurrence + 1);
      }

      if (modality === "ON-LINE" && !serviceLink) {
        throw new Error(`Falta link oficial para "${name}".`);
      }

      if (!illustration) {
        throw new Error(`Falta ilustração para "${name}".`);
      }

      icon.className = "service-catalog-icon service-catalog-illustration";
      icon.setAttribute("aria-hidden", "true");
      icon.setAttribute("src", `img/service-icons/${illustration}`);
      icon.setAttribute("alt", "");
      serviceName.className = "service-catalog-name";
      if (modality === "ON-LINE") {
        serviceName.href = serviceLink;
      } else {
        serviceName.type = "button";
        serviceName.classList.add("service-catalog-name-button");
        serviceName.setAttribute("aria-haspopup", "dialog");
        serviceName.addEventListener("click", () => showServiceDetails(name));
      }
      serviceName.textContent = formatServiceName(name);
      marker.className = `service-catalog-marker ${modality.toLowerCase()}`;
      marker.setAttribute("aria-hidden", "true");
      marker.textContent = modality === "ON-LINE" ? "ON-LINE" : "PRESENCIAL";

      item.append(icon, serviceName, marker);
      fragment.append(item);
    });

    serviceCatalogList.replaceChildren(fragment);
    serviceCatalogCount.textContent = searchTerm
      ? `${visibleServices.length} de ${modalityServices.length} serviços`
      : `${modalityServices.length} serviços`;
    serviceCatalogEmpty.hidden = visibleServices.length > 0;
    serviceCatalogList.hidden = visibleServices.length === 0;
  }

  serviceCatalogSearch.addEventListener("input", renderServices);
  renderServices();
});
