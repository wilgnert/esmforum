var bd = require('./bd/bd_utils.js');

const RepositorioBD = {
  recuperar_todas_perguntas() {
    const perguntas = bd.queryAll('select * from perguntas', []);
    perguntas.forEach(pergunta => pergunta['num_respostas'] = get_num_respostas(pergunta['id_pergunta']));
    return perguntas;
  },
  recuperar_pergunta(id_pergunta) {
    return bd.query('select * from perguntas where id_pergunta = ?', [id_pergunta]);

  },
  recuperar_todas_respostas(id_pergunta) {
    return bd.queryAll('select * from respostas where id_pergunta = ?', [id_pergunta]);
  },
  recuperar_num_respostas(id_pergunta) {
    const resultado = bd.query('select count(*) from respostas where id_pergunta = ?', [id_pergunta]);
    return resultado['count(*)'];
  },
  criar_pergunta(texto) {
    const params = [texto, 1];
    const result = bd.exec('INSERT INTO perguntas (texto, id_usuario) VALUES(?, ?) RETURNING id_pergunta', params);
    return result.lastInsertRowid;
  },
  criar_resposta(id_pergunta, texto) {
    const params = [id_pergunta, texto];
    const result = bd.exec('INSERT INTO respostas (id_pergunta, texto) VALUES(?, ?) RETURNING id_resposta', params);
    return result.lastInsertRowid;
  },
}

const RepositorioMemoria = {
  recuperar_todas_perguntas() {
    return [ {
      "id_pergunta": 1,
      "texto": "Qual a capital de MG?",
      "id_usuario": 1,
      "num_respostas": 5,
    },
    {
      "id_pergunta": 2,
      "texto": "Qual a capital de RJ?",
      "id_usuario": 1,
      "num_respostas": 10,
    },
    {
      "id_pergunta": 3,
      "texto": "Qual a capital de SP?",
      "id_usuario": 1,
      "num_respostas": 15,
    }
  ]
  },
}


var repo = RepositorioBD

// usada pelo teste de unidade
// para que o modelo passe a usar uma versão "mockada" de bd
function reconfig_repo(newrepo) {
  repo = newrepo;
}

// listar_perguntas retorna um array de objetos com os seguintes campos:
// { id_pergunta: int
//   texto: int
//   id_usuario: int
//   num_respostas: int 
// }
function listar_perguntas() {
  return repo.recuperar_todas_perguntas()
}

function cadastrar_pergunta(texto) {
 return repo.criar_pergunta(texto)
}

function cadastrar_resposta(id_pergunta, texto) {
  return repo.criar_resposta(id_pergunta, texto)
}

function get_pergunta(id_pergunta) {
  return repo.recuperar_pergunta(id_pergunta)
}

function get_respostas(id_pergunta) {
  return repo.recuperar_todas_respostas(id_pergunta)
}

function get_num_respostas(id_pergunta) {
  return repo.recuperar_num_respostas(id_pergunta)
}

exports.reconfig_repo = reconfig_repo;
exports.listar_perguntas = listar_perguntas;
exports.cadastrar_pergunta = cadastrar_pergunta;
exports.cadastrar_resposta = cadastrar_resposta;
exports.get_pergunta = get_pergunta;
exports.get_respostas = get_respostas;
exports.get_num_respostas = get_num_respostas;
exports.RepositorioBD = RepositorioBD
exports.RepositorioMemoria = RepositorioMemoria