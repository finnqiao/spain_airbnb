function createMadridSubway(madSubway, madPath, svg) {
  svg.append('g')
    .attr('id', 'madridSub')
    .selectAll('path').data(madSubway.features)
    .enter()
    .append('path')
    .attr('d', madPath)
    .attr('fill', 'none')
    .attr('stroke-width', '2')
    .attr('class', function(d) { return 'mad' + d.properties.ref +
      ' ' + d.properties['@id']|| 'noL'; }
    ).attr('opacity', 1);
}