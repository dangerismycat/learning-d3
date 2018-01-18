const UPDATE_INTERVAL = 1500;
const HEIGHT = 500;
const WIDTH = 960;

function update(data, svgGroup) {
  // DATA JOIN
  // Join new data with old elements, if any.
  const text = svgGroup.selectAll('text')
      .data(data);
  // UPDATE
  // Update old elements as needed.
  text.attr('class', 'update');
  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.
  text.enter().append('text')
      .attr('class', 'enter')
      .attr('x', (d, i) => i * 32)
      .attr('dy', '.35em')
    .merge(text)
      .text((d) => d);
  // EXIT
  // Remove old elements as needed.
  text.exit().remove();
}

window.onload = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const svg = d3.select('svg')
      .attr('height', HEIGHT)
      .attr('width', WIDTH);
  const g = svg.append('g')
      .attr('transform', `translate(32, ${(HEIGHT / 2)})`);


  // The initial display.
  update(alphabet, g);

  // Grab a random sample of letters from the alphabet, in alphabetical order.
  d3.interval(() => {
    update(d3.shuffle(alphabet)
        .slice(0, Math.floor(Math.random() * 26))
        .sort(), g);
  }, UPDATE_INTERVAL);
};

