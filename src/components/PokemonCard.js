//Importamos react y sus diferentes utilidades.
import React, { useState } from 'react';

//Creamos la function que va a generar la tarjeta del Pokemon.
// > Desctructuramos las props para obtener solo name y avatar.
function Pokemon({name, avatar}) {
    return (
        <>
            <figure>
                <img src={avatar} alt={name} />
                <figcaption>{name}</figcaption>
            </figure>
        </>
    );
}

//Creamos una constante de la API de Pokemon.
const API_Pokemon = 'https://pokeapi.co/api/v2/pokemon/';

//Exportamos por orden predeterminado la funcion de la carta pokemon.
export default function PokemonCard() {

    //Creamos dos variables de estado para actualizar el Pokemon y su busqueda.
    const [pokemon, setPokemon] = useState({});
    const [searchPokemon, setSearchPokemon] = useState('');
    
    //Creamos la funcion asyncrona para hacer contacto con la API mediante la busqueda.
    const findPokemons = async (name) => {

        //Creamos un condicional verificando que el campo no esta vacio.
        if (searchPokemon.length > 0) {
            //Creamos un try-catch para manejar errores o peticiones negativas.
            try {
                //Hacemos peticion con fetch.
                const response = await fetch(
                    `
                        ${API_Pokemon}${name}/
                    `
                );

                //Verificamos la respuesta.
                if (!response.ok) {
                    throw ('Error en la respuesta de la API...');
                }

                //Guardamos en una constante la respuesta en formato JSON.
                const data = await response.json();
    
                //Simplificamos el objeto para elegir nuestros propios elementos a mostrar.
                let dataPokemon = {
                    id: data.id,
                    name: data.name,
                    avatar: data.sprites.front_default,
                }

                //Actualizamos variable de estado Poke
                setPokemon(dataPokemon);
            } catch (err) {
                //Mostramos el error en la consola. (saldrá con error de peticion)
                console.log(err);
            }
        } else {
            //Mostramos al usuario que debe llenar el campo.
            alert("Llena el campo del nombre del Pokemon por favor...");
        }
    }  

    return (
        <>
            <div className='container'>
                <div className='navigation'>
                    <h1>Encuentra tu Pokemon favorito</h1>
                    <input
                        value={searchPokemon}
                        placeholder='Nombre del Pokemon'
                        onChange={(e) => setSearchPokemon(e.target.value)}
                    />
                    <button
                        onClick={() => findPokemons(searchPokemon)}
                    >
                        Buscar
                    </button>
                </div>
                <div className='content'>
                    {
                        Object.keys(pokemon).length !== 0 ? <Pokemon name={pokemon.name} avatar={pokemon.avatar}/> : <p>Pokemon no encontrado...</p>
                    }
                </div>
            </div>
        </>
    );
}