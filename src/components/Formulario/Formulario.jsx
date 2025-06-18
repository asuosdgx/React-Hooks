import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function Formulario() {
  return (
    <Form className="mx-2 p-2 ">
      <h1 className="text-center">Cadastro de Produtos</h1>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="Nome" placeholder="Nome do Produto" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPreco">
          <Form.Label>Preço</Form.Label>
          <Form.Control type="text" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridDescricao">
        <Form.Label>Descricao</Form.Label>
        <Form.Control placeholder="Descrição do Produto" />
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Insira uma imagem do produto</Form.Label>
        <Form.Control type="file" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
