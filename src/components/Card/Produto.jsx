import { useState } from 'react'
import foto1 from '../../assets/transferir.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function Produto () {
    const [produtos , setProdutos] = useState([
        {
            id:1,
            nome: 'Monitor',
            preço: "759,99", 
            imagem: foto1 ,
            descricao: "Monitor de 21 polegadas."
        }, {
            id:2,
            nome: 'Monitor',
            preço: "759,99", 
            imagem: foto1 ,
            descricao: "Monitor de 21 polegadas."
        }
    ]);
    const [novoProduto, setNovoProduto] = useState({
        nome: '',
        preco: '',
        descricao: '',
        imagem: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imagem') {
            setNovoProduto({ ...novoProduto, imagem: files[0] });
        } else {
            setNovoProduto({ ...novoProduto, [name]: value });
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(novoProduto.nome.trim() === '' || novoProduto.preco.trim() === '') return;

        const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
        let imagemURL = foto1;
        if (novoProduto.imagem) {
            imagemURL = URL.createObjectURL(novoProduto.imagem);
        }

        const novo = {
            id : novoId,
            nome: novoProduto.nome,
            preço: novoProduto.preco,
            imagem: imagemURL,
            descricao: novoProduto.descricao
        };

        setProdutos([...produtos, novo]);
        setNovoProduto({ nome: '', preco: '', descricao: '', imagem: null });
    }

    return(
        <>
        <div className='bg-amber-500 flex gap-5 '>
            {produtos.map(produto => (
                <div key={produto.id} className='h-fit max-w-64  border-6 mx-1'>
                    <h2 className='text-center text-4xl font-bold'>{produto.nome}</h2>
                    <p>{produto.preço}</p>
                    <img src={produto.imagem} alt={produto.nome} style={{ maxHeight: '20vh' }} />
                    <p>{produto.descricao}</p>
                </div>
            ))}
        </div>
        
        <Form className='mx-2 p-2' onSubmit={handleSubmit}>
            <h1 className='text-center'>Cadastro de Produtos</h1>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridNome" >
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
                <Form.Control 
                    type="file" 
                    name="imagem"
                    onChange={handleChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    )
}