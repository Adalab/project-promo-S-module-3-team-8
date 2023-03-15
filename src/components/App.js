import "../styles/App.scss";



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


  return (
    <div className="container">
      <Header></Header>
      <main className="main">
        <Preview data={data}></Preview>
        <Form
          data={data}
          info={info} url={url}
          card={card}
          setData={setData}
          setCard={setCard}
          setUrl={setUrl}
          setInfo={setInfo}
        ></Form>
      </main>
      <Footer logo={logo}></Footer>
    </div>
  );
}

export default App;
