import { useEffect, useRef, useState } from "react"
import { fetchMovies } from "../services/api"
import "../style/home.css"
import { HiOutlineHome, HiOutlineSearch, HiOutlineStar, HiOutlineUser, HiOutlinePlus, HiOutlineX} from "react-icons/hi"
import Carousel from "./carousel.js"
import { HiOutlineCog6Tooth, HiOutlinePlay } from "react-icons/hi2"


export default function Home() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const destaqueRef = useRef(null)
    const recomendadosRef = useRef(null)
    const [selectedMovie, setSelectedMovie] = useState(null)
    const userLang = navigator.language || navigator.userLanguage

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

                <div className="navbar">
                    <div className="nav-left">
                        <a className="navbar-brand" href="/"> <HiOutlineHome size={25} /> </a>
                        <a className="navbar-brand" href="/favoritos"> <HiOutlineStar size={25} /> </a>
                        <a className="navbar-brand" href="/categorias"> Categorias </a>
                    </div>

                    <div className="nav-center">
                        <button className="searh-btn">
                            <HiOutlineSearch size={25}></HiOutlineSearch>
                        </button>

                    </div>
                    <div className="nav-right">
                        <a className="navbar-brand" href="/perfil"> <HiOutlineUser size={25}/> </a>
                        <button>
                            <HiOutlineCog6Tooth size={30}></HiOutlineCog6Tooth>
                        </button>
                    </div>
                </div>
            </header>
            <main>
                {movies.length > 0 && (
                    <section
                        className="banner"
                        style={{ '--banner-url': `url(${movies[0].movie_banner})` }}
                    >
                        {/* <img className="banner-img" src={movies[0].movie_banner} alt={movies[0].title} /> */}
                        <div className="banner-info">
                            <h2>{movies[0].title}</h2>
                            <button> Assistir <HiOutlinePlay/> </button>
                            <button> Favoritar <HiOutlinePlus /> </button>
                        </div>
                    </section>

                )}
             
                <Carousel title="Filmes em destaque" movies={movies.slice(0, 13)} scrollRef={destaqueRef} onSelectMovie={setSelectedMovie} />
                <Carousel title="Mais recomendados" movies={movies.slice(12, 22)} scrollRef={recomendadosRef} onSelectMovie={setSelectedMovie}/>

            </main>

            {selectedMovie && (
                <div className="modal-overlay" onClick={()=> setSelectedMovie(null)}>
                    <div className="modal-card" onClick={(e)=> e.stopPropagation()}>
                        <div className="modal-close-btn"> 
                        <button onClick={() => setSelectedMovie(null)}> <HiOutlineX></HiOutlineX> </button>
                        </div>
                        <h2>{selectedMovie.title}</h2>
                        {/* <img className="banner-img" src={selectedMovie.movie_banner} alt={movies.title} /> */}
                        <p>{selectedMovie.description}</p>
                        <p> <strong>Duração: </strong>  {selectedMovie.running_time}</p>
                        <p> <strong>Ano: </strong> {selectedMovie.release_date}</p>
                        <div className="modal-btn">
                            <button>Assistir <HiOutlinePlay/> </button>
                            <button>Favoritar <HiOutlinePlus /></button> 
                        </div> 

                    </div>                    
                </div>
            )}
        </div>
    )
}

