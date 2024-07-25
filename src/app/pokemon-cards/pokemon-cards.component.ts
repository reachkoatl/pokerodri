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
            height: details.types[0].type.name,
            weight: details.types[1].type.name
          });
        });
      });
    });
  }
}
