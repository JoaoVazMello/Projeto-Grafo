fetch("http://localhost:3000/dados")
  .then(response => response.json())
  .then(data => {

    const nodes = data.nodes;
    const edges = data.edges;

    // Converte edges para usar referências diretas aos nós
    edges.forEach(e => {
      e.source = nodes.find(n => n.id === e.from);
      e.target = nodes.find(n => n.id === e.to);
    });

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

      // Comportamento de arrastar e soltar, para os nós
      const dragBehavior = d3.drag()
        .on("start", function (event, d) {
          d3.select(this).attr("fill", "red");
        })
        .on("drag", function (event, d) {
          // Atualiza posição do nó
          d.x = event.x;
          d.y = event.y;

          // Atualiza círculo
          d3.select(this)
            .attr("cx", d.x)
            .attr("cy", d.y);

          // Atualiza texto dentro do círculo
          svg.selectAll("text")
            .filter(t => t.id === d.id)
            .attr("x", d.x)
            .attr("y", d.y);

          // Atualiza linhas conectadas
          svg.selectAll("line")
            .filter(l => l.source.id === d.id || l.target.id === d.id)
            .attr("x1", l => l.source.x)
            .attr("y1", l => l.source.y)
            .attr("x2", l => l.target.x)
            .attr("y2", l => l.target.y);
        })
        .on("end", function () {
          d3.select(this).attr("fill", "steelblue");
        });

      // Desenha linhas (arestas)
      svg.selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("x1", e => e.source.x)
        .attr("y1", e => e.source.y)
        .attr("x2", e => e.target.x)
        .attr("y2", e => e.target.y)
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
        .attr("fill", "steelblue")
        .call(dragBehavior);

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
