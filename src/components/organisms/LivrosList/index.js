import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Table, Button, Icon, } from 'antd';

const LivrosList = (
  { anoDe, anoAte, mostrarModal, livros, livro, setLivro, pegarLivros},
) => {
  useEffect(() => {
    pegarLivros()
  }, []);

  const columns = [
    {
      title: 'Livro',
      dataIndex: 'titulo',
      key: 'titulo',
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor',
    },
    {
      title: 'Editora',
      dataIndex: 'editora',
      key: 'editora',
    },
    {
      title: 'Ano',
      dataIndex: 'ano',
      key: 'ano',
    },
    {
      title: 'Acões',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button onClick={(e) => { mostrarModal(record, e) }} title="Detalhes">
            <Icon type="zoom-in" />
          </Button>
        </span>
      ),
    },
  ];

  return (
    <Table dataSource={livros.filter(livro => (anoAte >= livro.ano  &&  anoDe <= livro.ano) )} columns={columns} />
  )
}

LivrosList.propTypes = {
  anoDe: PropTypes.number,
  anoAte: PropTypes.number,
  mostrarModal: PropTypes.func,
  pegarLivros: PropTypes.func,
  setLivros: PropTypes.func,
  livros: PropTypes.array.isRequired,
  livro: PropTypes.object, 
  setLivro: PropTypes.func,
}

export default LivrosList
