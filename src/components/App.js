import "../styles/App.scss";
import cover from "../images/cover.jpeg";
import user from "../images/user.jpeg";
import dataApi from '../services/api';
import { useState } from "react";
import logo from '../images/logo-adalab.png';
// import cover2 from '../images/cover_2.jpeg';
//pepino

function App() {
  // const [name, setName] = useState("");
  // const [slogan, setSlogan] = useState("");
  // const [repo, setRepo] = useState("");
  // const [demo, setDemo] = useState("");
  // const [technologies, setTechnologies] = useState("");
  // const [desc, setDesc] = useState("");
  // const [autor, setAutor] = useState("");
  // const [job, setJob] = useState("");

  const [data, setData] = useState({
    name: "",
    slogan: "",
    repo: "",
    demo: "",
    technologies: "",
    desc: "",
    autor: "",
    job: "",
    image: "https://i.blogs.es/66b2a4/photo-1511367461989-f85a21fda167/1366_2000.jpeg",
    photo: "http://edap.es/wp-content/uploads/blog9-img-01.jpg"
  })

  const [url, setUrl] = useState('');
  const [info, setInfo] = useState('');
  const [card, setCard] = useState('');

  const handleInput = (ev) => {
    const inputValue = ev.target.value;
    const inputName = ev.target.name;
    if (inputName === "name") {
      setData({
        ...data, name: inputValue
      });
    } else if (inputName === "slogan") {
      setData({
        ...data, slogan: inputValue
      });
    } else if (inputName === "repo") {
      setData({
        ...data, repo: inputValue
      });
    } else if (inputName === "demo") {
      setData({
        ...data, demo: inputValue
      });
    } else if (inputName === "technologies") {
      setData({
        ...data, technologies: inputValue
      });
    } else if (inputName === "desc") {
      setData({
        ...data, desc: inputValue
      });
    } else if (inputName === "autor") {
      setData({
        ...data, autor: inputValue
      });
    } else if (inputName === "job") {
      setData({
        ...data, job: inputValue
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  }

  const handleClickSend = (ev) => {
    dataApi(data)
      .then(info => {
        console.log(info);
        if (!info.success) {
          if (info.error.includes('Mandatory fields:')) {
            setCard('Todos los campos son obligatorios. Por favor, revise y cubra los campos restantes.');
          } else if (info.error.includes('Database error: ER_DATA_TOO_LONG')) {
            setCard('La foto es desmasiado grande debe ser de 200x200 px y menor a 120 KB, intente reducirla o use otra foto.');
          } else if (info.error.includes('Database error: Database was shut down')) {
            setCard('Ha ocurrido un error con el servidor, int??ntelo de nuevo m??s tarde.');
          } else {
            setCard('Lo sentimos, ha ocurrido un error, int??ntelo de nuevo m??s tarde.');
          }
        } else {
          setUrl(info.cardURL)
          setInfo(info)
        }
      })
  }

  // const errorMsg = () => {
  //   if (!info.error) {
  //     if (info.error.includes('Mandatory fields:')) {
  //       setCard(<p>Todos los campos son obligatorios, por favor rev??salo</p>)
  //     }
  //   } else {
  //     console.log(info)
  //   }
  // }



  return (
    <div className="container">
      <header className="header">
        <i className="fa-solid fa-laptop-code"></i>
        <h1 className="header__text">Gestor de proyectos</h1>
      </header>
      <main className="main">
        <section className="preview">
          <img className="preview__image" src={cover} alt="" />

          <article className="preview__autor">
            <div className="preview__autor__info-project">
              <p className="preview__autor__info-project--subtitle">Personal Project Card</p>
              {/* <hr className="line" /> */}

              <h2 className="preview__autor__info-project--title">{data.name || "Elegant Workspace"}</h2>
              <p className="preview__autor__info-project--slogan">{data.slogan || "Dise??os Exclusivos"}</p>
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
              <p className="preview__autor__info-autor--name">{data.autor || "Emmelie Bj??rklund"}</p>
            </div>
          </article>
        </section>
        <section className='sectionForm'>
          <h2 className="sectionForm__title">Informaci??n</h2>
          <form className="sectionForm__form" onSubmit={handleSubmit}>
            <fieldset className="sectionForm__form__project">
              <legend className="sectionForm__form__project--info">
                Cu??ntanos sobre el proyecto
                {/* <hr className="line" /> */}
              </legend>
              <label htmlFor="name" className="sectionForm__form__project--label">Nombre del proyecto:
                <input
                  className="sectionForm__form__project--input"
                  type="text"
                  placeholder="Ejemplo: Mi proyecto"
                  name="name"
                  id="name"
                  value={data.name}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="slogan" className="sectionForm__form__project--label">Slogan:
                <input
                  className="sectionForm__form__project--input"
                  type="text"
                  name="slogan"
                  id="slogan"
                  placeholder="Ejemplo: "
                  value={data.slogan}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="repo" className="sectionForm__form__project--label">Repositorio:
                <input
                  className="sectionForm__form__project--input"
                  type="text"
                  name="repo"
                  id="repo"
                  pattern='^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$'
                  placeholder="Ejemplo: https://github.com/Adalab/my-project"
                  value={data.repo}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="demo" className="sectionForm__form__project--label">Demo:
                <input
                  className="sectionForm__form__project--input"
                  type="text"
                  placeholder="Ejemplo: http://beta.adalab.es/my-project/"
                  name="demo"
                  id="demo"
                  pattern='^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$'
                  value={data.demo}
                  onChange={handleInput}
                />
                <p></p>
              </label>
              <label htmlFor="technologies" className="sectionForm__form__project--label">Tecnolog??as:
                <input
                  className="sectionForm__form__project--input"
                  type="text"
                  placeholder="Ejemplo: React - SASS - HTML"
                  name="technologies"
                  id="technologies"
                  value={data.technologies}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="desc" className="sectionForm__form__project--label">Descripci??n:
                <textarea
                  className="sectionForm__form__project--textarea"
                  type="text"
                  placeholder="Ejemplo: Este es mi proyecto."
                  name="desc"
                  id="desc"
                  value={data.desc}
                  onChange={handleInput}
                ></textarea>
              </label>
            </fieldset>

            <fieldset className="sectionForm__form__autor">
              <legend className="sectionForm__form__autor--info">
                Cu??ntanos sobre la autora
                {/* <hr className="line" /> */}
              </legend>
              <label htmlFor="autor" className="sectionForm__form__project--label">Nombre:
                <input
                  className="sectionForm__form__autor--input"
                  type="text"
                  placeholder="Ejemplo: MariCarmen"
                  name="autor"
                  id="autor"
                  value={data.autor}
                  onChange={handleInput}
                />
              </label>
              <label htmlFor="job" className="sectionForm__form__project--label">Profesi??n:
                <input
                  className="sectionForm__form__autor--input"
                  type="text"
                  placeholder="Ejemplo: Front-end developer"
                  name="job"
                  id="job"
                  value={data.job}
                  onChange={handleInput}
                />
              </label>
            </fieldset>

            <fieldset className="sectionForm__form__button">
              <label className="sectionForm__form__button--btn" htmlFor="">Subir foto del proyecto</label>
              <input
                className="hidden"
                type="button"
                value="Subir foto de proyecto"
              />
              <label className="sectionForm__form__button--btn" htmlFor="">Subir foto de la autora</label>
              <input
                className="hidden"
                type="button"
                value="Subir foto de autora"
              />
            </fieldset>

            <fieldset className="sectionForm__form__button">
              <input
                className="sectionForm__form__button--btnLarge"
                type="submit"
                value="CREAR TARJETA"
                onClick={handleClickSend}
              />
            </fieldset>
          </form>
          <div className={info.success ? "sectionForm__form__card" : "sectionForm__form__card hidden"}>
            <p className='sectionForm__form__card--text'> La tarjeta ha sido creada: </p>
            <a className='sectionForm__form__card--text' href={url} target="_blank" rel="noreferrer">
              {url}
            </a>
          </div>
          <p className={info.success ? "hidden" : "sectionForm__form__card--errorMsg"}>{card}</p>
        </section>
      </main>
      <footer className="footer">
        <p className="footer__copy">Nombre del equipo</p>
        <img src={logo} alt="Logo Adalab" className="footer__image" />
      </footer>

    </div>
  );
}

export default App;
