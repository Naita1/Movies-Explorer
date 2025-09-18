import { useEffect, useState } from "react"
import { fetchMovies } from "../services/api"

export default function Home(){

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState([true])

    useEffect(()=>{
        async function loadMovies() {
            try {
                const data = await fetchMovies("/films");
                setMovies(data)
            } catch (error) {
                console.error(error)
            }
            finally{
                setLoading(false)
            }
        }
        loadMovies()
    }, []);

    if (loading) return <p>Carregando filmes...</p>
  
    return(
        <div>
            <h1>Filmes</h1>
            <div >{movies.map((movie) => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                </div>
            ))}</div>
        </div>
    )
}

