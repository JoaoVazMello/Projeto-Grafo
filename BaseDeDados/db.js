// "Banco de dados" local para testes — simula registros Iniciais

// Lista de vértices do grafo
const nodes = [
  { id: 1, label: "João",},
  { id: 2, label: "Maria",},
  { id: 3, label: "Empresa X",},
  { id: 4, label: "Carlos",},
  { id: 5, label: "Ana",},
  { id: 6, label: "felix"},
  { id: 7, label: "Empresa Y"},
  { id: 8, label: "Empresa Z" }
];

// Lista de arestas (ligações entre os vértices)
const edges = [
  { from: 1, to: 2, },
  { from: 2, to: 3, },
  { from: 4, to: 3, },
  { from: 1, to: 4, },
  { from: 5, to: 1, },
  { from: 6, to: 3, },
  { from: 4, to: 7, },
  { from: 2, to: 4, },
  { from: 5, to: 6, },
  { from: 4, to: 6, },
  { from: 5, to: 7, },
  { from: 6, to: 8, },
  { from: 5, to: 8, },
  { from: 7, to: 8, },

];

// Exporta os dados para poder usar em outros arquivos
module.exports = {
  nodes,
  edges,
};
