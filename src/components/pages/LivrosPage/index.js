import React, { useState, useEffect,  } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import {
  Layout,
  LivrosList,
  LivrosFilter,
  LivrosDetalhes,
} from 'components'
const { Content } = Layout

const LivrosPage = () => {
  const [livros, setLivros] = useState([])
  const [livrosInicial, setLivrosInicial] = useState([])
  setLivros
  const [livro, setLivro] = useState({})
  const [modalVisivel, setModalVisivel] = useState(false)

  const [buscaLivro, setBuscaLivro] = useState('')

  const [anoDe, setAnoDe] = useState(parseInt(new Date().getFullYear()))
  const [anoAte, setAnoAte] = useState(parseInt(new Date().getFullYear()))

  const [calendarioAnoDe, setCalendarioAnoDe] = useState(false)
  const [calendarioAnoAte, setCalendarioAnoAte] = useState(false)

  const [quantidade, setQuantidade] = useState(0)

  const abrirCalendarioAnoDe = (status) => {
    setCalendarioAnoDe(status)
  }

  const abrirCalendarioAnoAte = (status) => {
    setCalendarioAnoAte(status)
  }

  const mostrarModal = (record) => {
    setLivro(record)
    setModalVisivel(true)
  }

  const pegarLivros = () => {
    var url = new URL('http://localhost:3000/api/livros/')
    var params = buscaLivro ? { titulo: buscaLivro, autor: buscaLivro, isbn: buscaLivro } : {};
    url.search = new URLSearchParams(params).toString();

    fetch(url)
      .then((response) => {
          return response.json()
      })
      .then((data) => {
        setQuantidade(data.quantidade)
        setLivros(data.data)
        setLivrosInicial(data.data)
      });
  }

  const filtrarLivrosAno = () => {
    setLivros(livrosInicial.filter(livro => anoAte >= livro.ano  &&  anoDe <= livro.ano ))
  }

  return (
    <Content>
      <LivrosDetalhes
        livro={livro}
        modalVisivel={modalVisivel}
        setModalVisivel={setModalVisivel}
      />
      <LivrosFilter
        quantidade={quantidade}
        abrirCalendarioAnoDe={abrirCalendarioAnoDe}
        abrirCalendarioAnoAte={abrirCalendarioAnoAte}
        setCalendarioAnoAte={setCalendarioAnoAte}
        calendarioAnoAte={calendarioAnoAte}
        setCalendarioAnoDe={setCalendarioAnoDe}
        calendarioAnoDe={calendarioAnoDe}
        anoDe={anoDe}
        anoAte={anoAte}
        setAnoDe={setAnoDe}
        setAnoAte={setAnoAte}
        pegarLivros={pegarLivros}
        filtrarLivrosAno={filtrarLivrosAno}
        buscaLivro={buscaLivro}
        setBuscaLivro={setBuscaLivro}
        livros={livros}
      />
      <LivrosList
        anoDe={anoDe}
        anoAte={anoAte}
        mostrarModal={mostrarModal}
        pegarLivros={pegarLivros}
        livros={livros}
        livro={livro}
        setLivro={setLivro}
        setModalVisivel={setModalVisivel}
        modalVisivel={modalVisivel}
      />
    </Content>
  )
}

export default withRouter(LivrosPage)
