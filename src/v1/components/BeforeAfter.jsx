import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

// Um caso de antes e depois: as duas fotos inteiras, lado a lado.
// (As fotos da loja são tiradas em lugares e ângulos diferentes, então mostrar
// cada uma completa fica mais fiel do que cortar as duas no meio.)
// Sem foto de "antes", mostra só o resultado, com a mesma altura do par.
export function BeforeAfter({ item }) {
  const hasBefore = Boolean(item.before?.src);

  return (
    <figure className="v1-ba">
      {hasBefore ? (
        <div className="v1-ba__pair">
          <div className="v1-ba__side">
            <ImageSlot slot={item.before} sizes="(max-width: 900px) 50vw, 25vw" />
            <span className="v1-ba__tag">Antes</span>
          </div>
          <div className="v1-ba__side">
            <ImageSlot slot={item.after} sizes="(max-width: 900px) 50vw, 25vw" />
            <span className="v1-ba__tag v1-ba__tag--after">Depois</span>
          </div>
        </div>
      ) : (
        <div className="v1-ba__side">
          {/* 8/5 = largura de duas fotos 4/5: mesma altura dos pares */}
          <ImageSlot slot={item.after} ratio="8/5" sizes="(max-width: 900px) 100vw, 50vw" />
          <span className="v1-ba__tag v1-ba__tag--after">Resultado</span>
        </div>
      )}

      <figcaption className="v1-ba__caption">
        <span className="v1-ba__title">{item.title}</span>
        <span className="v1-ba__detail">{item.detail}</span>
      </figcaption>
    </figure>
  );
}

// Carrossel dos casos. Dois casos por vez no desktop e um no celular.
// Rola com as setas, com o teclado (setas, quando focado) ou deslizando.
export function BeforeAfterCarousel({ items }) {
  const trackRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: true });

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
        {items.map((item) => (
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
