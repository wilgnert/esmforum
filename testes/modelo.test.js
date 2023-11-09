const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando recuperar pergunta', () => {
  const pergunta = modelo.cadastrar_pergunta("Hm?")
  expect(modelo.get_pergunta(pergunta).texto).toBe("Hm?")
})

test('Recuperar respostas retorna respostas criadas', () => {
  const pergunta = "Hm?"
  const resposta = "Hm o quê?"
  const id_pergunta = modelo.cadastrar_pergunta(pergunta)
  const id_resposta = modelo.cadastrar_resposta(id_pergunta, resposta)
  const respostas = modelo.get_respostas(id_pergunta)

  expect(respostas).toEqual([{id_pergunta, id_resposta, "texto": resposta,}])
  
})
