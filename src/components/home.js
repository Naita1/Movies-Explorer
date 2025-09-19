import { useEffect, useState } from "react"
import { fetchMovies } from "../services/api"
import "../style/home.css"


export default function Home(){

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

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

    if (loading) return <p style={{color:"white"}}>Carregando filmes...</p>
  
    return(
        
        <div>
          <header>
              
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="/"> Inicio </a>
            </nav>
              <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="favoritos"> Minha Lista </a>
            </nav>
          </header>
                        <h1>Filmes</h1>
            <div className="movie_card">{movies.map((movie) => (
                <div key={movie.id} className="movie_card_individual">

                    <h3>{movie.original_title}</h3>
                    <img className="movie_image" src={movie.image} alt={movie.title} width={100}></img>
                    <h3>{movie.title}</h3>
                    <h3>{movie.rt_score}</h3>

                </div>
            ))}</div>
        </div>
    )
}

