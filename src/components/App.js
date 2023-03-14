import "../styles/App.scss";


import dataApi from '../services/api';
import { useState } from "react";
import logo from '../images/logo-adalab.png';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Preview from "./Main/Preview";
import Form from "./Main/Form";
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
    <div className="container">
      <Header></Header>
      <main className="main">
        <Preview data={data}></Preview>
        <Form handleSubmit={handleSubmit} handleInput={handleInput}
        data={data}
        info={info} url={url}
        card={card}
        ></Form>
      </main>
      <Footer logo = {logo}></Footer>
    </div>
  );
}

export default App;
