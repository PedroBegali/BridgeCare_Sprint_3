// Tipos que representam as tabelas do banco de dados Oracle
// Cada tipo corresponde a uma tabela do schema do BridgeCare

export type Endereco = {
  id_endereco: number;
  nm_rua: string;
  nm_bairro: string;
  nr_logradouro: number;
  nr_cep: string;
};

export type Doador = {
  id_doador: number;
  nr_cpf: string;
  nm_doador: string;
  nr_telefone: string;
  email: string;
};

export type ProgramaSocial = {
  id_programa: number;
  nm_programa_social: string;
};

export type Doacao = {
  id_doacao: number;
  vl_doacao: number;
  dt_hr_doacao: string;
  st_periodicidade: "A" | "M"; // A = Anual, M = Mensal
  id_doador: number;
};

export type FormaPagamento = {
  id_forma_pagamento: number;
  ds_pagamento: string;
  vl_pagamento: number;
  id_doacao: number;
};

export type PreBeneficiario = {
  id_pre_beneficiario: number;
  nr_cpf: string;
  nm_nome: string;
  dt_nascimento: string;
  sx_pre_beneficiario: "M" | "F";
  ds_bucal: string;
  email: string;
  nr_telefone: string;
  id_endereco: number;
};

export type TriagemComunitaria = {
  id_triagem: number;
  ds_triagem: string;
  dt_hr_triagem: string;
  st_criterios: "A" | "R"; // A = Aprovado, R = Reprovado
  id_pre_beneficiario: number;
};

export type Dentista = {
  id_dentista: number;
  nr_cpf: string;
  nr_cro: string;
  nr_cnpj: string;
  nm_nome: string;
  dt_nascimento: string;
  sx_dentista: "M" | "F";
  ds_especialidade: string;
  st_atividade: "A" | "I"; // A = Ativo, I = Inativo
  id_endereco: number;
};

export type Beneficiario = {
  id_beneficiario: number;
  st_procedimento: "A" | "I"; // A = Ativo, I = Inativo
  id_pre_beneficiario: number;
  id_programa: number;
};

export type Atendimento = {
  id_atendimento: number;
  ds_tratamento: string;
  dt_hr_atendimento: string;
  id_dentista: number;
  id_beneficiario: number;
};

export type Relatorio = {
  id_relatorio: number;
  hr_voluntariado: string;
  nr_beneficiario: number;
  nr_doacao: number;
  nr_atendimento: number;
  dt_hr_relatorio: string;
};
