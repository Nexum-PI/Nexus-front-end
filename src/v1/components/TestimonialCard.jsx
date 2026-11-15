// Cartão de depoimento. Sem foto, mostra a inicial do nome no lugar do avatar.
export function TestimonialCard({ testimonial, index = 0 }) {
  const { quote, name, shoe, avatar } = testimonial;
  return (
    <figure
      className="v1-quote"
      data-reveal
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
    >
      <blockquote className="v1-quote__text">
        <p>{quote}</p>
      </blockquote>
      <figcaption className="v1-quote__by">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            width="44"
            height="44"
            loading="lazy"
            className="v1-quote__avatar"
          />
        ) : (
          <span className="v1-quote__avatar v1-quote__avatar--empty" aria-hidden="true">
            {name.charAt(0)}
          </span>
        )}
        <span>
          <span className="v1-quote__name">{name}</span>
          <span className="v1-quote__shoe">{shoe}</span>
        </span>
      </figcaption>
    </figure>
  );
}
