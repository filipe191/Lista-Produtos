// Lista de produtos
const listaProdutos = [
  { nome: "Mouse USB", preco: "50.99" },
  { nome: "Teclado Gamer", preco: "120.00" },
  { nome: "Monitor HD", preco: "900.25" },
  { nome: "Webcam", preco: "150.76" },
  { nome: "Headset Bluetooth", preco: "250.99" },
];

// Função que simula uma chamada assíncrona
function carregarProdutos() {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve(listaProdutos);
      }, 500); // Simula um delay de 500ms
  });
}

// Função para exibir os produtos na tabela
function exibirProdutos(produtos) {
  const corpoTabela = document.getElementById('corpo-tabela');
  corpoTabela.innerHTML = ''; // Limpa a tabela antes de inserir

  produtos.forEach(produto => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
          <td>${produto.nome}</td>
          <td>R$ ${Number(produto.preco).toFixed(2)}</td>
      `;
      corpoTabela.appendChild(tr);
  });
}

// Função para filtrar produtos
function filtrarProdutos(produtos, termo) {
  return produtos.filter(produto => 
      produto.nome.toLowerCase().includes(termo.toLowerCase())
  );
}

// Função para ordenar produtos por preço
function ordenarProdutos(produtos, ordem) {
  return [...produtos].sort((a, b) => {
      const precoA = parseFloat(a.preco);
      const precoB = parseFloat(b.preco);
      return ordem === 'asc' ? precoA - precoB : precoB - precoA;
  });
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', async () => {
  // Carregar produtos iniciais
  const produtos = await carregarProdutos();
  let produtosAtuais = [...produtos];

  // Exibir produtos iniciais
  exibirProdutos(produtosAtuais);

  // Evento para filtro de busca
  const inputFiltro = document.getElementById('filtro');
  inputFiltro.addEventListener('input', () => {
      const termoFiltro = inputFiltro.value;
      const produtosFiltrados = filtrarProdutos(produtos, termoFiltro);
      produtosAtuais = produtosFiltrados;
      exibirProdutos(produtosFiltrados);
  });

  // Evento para ordenar por menor preço
  document.getElementById('ordenar-menor-preco').addEventListener('click', () => {
      produtosAtuais = ordenarProdutos(produtosAtuais, 'asc');
      exibirProdutos(produtosAtuais);
  });

  // Evento para ordenar por maior preço
  document.getElementById('ordenar-maior-preco').addEventListener('click', () => {
      produtosAtuais = ordenarProdutos(produtosAtuais, 'desc');
      exibirProdutos(produtosAtuais);
  });
});