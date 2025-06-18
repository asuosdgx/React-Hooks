import { useEffect, useState } from "react";
import foto1 from "../../assets/transferir.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const API_URL =
  "https://crudcrud.com/api/4eebe02805314c01ac9ff3befea14e14/produtos";

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    preco: "",
    descricao: "",
    imagem: null,
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setCarregando(true);

    const listaficticia = [
      {
        _id: "1",
        nome: "Teste 1",
        preco: "R$ 1000,00",
        descricao: "Monitor lksaxçdlksasadlkhaslkhsadçk~l",
        imagem: foto1,
      },
      {
        _id: "2",
        nome: "Teste 2",
        preco: "R$ 587,00",
        descricao:
          "Monitor LED 24 polegadas Full HD, ideal para trabalho e entretenimento.",
        imagem: foto1,
      },
    ];
    setTimeout(() => {
      setProdutos(listaficticia);
      setCarregando(false);
    }, 1500);
  }, []);

  if (carregando) {
    return (
      <div className="d-flex justify-content-center align-items-center min-h-48">
        <span>Carregando produtos...</span>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagem") {
      setNovoProduto({ ...novoProduto, imagem: files[0] });
    } else {
      setNovoProduto({ ...novoProduto, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (novoProduto.nome.trim() === "" || novoProduto.preco.trim() === "")
      return;
    let imagemURL = "";
    if (novoProduto.imagem) {
      imagemURL = URL.createObjectURL(novoProduto.imagem);
    }

    const novo = {
      nome: novoProduto.nome,
      preco: novoProduto.preco,
      imagem: imagemURL,
      descricao: novoProduto.descricao,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novo),
    })
      .then((res) => res.json())
      .then((data) => {
        setProdutos([...produtos, data]);
        setNovoProduto({ nome: "", preco: "", descricao: "", imagem: null });
      })
      .catch((error) => console.error("Erro ao adicionar produto.", error));
  };

  return (
    <>
      <div className="m-2">
        <div className="row ">
          {produtos.map((produto) => (
            <div key={produto._id} className="col-12 col-md-4 col-lg-3 d-flex">
              <div className="card h-100 shadow-sm bg-dark text-white w-100">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="card-img-top object-contain w-[200px]"
                  
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-center">{produto.nome}</h5>
                  <p className="card-text text-center fw-bold mb-2">
                    {produto.preco}
                  </p>
                  <p
                    className="card-text text-center"
                    title={produto.descricao}
                  >
                    {produto.descricao}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section>
        <Form className="mx-2 p-2" onSubmit={handleSubmit}>
          <h1 className="text-center mt-5">Cadastro de Produtos</h1>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nome do Produto"
                name="nome"
                value={novoProduto.nome}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPreco">
              <Form.Label>Preço</Form.Label>
              <Form.Control
                type="text"
                placeholder="Preço"
                name="preco"
                value={novoProduto.preco}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridDescricao">
            <Form.Label>Descricao</Form.Label>
            <Form.Control
              placeholder="Descrição do Produto"
              name="descricao"
              value={novoProduto.descricao}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Insira uma imagem do produto</Form.Label>
            <Form.Control type="file" name="imagem" onChange={handleChange} />
          </Form.Group>

          <Button variant="warning" type="submit">
            Submit
          </Button>
        </Form>
      </section>
    </>
  );
}
