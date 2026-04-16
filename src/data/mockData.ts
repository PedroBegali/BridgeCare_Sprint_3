// Dados simulados (mock) que representam os registros do banco de dados Oracle
// Esses dados seriam futuramente substituídos por chamadas a uma API real

import type {
  Endereco,
  Doador,
  ProgramaSocial,
  Doacao,
  FormaPagamento,
  PreBeneficiario,
  TriagemComunitaria,
  Dentista,
  Beneficiario,
  Atendimento,
  Relatorio,
} from "../types/types";

// ==================== T_SN_ENDERECO ====================
export const enderecos: Endereco[] = [
  {
    id_endereco: 1,
    nm_rua: "Rua das Flores",
    nm_bairro: "Centro",
    nr_logradouro: 123,
    nr_cep: "01001-000",
  },
  {
    id_endereco: 2,
    nm_rua: "Av. Paulista",
    nm_bairro: "Bela Vista",
    nr_logradouro: 1000,
    nr_cep: "01310-100",
  },
  {
    id_endereco: 3,
    nm_rua: "Rua Augusta",
    nm_bairro: "Consolacao",
    nr_logradouro: 500,
    nr_cep: "01305-000",
  },
  {
    id_endereco: 4,
    nm_rua: "Rua Oscar Freire",
    nm_bairro: "Jardins",
    nr_logradouro: 200,
    nr_cep: "01426-000",
  },
  {
    id_endereco: 5,
    nm_rua: "Rua da Consolacao",
    nm_bairro: "Consolacao",
    nr_logradouro: 800,
    nr_cep: "01302-000",
  },
];

// ==================== T_SN_DOADOR ====================
export const doadores: Doador[] = [
  {
    id_doador: 1,
    nr_cpf: "111.222.333-44",
    nm_doador: "Carlos Eduardo Mendes",
    nr_telefone: "(11) 91234-5678",
    email: "carlos.mendes@email.com",
  },
  {
    id_doador: 2,
    nr_cpf: "555.666.777-88",
    nm_doador: "Fernanda Almeida Costa",
    nr_telefone: "(11) 98765-4321",
    email: "fernanda.costa@email.com",
  },
  {
    id_doador: 3,
    nr_cpf: "999.888.777-66",
    nm_doador: "Roberto Silva Junior",
    nr_telefone: "(21) 97777-8888",
    email: "roberto.jr@email.com",
  },
];

// ==================== T_SN_PROGRAMA_SOCIAL ====================
export const programasSociais: ProgramaSocial[] = [
  {
    id_programa: 1,
    nm_programa_social: "Sorriso Cidadao",
  },
  {
    id_programa: 2,
    nm_programa_social: "Dentes Saudaveis",
  },
  {
    id_programa: 3,
    nm_programa_social: "Saude Bucal na Escola",
  },
];

// ==================== T_SN_DOACAO ====================
export const doacoes: Doacao[] = [
  {
    id_doacao: 1,
    vl_doacao: 500.0,
    dt_hr_doacao: "2026-01-15",
    st_periodicidade: "M",
    id_doador: 1,
  },
  {
    id_doacao: 2,
    vl_doacao: 1200.0,
    dt_hr_doacao: "2026-02-10",
    st_periodicidade: "A",
    id_doador: 2,
  },
  {
    id_doacao: 3,
    vl_doacao: 250.0,
    dt_hr_doacao: "2026-03-05",
    st_periodicidade: "M",
    id_doador: 1,
  },
  {
    id_doacao: 4,
    vl_doacao: 800.0,
    dt_hr_doacao: "2026-03-20",
    st_periodicidade: "M",
    id_doador: 3,
  },
];

// ==================== T_SN_FORMA_PAGAMENTO ====================
export const formasPagamento: FormaPagamento[] = [
  {
    id_forma_pagamento: 1,
    ds_pagamento: "Cartao de Credito",
    vl_pagamento: 500.0,
    id_doacao: 1,
  },
  {
    id_forma_pagamento: 2,
    ds_pagamento: "Transferencia Bancaria (PIX)",
    vl_pagamento: 1200.0,
    id_doacao: 2,
  },
  {
    id_forma_pagamento: 3,
    ds_pagamento: "Boleto Bancario",
    vl_pagamento: 250.0,
    id_doacao: 3,
  },
  {
    id_forma_pagamento: 4,
    ds_pagamento: "Cartao de Debito",
    vl_pagamento: 800.0,
    id_doacao: 4,
  },
];

