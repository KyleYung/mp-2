import { useState, useEffect } from 'react';
import { Pokemon } from "../interfaces/Types.ts";
import { styled } from "styled-components";

export default function PokemonListContent() {
    const [pokeName, setPokeName] = useState("Pikachu");
    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {
        async function getPokemon() {
            const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            const data = await res.json();
            setPokemon({
                name: data.name,
                order: data.order,
                image: data.sprites.other["official-artwork"].front_default,
                weight: data.weight,
                height: data.height,
                types: data.types.map((t: any) => t.type.name),
            });
        }
        getPokemon()
    })

    return (
        <div>
            <label><strong>Enter Pokemon:</strong></label><br></br>
             <input type="text" placeholder="Enter Pokemon Name" value={pokeName} onChange={(e) => setPokeName(String(e.target.value))}/>
             <div>
                {
                    pokemon ? <PokemonPreview pokemon={pokemon} /> : <p>Unknown Pokemon</p>
                }
             </div>
        </div>

    )
}

const PokemonPreviewDiv = styled.div`
    margin: 3rem;
    padding: 1rem;
    width: 20rem;
    background-color:rgba(0, 217, 255, 0.92);
    border: solid white 2px;
`;

const PokemonImage = styled.img`
    width: 20rem;
    height: auto;
    border-bottom: solid aqua 2px;
`;

const PokemonPreview = ({pokemon}: {pokemon: Pokemon}) => {
    return (
        <>
            <PokemonPreviewDiv>
                <PokemonImage src={pokemon.image} alt={pokemon.name} />
                <h3><strong>Index:</strong> {pokemon.order}</h3>
                <h3>Name: {pokemon.name}</h3>
                <p><strong>Type:</strong> {pokemon.types.join(" and ")}</p>
                <p><strong>Height:</strong> {pokemon.height}</p>
                <p><strong>Weight:</strong> {pokemon.weight}</p>
            </PokemonPreviewDiv>
        </>
    );
}

