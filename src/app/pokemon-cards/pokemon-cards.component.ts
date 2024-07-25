import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.css']
})
export class PokemonCardsComponent implements OnInit {
  pokemons: any[] = [];

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getPokemons().subscribe((pokemons: any[]) => {
      pokemons.forEach(pokemon => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe(details => {
          this.pokemons.push({
            name: pokemon.name,
            image: details.sprites.front_default,
            type0: details.types[0].type.name,
            type1: details.types[1].type.name,
            color0: this.getColorByType(details.types[0].type.name),
          });
        });
      });
    });
  }

  getColorByType(type: string): string {
    const colors: { [key: string]: string } = {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC',
      // Añade más tipos según sea necesario
    };

    return colors[type] || '#68A090'; // Color por defecto si el tipo no está definido
  }

}