// ==================== T_SN_PRE_BENEFICIARIO ====================
export const preBeneficiarios: PreBeneficiario[] = [
  {
    id_pre_beneficiario: 1,
    nr_cpf: "123.456.789-00",
    nm_nome: "Ana Julia Souza",
    dt_nascimento: "2012-05-10",
    sx_pre_beneficiario: "F",
    ds_bucal: "Necessidade de limpeza e avaliacao de caries",
    email: "anajulia@email.com",
    nr_telefone: "(11) 96666-5555",
    id_endereco: 1,
  },
  {
    id_pre_beneficiario: 2,
    nr_cpf: "987.654.321-00",
    nm_nome: "Enzo Oliveira Santos",
    dt_nascimento: "2011-08-22",
    sx_pre_beneficiario: "M",
    ds_bucal: "Dor de dente persistente no molar inferior",
    email: "enzo.santos@email.com",
    nr_telefone: "(11) 95555-4444",
    id_endereco: 2,
  },
  {
    id_pre_beneficiario: 3,
    nr_cpf: "456.789.123-00",
    nm_nome: "Maria Eduarda Lima",
    dt_nascimento: "2013-03-15",
    sx_pre_beneficiario: "F",
    ds_bucal: "Aparelho ortodontico - avaliacao inicial",
    email: "meduarda@email.com",
    nr_telefone: "(11) 94444-3333",
    id_endereco: 3,
  },
  {
    id_pre_beneficiario: 4,
    nr_cpf: "321.654.987-00",
    nm_nome: "Marcos Vinicius Pereira",
    dt_nascimento: "2010-11-30",
    sx_pre_beneficiario: "M",
    ds_bucal: "Extracao de dente de leite",
    email: "marcos.v@email.com",
    nr_telefone: "(11) 97777-6666",
    id_endereco: 4,
  },
];

// ==================== T_SN_TRIAGEM_COMUNITARIA ====================
export const triagens: TriagemComunitaria[] = [
  {
    id_triagem: 1,
    ds_triagem:
      "Paciente apresenta boa higiene bucal. Aprovada para programa Sorriso Cidadao.",
    dt_hr_triagem: "2026-01-20",
    st_criterios: "A",
    id_pre_beneficiario: 1,
  },
  {
    id_triagem: 2,
    ds_triagem:
      "Paciente com urgencia odontologica. Encaminhado para atendimento prioritario.",
    dt_hr_triagem: "2026-01-25",
    st_criterios: "A",
    id_pre_beneficiario: 2,
  },
  {
    id_triagem: 3,
    ds_triagem:
      "Paciente aprovada apos avaliacao. Necessita acompanhamento ortodontico.",
    dt_hr_triagem: "2026-02-05",
    st_criterios: "A",
    id_pre_beneficiario: 3,
  },
  {
    id_triagem: 4,
    ds_triagem: "Paciente fora da faixa etaria do programa. Encaminhado para posto publico.",
    dt_hr_triagem: "2026-02-10",
    st_criterios: "R",
    id_pre_beneficiario: 4,
  },
];

// ==================== T_SN_DENTISTA ====================
export const dentistas: Dentista[] = [
  {
    id_dentista: 1,
    nr_cpf: "111.111.111-11",
    nr_cro: "CRO-12345",
    nr_cnpj: "",
    nm_nome: "Dr. Augusto Lopes",
    dt_nascimento: "1980-03-15",
    sx_dentista: "M",
    ds_especialidade: "Clinica Geral e Ortodontia",
    st_atividade: "A",
    id_endereco: 2,
  },
  {
    id_dentista: 2,
    nr_cpf: "222.222.222-22",
    nr_cro: "CRO-67890",
    nr_cnpj: "12.345.678/0001-90",
    nm_nome: "Dra. Ana Beatriz Ferreira",
    dt_nascimento: "1985-07-20",
    sx_dentista: "F",
    ds_especialidade: "Odontopediatria",
    st_atividade: "A",
    id_endereco: 3,
  },
  {
    id_dentista: 3,
    nr_cpf: "333.333.333-33",
    nr_cro: "CRO-11111",
    nr_cnpj: "",
    nm_nome: "Dr. Ricardo Santos",
    dt_nascimento: "1975-12-01",
    sx_dentista: "M",
    ds_especialidade: "Endodontia e Protese",
    st_atividade: "I",
    id_endereco: 5,
  },
];

