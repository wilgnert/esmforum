const modelo = require('../modelo.js');



test('Testando listar três perguntas', () => {
  var mock_repo = modelo.RepositorioMemoria;
  
  // "listar_perguntas" chama "get_num_respostas", que chama "query". 
  // Assim, o resultado de "query" será um objeto com um contador de 
  // respostas igual a 5, 10 e 15, respectivamente para cada chamada
  mock_repo.recuperar_num_respostas = jest.fn()
  .mockReturnValue(0)       // todas chamadas
  .mockReturnValueOnce(5)   // exceto, 1a chamada
  .mockReturnValueOnce(10)  // exceto, 2a chamada
  .mockReturnValueOnce(15)  // exceto, 3a chamada
  
  // reconfigura o modelo para usar a versão mockada do BD
  modelo.reconfig_repo(mock_repo);
  
  const perguntas = modelo.listar_perguntas();//▬Ä mock de bd, inicialmente vazio
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('Qual a capital de MG?');
  expect(perguntas[1].texto).toBe('Qual a capital de RJ?');
  expect(perguntas[2].texto).toBe('Qual a capital de SP?');
  expect(perguntas[0].num_respostas).toBe(5);
  expect(perguntas[1].num_respostas).toBe(10);
  expect(perguntas[2].num_respostas).toBe(15);
});
  