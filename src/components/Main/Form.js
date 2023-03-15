import Input from "./Input";
import dataApi from '../../services/api';

function Form({ data, info, url, card, setData, setCard, setUrl, setInfo }) {

  const handleSubmit = (ev) => {
    ev.preventDefault();
  }

  const handleInput = (ev) => {
    const inputValue = ev.target.value;
    const inputName = ev.target.name;
    setData({
      ...data, [inputName]: inputValue
    });
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
            setCard('Ha ocurrido un error con el servidor, inténtelo de nuevo más tarde.');
          } else {
            setCard('Lo sentimos, ha ocurrido un error, inténtelo de nuevo más tarde.');
          }
        } else {
          setUrl(info.cardURL)
          setInfo(info)
        }
      })
  }

  return (
    <section className='sectionForm'>
      <h2 className="sectionForm__title">Información</h2>
      <form className="sectionForm__form" onSubmit={handleSubmit}>
        <fieldset className="sectionForm__form__project">
          <legend className="sectionForm__form__project--info">
            Cuéntanos sobre el proyecto
          </legend>
          <Input htmlFor={'name'} placeholder={"Ejemplo: Mi proyecto"} data={data.name} handleInput={handleInput}
            text={'Nombre del proyecto:'} setData={setData}></Input>

          <Input htmlFor={"slogan"} placeholder={"Ejemplo: "} data={data.slogan} handleInput={handleInput}
            text={'Slogan:'} setData={setData}></Input>

          <Input htmlFor={"repo"} placeholder={"Ejemplo: https://github.com/Adalab/my-project"} data={data.repo} handleInput={handleInput}
            text={'Repositorio:'} pattern={'^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$'} setData={setData}></Input>

          <Input htmlFor={"demo"} placeholder={"Ejemplo: http://beta.adalab.es/my-project/"} data={data.demo} handleInput={handleInput}
            text={"Demo:"} pattern={'^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$'} setData={setData} ></Input>

          <Input htmlFor={"technologies"} placeholder={"Ejemplo: React - SASS - HTML"} data={data.technologies} handleInput={handleInput}
            text={"Tecnologías:"} setData={setData}></Input>

          <label htmlFor="desc" className="sectionForm__form__project--label">Descripción:
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
            Cuéntanos sobre la autora

          </legend>
          <Input htmlFor={"autor"} placeholder={"Ejemplo: MariCarmen"} data={data.autor} handleInput={handleInput}
            text={"Nombre:"} setData={setData}></Input>

          <Input htmlFor={"job"} placeholder={"Ejemplo: Front-end developer"} data={data.job} handleInput={handleInput}
            text={"Profesión:"} setData={setData}></Input>
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
  )
}

export default Form;