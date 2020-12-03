import React, { useState }from 'react';
import _ from 'lodash';

export default function App(props) {
  // pets state
  const [pets, setPets] = useState(props.pets);

  // click event handler
  const handleAdopt = (petName) => {
    const petsUpdated = pets.map(pet => {
      if (pet.name == petName) {
        pet.adopted = true;
      }
      return pet;
    });
    setPets(petsUpdated);
  }

  let breeds = Object.keys(_.groupBy(pets, 'breed'));  // Get array of unique breeds

  return (
    <div>
      <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
      </header>

      <main className="container">
        <div className="row">
          <div id="navs" className="col-3">
            <AboutNav />
            <BreedNav breeds={breeds} />
          </div>
          <PetList pets={pets} adoptCallback={handleAdopt} />
        </div>
      </main>

      <footer className="container">
        <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
      </footer>
    </div>
  );
}

function AboutNav() {
  return (
    <nav id="aboutLinks">
      <h2>About</h2>
      <ul className="list-unstyled">
        <li><a href="#/">How to Adopt</a></li>
        <li><a href="#/">Volunteering</a></li>
        <li><a href="#/">Events</a></li>
        <li><a href="#/">Donate</a></li>
        <li><a href="#/">About Us</a></li>
      </ul>
    </nav>
  );
}

function BreedNav(props) {
  let breeds = props.breeds;
  let breedLinksArray = breeds.map(breed => {
    return <li key={breed}><a href="#/">{breed}</a></li>;
  });
  return (
    <nav id="breedLinks">
    <h2>Pick a Breed</h2>
    <ul className="list-unstyled">
      {breedLinksArray}
    </ul>            
  </nav>
  );
}

function PetCard(props) {
  let pet = props.pet;
  let displayedName = pet.adopted ? pet.name + " (Adopted)" : pet.name;
  return (
    <div className="card" onClick={props.adoptCallback}>
      <img className="card-img-top" src={pet.img} alt={pet.name} />
      <div className="card-body">
        <h3 className="card-title">{displayedName}</h3>
        <p className="card-text">{pet.sex} {pet.breed}</p>
      </div>
    </div>
  );
}

function PetList(props) {
  let pets = props.pets;
  let cards = pets.map(pet => {
    return <PetCard pet={pet} key={pet.name} adoptCallback={() => props.adoptCallback(pet.name)} />
  });

  return (
    <div id="petList" className="col-9">
      <h2>Dogs for Adoption</h2>
      <div className="card-deck">
        {cards}
      </div>
    </div>
  );
}