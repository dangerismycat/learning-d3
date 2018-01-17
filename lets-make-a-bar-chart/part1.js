const data = [4, 8, 15, 16, 23, 42];

// stage 1
// d3.select('.chart')
//   .selectAll('div')
//     .data(data)
//   .enter().append('div')
//     .attr('class', 'bar')
//     .style('width', (d) => `${d * 10}px`)
//     .text((d) => d);

// stage 2
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const scaleData = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, getRandomNumber(300, 600)]);

d3.select('.chart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .attr('class', 'bar')
    .style('width', (d) => `${scaleData(d)}px`)
    .text((d) => d);
