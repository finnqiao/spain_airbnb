function createBarcaSub(barSubway, path, svg) {
  Object.filter = function (obj, predicate) {
    Object.keys(obj)
      .filter( key => predicate(obj[key]) )
      .reduce( (res, key) => (res[key] = obj[key], res), {} );
  }
  
  svg.select('#barcaVis').append('g')
    .attr('id', 'barcaSub')
    .selectAll('path').data(barSubway.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke-width', '2')
    .attr('class', function (d) { return 'bar' + d.properties.name +
      ' ' + d.properties['@id']|| 'noL'; }
    ).attr('opacity', 0);

  svg.select('#barcaSub')
    .classed('noshow', true)
}