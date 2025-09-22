import { useEffect, useRef, useState } from "react"
import { fetchMovies } from "../services/api"
import "../style/home.css"
import { HiOutlineHome, HiOutlineSearch, HiOutlineStar, HiOutlineUser, HiOutlineMoon, HiOutlinePlus} from "react-icons/hi"
import Carousel from "./carousel.js"


export default function Home() {

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)
    const destaqueRef = useRef(null)
    const recomendadosRef = useRef(null)


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
                        <a className="navbar-brand" href="/"> <HiOutlineHome /> </a>
                        <a className="navbar-brand" href="/favoritos"> <HiOutlineStar color="white" /> </a>
                        <a className="navbar-brand" href="/categorias"> Categorias </a>
                    </div>

                    <div className="nav-center">
                        <button className="searh-btn">
                            <HiOutlineSearch size={20}></HiOutlineSearch>
                        </button>

                    </div>
                    <div className="nav-right">
                        <a className="navbar-brand" href="/perfil"> <HiOutlineUser color="white" /> </a>
                        <button><HiOutlineMoon /></button>
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
             
                <Carousel title="Filmes em destaque" movies={movies.slice(0, 13)} scrollRef={destaqueRef} />
                <Carousel title="Mais recomendados" movies={movies.slice(14, 22)} scrollRef={recomendadosRef} />

            </main>
        </div>
    )
}

