import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

// Comparador antes/depois. O controle é um <input type="range">, então
// funciona com mouse, toque e teclado (setas) e é lido por leitores de tela.
// Sem foto de "antes", mostra só o resultado (card estático).
export function BeforeAfter({ item }) {
  const [position, setPosition] = useState(50);
  const inputId = useId();
  const hasBefore = Boolean(item.before?.src);

  return (
    <figure className="v1-ba">
      <div className="v1-ba__frame" style={{ "--pos": `${position}%` }}>
        {hasBefore ? (
          <>
            <ImageSlot slot={item.before} className="v1-ba__img v1-ba__img--before" />
            <div className="v1-ba__after">
              <ImageSlot slot={item.after} fill className="v1-ba__img v1-ba__img--after" />
            </div>

            <span className="v1-ba__tag v1-ba__tag--before" aria-hidden="true">
              Antes
            </span>
            <span className="v1-ba__tag v1-ba__tag--after" aria-hidden="true">
              Depois
            </span>

            <div className="v1-ba__handle" aria-hidden="true">
              <span className="v1-ba__knob">
                <Icon name="chevronsLeftRight" size={18} />
              </span>
            </div>

            <label htmlFor={inputId} className="v1-sr-only">
              Comparar antes e depois: {item.title}
            </label>
            <input
              id={inputId}
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="v1-ba__range"
              aria-valuetext={`${position}% mostrando o depois`}
            />
          </>
        ) : (
          <>
            <ImageSlot slot={item.after} className="v1-ba__img v1-ba__img--after" />
            <span className="v1-ba__tag v1-ba__tag--after" aria-hidden="true">
              Resultado
            </span>
          </>
        )}
      </div>

      <figcaption className="v1-ba__caption">
        <span className="v1-ba__title">{item.title}</span>
        <span className="v1-ba__detail">{item.detail}</span>
      </figcaption>
    </figure>
  );
}

// Carrossel dos casos de antes e depois. No desktop cabem três por vez; no
// celular, um por vez. Rola com as setas, com o teclado ou deslizando.
// Casos sem nenhuma foto ainda (src vazio) ficam escondidos até as fotos chegarem.
export function BeforeAfterCarousel({ items }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  const visible = items.filter((item) => item.after?.src);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setEdges({ start: track.scrollLeft <= 4, end: track.scrollLeft >= max - 4 });
    };
    const ro = new ResizeObserver(update);
    ro.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      track.removeEventListener("scroll", update);
    };
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  };

  const scrollable = !(edges.start && edges.end);

  return (
    <div className="v1-ba-carousel" data-reveal>
      <div
        ref={trackRef}
        className="v1-ba-track"
        role="region"
        aria-roledescription="carrossel"
        aria-label="Casos de antes e depois"
        tabIndex={scrollable ? 0 : -1}
      >
        {visible.map((item) => (
          <div key={item.id} className="v1-ba-slide">
            <BeforeAfter item={item} />
          </div>
        ))}
      </div>

      {scrollable && (
        <div className="v1-ba-nav">
          <button
            type="button"
            className="v1-ba-nav__btn"
            onClick={() => scrollByCard(-1)}
            disabled={edges.start}
            aria-label="Caso anterior"
          >
            <Icon name="arrowLeft" size={20} />
          </button>
          <button
            type="button"
            className="v1-ba-nav__btn"
            onClick={() => scrollByCard(1)}
            disabled={edges.end}
            aria-label="Próximo caso"
          >
            <Icon name="arrowRight" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
