const fs = require("fs");
const search = require("./search")
let ac = new search();
const args = process.argv;
const start = args[2];
const end = args[3];
const caminhoArquivo = args[4];
grafo = [];

fs.readFile(caminhoArquivo, function (err, data) {
  if (err) throw err;
  grafo = data.toString().split("\n");
  for (i in grafo) {
    grafo[i];
    let x = grafo[i].split(" ");
    x[2] = parseInt(x[2], 10);
    grafo[i] = x;
  }
  dados_grafo(grafo, function (UCS) {
    console.log(achar_caminho(UCS(start, end)));
  });
});

function conexao(estado, custo, pai) {
  return {
    estado: estado,
    custo: custo,
    pai: pai
  };
};

function achar_caminho(caminho) {
  var s = "";
  try {
    if (caminho.pai) {
      s = achar_caminho(caminho.pai) + " => ";
    }
    s += caminho.estado + "(" + caminho.custo + ")";
  } catch (err) {
    console.log("Não existe conexão!")
  }
  return s;
};

function construir_grafo(arestas) {
  var grafo = {};

  function link(s1, s2, custo) {
    var h = grafo[s1] || (grafo[s1] = {});
    h[s2] = custo;
  };
  for (var i = 0; i < arestas.length; ++i) {
    var w = arestas[i];
    link(w[0], w[1], w[2]);
    link(w[1], w[0], w[2]);
  }
  return grafo;
};

// encontre o índice do elemento na matriz `a` para o qual
// f (el) retorna o menor valor.
function ache_menor(a, f) {
  var min = null,
    pos = null;
  for (var i = 0; i < a.length; ++i) {
    var el = f(a[i]);
    if (min === null || min > el) {
      min = el;
      pos = i;
    }
  }
  return pos;
};

// remove e retorna o caminho com o custo mínimo
function seletor(fronteira) {
  var index = ache_menor(fronteira, function (caminho) {
    return caminho.custo;
  });
  var it = fronteira[index];
  fronteira.splice(index, 1);
  return it;
};

function dados_grafo(dados, func) {
  var grafo = construir_grafo(dados);

  // para um determinado estado retorna as ações possíveis; isto é um
  // array de elementos contendo o próximo estado e custo para chegar lá.
  function acoes(estado) {
    var a = [],
      s = grafo[estado];
    for (var i in s) {
      a.push({
        estado: i,
        custo: s[i]
      });
    }
    return a;
  };

  function busca_uniforme(start, goal, info) {
    var fronteira = [conexao(start, 0, null)];
    var visitados = {};
    while (fronteira.length > 0) {
      var caminho = seletor(fronteira);
      visitados[caminho.estado] = 1;
      if (info) info(caminho, fronteira, visitados);
      if (caminho.estado == goal) return caminho;
      acoes(caminho.estado).forEach(function (a) {
        if (!visitados[a.estado]) {
          var p = conexao(a.estado, a.custo + caminho.custo, caminho);
          fronteira.push(p);
        }
      });
    }
  };

  func(busca_uniforme);
};