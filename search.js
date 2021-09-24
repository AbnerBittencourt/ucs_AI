class Search {
  constructor(caminho) {
    this.caminho = caminho
  }
  achar_caminho(caminho) {
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
}
module.exports = Search;