// ==================== T_SN_BENEFICIARIO ====================
export const beneficiarios: Beneficiario[] = [
  {
    id_beneficiario: 1,
    st_procedimento: "A",
    id_pre_beneficiario: 1,
    id_programa: 1,
  },
  {
    id_beneficiario: 2,
    st_procedimento: "A",
    id_pre_beneficiario: 2,
    id_programa: 2,
  },
  {
    id_beneficiario: 3,
    st_procedimento: "A",
    id_pre_beneficiario: 3,
    id_programa: 1,
  },
];

// ==================== T_SN_ATENDIMENTO ====================
export const atendimentos: Atendimento[] = [
  {
    id_atendimento: 1,
    ds_tratamento: "Limpeza profissional e aplicacao de fluor. Paciente com boa higiene.",
    dt_hr_atendimento: "2026-02-10",
    id_dentista: 1,
    id_beneficiario: 1,
  },
  {
    id_atendimento: 2,
    ds_tratamento: "Restauracao no dente 24. Paciente colaborativo durante o procedimento.",
    dt_hr_atendimento: "2026-02-15",
    id_dentista: 2,
    id_beneficiario: 2,
  },
  {
    id_atendimento: 3,
    ds_tratamento: "Avaliacao ortodontica inicial. Solicitada documentacao completa.",
    dt_hr_atendimento: "2026-03-01",
    id_dentista: 1,
    id_beneficiario: 3,
  },
  {
    id_atendimento: 4,
    ds_tratamento: "Exame radiologico e tratamento de canal no dente 36.",
    dt_hr_atendimento: "2026-03-10",
    id_dentista: 2,
    id_beneficiario: 2,
  },
];

// ==================== T_SN_RELATORIO ====================
export const relatorios: Relatorio[] = [
  {
    id_relatorio: 1,
    hr_voluntariado: "4h30",
    nr_beneficiario: 1,
    nr_doacao: 1,
    nr_atendimento: 1,
    dt_hr_relatorio: "2026-02-28",
  },
  {
    id_relatorio: 2,
    hr_voluntariado: "6h00",
    nr_beneficiario: 2,
    nr_doacao: 2,
    nr_atendimento: 2,
    dt_hr_relatorio: "2026-03-15",
  },
  {
    id_relatorio: 3,
    hr_voluntariado: "3h00",
    nr_beneficiario: 3,
    nr_doacao: 3,
    nr_atendimento: 3,
    dt_hr_relatorio: "2026-03-31",
  },
];

// ==================== FUNCOES AUXILIARES ====================
// Funcoes simples para buscar dados relacionados (simulando JOINs do banco)

export function buscarEnderecoPorId(id: number): Endereco | undefined {
  return enderecos.find((e) => e.id_endereco === id);
}

export function buscarDoadorPorId(id: number): Doador | undefined {
  return doadores.find((d) => d.id_doador === id);
}

export function buscarDoacoesPorDoador(idDoador: number): Doacao[] {
  return doacoes.filter((d) => d.id_doador === idDoador);
}

export function buscarFormaPagamentoPorDoacao(idDoacao: number): FormaPagamento | undefined {
  return formasPagamento.find((f) => f.id_doacao === idDoacao);
}

export function buscarPreBeneficiarioPorId(id: number): PreBeneficiario | undefined {
  return preBeneficiarios.find((p) => p.id_pre_beneficiario === id);
}

export function buscarTriagemPorPreBeneficiario(idPre: number): TriagemComunitaria | undefined {
  return triagens.find((t) => t.id_pre_beneficiario === idPre);
}

export function buscarDentistaPorId(id: number): Dentista | undefined {
  return dentistas.find((d) => d.id_dentista === id);
}

export function buscarBeneficiarioPorId(id: number): Beneficiario | undefined {
  return beneficiarios.find((b) => b.id_beneficiario === id);
}

export function buscarProgramaPorId(id: number): ProgramaSocial | undefined {
  return programasSociais.find((p) => p.id_programa === id);
}

export function buscarAtendimentosPorDentista(idDentista: number): Atendimento[] {
  return atendimentos.filter((a) => a.id_dentista === idDentista);
}

export function buscarAtendimentosPorBeneficiario(idBeneficiario: number): Atendimento[] {
  return atendimentos.filter((a) => a.id_beneficiario === idBeneficiario);
}

export function buscarDoacaoPorId(id: number): Doacao | undefined {
  return doacoes.find((d) => d.id_doacao === id);
}

export function buscarAtendimentoPorId(id: number): Atendimento | undefined {
  return atendimentos.find((a) => a.id_atendimento === id);
}
