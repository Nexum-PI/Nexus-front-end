import { useId, useState } from "react";
import { Icon } from "./Icon";
import { ImageSlot } from "./ImageSlot";

// Comparador antes/depois. O controle é um <input type="range">, então
// funciona com mouse, toque e teclado (setas) e é lido por leitores de tela.
export function BeforeAfter({ item }) {
  const [position, setPosition] = useState(50);
  const inputId = useId();

  return (
    <figure className="v1-ba" data-reveal>
      <div className="v1-ba__frame" style={{ "--pos": `${position}%` }}>
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
      </div>

      <figcaption className="v1-ba__caption">
        <span className="v1-ba__title">{item.title}</span>
        <span className="v1-ba__detail">{item.detail}</span>
      </figcaption>
    </figure>
  );
}
