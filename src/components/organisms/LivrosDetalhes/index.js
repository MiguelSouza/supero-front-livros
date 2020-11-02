import React from 'react'
import PropTypes from 'prop-types'
import {
  Modal, Button, Form, Col, Row, Input,
} from 'antd'

const LivrosDetalhes = ({
  modalVisivel,
  setModalVisivel,
  livro,
}) => {
  const handleCancel = () => {
    setModalVisivel(false)
  }

  return (
    <Modal
      title="Detalhes do Livro"
      visible={modalVisivel}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Fechar
        </Button>,
      ]}
    >
        <Row>
            <Col style={{paddingRight: '15px'}} span={12}>
              <Form.Item label="Livro">
                <Input value={livro.titulo}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Autor">
                <Input value={livro.autor}/>
              </Form.Item>
            </Col>
            <Col style={{paddingRight: '15px'}} span={12}>
              <Form.Item label="Editora">
                <Input value={livro.editora}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Ano">
                <Input value={livro.ano}/>
              </Form.Item>
            </Col>
            <Col style={{paddingRight: '15px'}} span={12}>
              <Form.Item label="ISBN">
                <Input value={livro.isbn}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Idioma">
                <Input value={livro.idioma}/>
              </Form.Item>
            </Col>
            <Col style={{paddingRight: '15px'}} span={12}>
              <Form.Item label="Peso">
                <Input value={livro.peso}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Comprimento">
                <Input value={livro.comprimento}/>
              </Form.Item>
            </Col>
            <Col style={{paddingRight: '15px'}} span={12}>
              <Form.Item label="Largura">
                <Input value={livro.largura}/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Altura">
                <Input value={livro.altura}/>
              </Form.Item>
            </Col>
        </Row>
    </Modal>
  )
}

LivrosDetalhes.propTypes = {
  modalVisivel: PropTypes.bool,
  setModalVisivel: PropTypes.func,
  livro: PropTypes.object,
}

export default LivrosDetalhes
