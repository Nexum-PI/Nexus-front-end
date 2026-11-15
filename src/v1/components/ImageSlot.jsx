// Reserva o espaço de uma imagem com proporção fixa.
// Com `slot.src` preenchido (src/v1/data/media.js) mostra a foto; sem ele,
// mostra um bloco temporário do mesmo tamanho, para a página não mudar de
// estrutura quando as fotos definitivas chegarem.

const BASE_WIDTH = 1600;

const sizeFromRatio = (ratio = "4/3") => {
  const [w, h] = ratio.split("/").map(Number);
  return { width: BASE_WIDTH, height: Math.round((BASE_WIDTH * h) / w) };
};

export function ImageSlot({
  slot,
  className = "",
  fill = false, // ocupa 100% do pai (o pai define o tamanho)
  eager = false, // true só para a imagem do topo da página
  sizes = "100vw",
  showLabel = true,
}) {
  const { src, srcMobile, alt = "", ratio = "4/3", label } = slot ?? {};
  const style = fill ? undefined : { aspectRatio: ratio.replace("/", " / ") };
  const classes = ["v1-slot", fill && "v1-slot--fill", !src && "v1-slot--empty", className]
    .filter(Boolean)
    .join(" ");

  if (!src) {
    return (
      <div className={classes} style={style} role="img" aria-label={alt || undefined}>
        {showLabel && label && (
          <span className="v1-slot__label" aria-hidden="true">
            Foto · {label}
          </span>
        )}
      </div>
    );
  }

  const { width, height } = sizeFromRatio(ratio);
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
    />
  );

  return (
    <div className={classes} style={style}>
      {srcMobile ? (
        <picture style={{ display: "contents" }}>
          <source media="(max-width: 720px)" srcSet={srcMobile} />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
}
