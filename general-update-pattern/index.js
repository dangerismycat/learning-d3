const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const names = [
  'James',
  'Mary',
  'John',
  'Patricia',
  'Robert',
  'Jennifer',
  'Michael',
  'Elizabeth',
  'William',
  'Linda',
  'David',
  'Barbara',
  'Richard',
  'Susan',
  'Joseph',
  'Jessica',
  'Thomas',
  'Margaret',
  'Charles',
  'Sarah',
  'Christopher',
  'Karen',
  'Daniel',
  'Nancy',
  'Matthew',
  'Betty',
  'Anthony',
  'Lisa',
  'Donald',
  'Dorothy',
  'Mark',
  'Sandra',
  'Paul',
  'Ashley',
  'Steven',
  'Kimberly',
  'Andrew',
  'Donna',
  'Kenneth',
  'Carol',
  'George',
  'Michelle',
  'Joshua',
  'Emily',
  'Kevin',
  'Amanda',
  'Brian',
  'Helen',
  'Edward',
  'Melissa',
  'Ronald',
  'Deborah',
  'Timothy',
  'Stephanie',
  'Jason',
  'Laura',
  'Jeffrey',
  'Rebecca',
  'Ryan',
  'Sharon',
  'Gary',
  'Cynthia',
  'Jacob',
  'Kathleen',
  'Nicholas',
  'Amy',
  'Eric',
  'Shirley',
  'Stephen',
  'Anna',
  'Jonathan',
  'Angela',
  'Larry',
  'Ruth',
  'Justin',
  'Brenda',
  'Scott',
  'Pamela',
  'Frank',
  'Nicole',
  'Brandon',
  'Katherine',
  'Raymond',
  'Virginia',
  'Gregory',
  'Catherine',
  'Benjamin',
  'Christine',
  'Samuel',
  'Samantha',
  'Patrick',
  'Debra',
  'Alexander',
  'Janet',
  'Jack',
  'Rachel',
  'Dennis',
  'Carolyn',
  'Jerry',
  'Emma',
  'Tyler',
  'Maria',
  'Aaron',
  'Heather',
  'Henry',
  'Diane',
  'Douglas',
  'Julie',
  'Jose',
  'Joyce',
  'Peter',
  'Evelyn',
  'Adam',
  'Frances',
  'Zachary',
  'Joan',
  'Nathan',
  'Christina',
  'Walter',
  'Kelly',
  'Harold',
  'Victoria',
  'Kyle',
  'Lauren',
  'Carl',
  'Martha',
  'Arthur',
  'Judith',
  'Gerald',
  'Cheryl',
  'Roger',
  'Megan',
  'Keith',
  'Andrea',
  'Jeremy',
  'Ann',
  'Terry',
  'Alice',
  'Lawrence',
  'Jean',
  'Sean',
  'Doris',
  'Christian',
  'Jacqueline',
  'Albert',
  'Kathryn',
  'Joe',
  'Hannah',
  'Ethan',
  'Olivia',
  'Austin',
  'Gloria',
  'Jesse',
  'Marie',
  'Willie',
  'Teresa',
  'Billy',
  'Sara',
  'Bryan',
  'Janice',
  'Bruce',
  'Julia',
  'Jordan',
  'Grace',
  'Ralph',
  'Judy',
  'Roy',
  'Theresa',
  'Noah',
  'Rose',
  'Dylan',
  'Beverly',
  'Eugene',
  'Denise',
  'Wayne',
  'Marilyn',
  'Alan',
  'Amber',
  'Juan',
  'Madison',
  'Louis',
  'Danielle',
  'Russell',
  'Brittany',
  'Gabriel',
  'Diana',
  'Randy',
  'Abigail',
  'Philip',
  'Jane',
  'Harry',
  'Natalie',
  'Vincent',
  'Lori',
  'Bobby',
  'Tiffany',
  'Johnny',
  'Alexis',
  'Logan',
  'Kayla',
];

function getRandomName(namesArray) {
  const index = Math.floor(Math.random() * namesArray.length);
  return namesArray[index];
}

const UPDATE_INTERVAL = 1500;
const HEIGHT = 500;
const WIDTH = 960;
let currentName = getRandomName(names);

function update(data, svgGroup) {
  const transitionDuration = d3.transition().duration(750);

  // DATA JOIN
  // Join new data with old elements, if any.
  const text = svgGroup.selectAll('text')
      .data(data, (d) => d); // second arg provides key to track data through updates
  // EXIT old elements not present in new data
  text.exit()
      .attr('class', 'exit')
    .transition(transitionDuration)
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .remove();
  // UPDATE
  // Update old elements as needed.
  text.attr('class', 'update')
      .attr('y', 0)
      .style('fill-opacity', 1)
    .transition(transitionDuration)
      .attr('x', (d, i) => i * 32)
  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.
  text.enter().append('text')
      .attr('class', 'enter')
      .attr('dy', '.35em')
      .attr('y', -60)
      .attr('x', (d, i) => i * 32)
      .style('fill-opacity', 1e-6)
      .text((d) => d)
    .transition(transitionDuration)
      .attr('y', 0)
      .style('fill-opacity', 1);
  // EXIT
  // Remove old elements as needed.
  // text.exit().remove();
}

function filterByCurrentNameLetters(previousName, namesArray) {
  const previousLetters = previousName.split('');
  return namesArray.filter((item) => item.split('').reduce((bool, cur) => {
    if (previousLetters.includes(cur)) {
      return true;
    }
  }, false));
}

window.onload = () => {
  const svg = d3.select('svg')
      .attr('height', HEIGHT)
      .attr('width', WIDTH);
  const g = svg.append('g')
      .attr('transform', `translate(32, ${(HEIGHT / 2)})`);


  // The initial display.
  // update(alphabet, g);
  update(currentName, g);

  // Grab a random sample of letters from the alphabet, in alphabetical order.
  d3.interval(() => {
    // const newAlphabet = d3.shuffle(alphabet)
    //   .slice(0, Math.floor(Math.random() * 26))
    //   .sort();
    const relatedNames = filterByCurrentNameLetters(currentName, names);
    currentName = getRandomName(relatedNames);
    // update(newAlphabet, g);
    update(currentName, g);
  }, UPDATE_INTERVAL);
};
