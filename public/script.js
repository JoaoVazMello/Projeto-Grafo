fetch("http://localhost:3000/dados")
  .then(response => response.json())
  .then(data => {

    const nodes = data.nodes;
    const edges = data.edges;

    // Inicializa a posição dos nós
    function CriaPosicao(){
      nodes.forEach((d, i) => {
        if(i % 2 === 0){
          d.x = 20 + (i*40);
          d.y = 40;
        }else{
          d.x = 10 + (i*40);
          d.y = 120;
        }
      });
    }

    function DesenhaInicial(){
      const svg = d3.select("svg");

      CriaPosicao();
      console.log(nodes);

      // Desenha linhas (arestas)
      svg.selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("x1", e => nodes.find(n => n.id === e.from)?.x || 0)
        .attr("y1", e => nodes.find(n => n.id === e.from)?.y || 0)
        .attr("x2", e => nodes.find(n => n.id === e.to)?.x || 0)
        .attr("y2", e => nodes.find(n => n.id === e.to)?.y || 0)
        .attr("stroke", "black")
        .attr("stroke-width", 2);

      // Desenha círculos (vértices)
      svg.selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 15)
        .attr("fill", "steelblue");

      // Textos dentro dos círculos
      svg.selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr("x", d => d.x)            
        .attr("y", d => d.y)
        .attr("text-anchor", "middle")
        .attr("dy", ".35em") 
        .attr("fill", "white")
        .text(d => d.id);
    }

    DesenhaInicial();
  })
  .catch(error => console.error("Erro ao buscar dados:", error));
