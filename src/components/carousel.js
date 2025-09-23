import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi"
import "../style/home.css"

function Carousel({ title, movies, scrollRef, onSelectMovie }) {
  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="carousel-container">
        <button className="scroll-btn left" onClick={() => scroll("left")} aria-label="Scroll para esquerda">
          <HiOutlineChevronLeft size={25} />
        </button>

        <div className="movie-scroll" ref={scrollRef}>
          {movies?.map((movie) => (
            <div key={movie.id} className="movie_card_individual"  onClick={() => onSelectMovie(movie)}>
              {/* <img className="movie_image" src={movie.image} alt={movie.title} loading="lazy" /> */}
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>

        <button className="scroll-btn right" onClick={() => scroll("right")} aria-label="Scroll para direita">
          <HiOutlineChevronRight size={25} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
  