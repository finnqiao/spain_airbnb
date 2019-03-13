function createBackground(svg) {
  g = svg.append('g')
    .attr('id', 'backgroundSection')

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.12) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '30px')
    .text('Welcome to Spain')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.27) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '18px')
    .text('As a tourist, there are many questions facing you prior to your arrival:')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.34) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    // .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('What is there to do?')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.38) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    // .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('What are some good events to come for?')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.42) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    // .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('How do I get around?')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * 0.47) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '17px')
    .text('Where do I stay?')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * .6) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('We aim to answer these questions with an interactive look into Barcelona and Madrid for new visitors.')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * .75) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('Data from http://insideairbnb.com/ (scraped from AirBnB.com)')
    .attr('opacity', 0);

  g.append('text')
    .attr('id', 'titleSectionText')
    .attr('transform', 'translate(' + (width * .5) + ',' + (height * .8) + ')')
    .attr('text-anchor', 'middle')
    .attr('fill', 'rgb(208, 208, 208)')
    .style('font-weight', 'bold')
    .style('font-size', '15px')
    .text('Project by Finn Qiao, Alex Burzinski, Tony Colucci, Elliot Gardner, and Rachel Rosenberg')
    .attr('opacity', 0);

  svg.select('#backgroundSection')
    .classed('noshow', true);
}
