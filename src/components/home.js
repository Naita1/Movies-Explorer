import { useEffect, useState } from "react"
import { fetchMovies } from "../services/api"
import "../style/home.css"
import { HiOutlineHome, HiOutlineSearch, HiOutlineStar, HiOutlineUser, HiOutlineMoon, HiOutlinePlus } from "react-icons/hi"



export default function Home() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovies() {
            try {
                const data = await fetchMovies("/films");
                setMovies(data)
            } catch (error) {
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        loadMovies()
    }, []);

    if (loading) return <p style={{ color: "white" }}>Carregando filmes...</p>

    return (

        <div>
            <header>

                <div class="navbar">
                    <div class="nav-left">
                        <a class="navbar-brand" href="/"> <HiOutlineHome /> </a>
                        <a class="navbar-brand" href="/favoritos"> <HiOutlineStar color="white" /> </a>
                        <a class="navbar-brand" href="/categorias"> Categorias </a>
                    </div>

                    <div class="nav-center">
                        <button className="search-btn">
                            <HiOutlineSearch size={20}></HiOutlineSearch>
                        </button>

                    </div>
                    <div class="nav-right">
                        <a class="navbar-brand" href="/perfil"> <HiOutlineUser color="white" /> </a>
                        <button><HiOutlineMoon /></button>

                    </div>
                </div>
            </header>
            <main>
                {movies.length > 0 && (
                    <section
                        className="banner"
                        style={{ '--banner-url': `url(${movies[0].movie_banner})` }}
                    >
                        <img className="banner-img" src={movies[0].movie_banner} alt={movies[0].title} />
                        <div className="banner-info">
                            <h2>{movies[0].title}</h2>
                            <button>Assistir</button>
                            <button><HiOutlinePlus /></button>
                        </div>
                    </section>

                )}

                <div className="movie-row">
                    <h2>Filmes em destaque</h2>
                    <div className="movie-scrool">
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie_card_individual">
                                <img className="movie_image" src={movie.image} alt={movie.title} width={100}></img>
                                <h3>{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="movie-row">
                    <h2>Mais recomendados</h2>
                    <div className="movie-scrool">
                        {movies.map((movie) => (
                            <div key={movie.id} className="movie_card_individual">
                                <img className="movie_image" src={movie.image} alt={movie.title} width={100}></img>
                                <h3>{movie.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>


            </main>
        </div>
    )
}

