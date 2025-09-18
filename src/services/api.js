const BASE_URL = "https://ghibliapi.vercel.app";

export async function fetchMovies(endpoint) {
    const res = await fetch(`${BASE_URL}${endpoint}`);

    if(!res.ok){
        throw new Error ("Erro ao buscar filmes");
    }
    return res.json()
}

