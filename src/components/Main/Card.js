import user from "../../images/user.jpeg";

function Card({ data }) {
  return (
    <article className="preview__autor">
      <div className="preview__autor__info-project">
        <p className="preview__autor__info-project--subtitle">Personal Project Card</p>

        <h2 className="preview__autor__info-project--title">{data.name || "Elegant Workspace"}</h2>
        <p className="preview__autor__info-project--slogan">{data.slogan || "Diseños Exclusivos"}</p>
        <p className="preview__autor__info-project--desc">
          {data.desc ||
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit.Libero, delectus? Voluptates at hic aliquam porro ad suscipi harum laboriosam"}
        </p>
        <div className="preview__autor__info-project--technologies">
          <p className="preview__autor__info-project--technologies--text">{data.technologies || "React JS, MongoDB"}</p>
        </div>
        <div className="preview__autor__info-project--icons">
          <a href={data.repo} target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github-alt"></i>
          </a>
          <a href={data.demo} target="_blank" rel="noreferrer">
            <i className="fa-solid fa-globe"></i>
          </a>
        </div>
      </div>

      <div className="preview__autor__info-autor">
        <img className="preview__autor__info-autor--image" src={user} alt="" />
        <p className="preview__autor__info-autor--job">{data.job || "Full Stack Developer"}</p>
        <p className="preview__autor__info-autor--name">{data.autor || "Emmelie Björklund"}</p>
      </div>
    </article>
  )
}

export default Card;