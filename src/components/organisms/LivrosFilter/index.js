import React from 'react'
import PropTypes from 'prop-types'
import { Input, Button, DatePicker, Divider } from 'antd';
import {
  Block,
} from 'components'
import moment from 'moment';
import 'moment/locale/pt-br';

const LivrosFilter = (
  { quantidade, abrirCalendarioAnoDe, abrirCalendarioAnoAte, setCalendarioAnoDe, setCalendarioAnoAte, calendarioAnoDe, calendarioAnoAte, setAnoDe, setAnoAte, anoDe, anoAte, livros, buscaLivro, setBuscaLivro, pegarLivros, filtrarLivrosAno },
) => {
  return ( 
    <Block>
      <Block style={{ display: 'flex' }}>
        <Block style={{ width: '10%', textAlign: 'left', fontWeight: 'bold', fontSize: '25px' }}>SUPERO</Block>
          <Block style={{ width: '60%' }}>
            <Input
              name="busca"
              onChange={(e) => { setBuscaLivro(e.target.value) }}
              placeholder="Buscar livros pelo título, autor e ISBN."
            />
          </Block>
        <Block style={{ width: '10%' }}>
          <Button onClick={(e) => { pegarLivros() }}>Buscar</Button>
        </Block>
      </Block>
      <Divider style={{ margin: '0px'}} />
      <Block style={{ display: 'flex' }}>
        <Block style={{ width: '20%', fontWeight: 'bold', fontSize: '15px' }}>
          Filtrar ano de publicação do livro.
        </Block>
        <Block style={{ width: '10%' }}>
          <DatePicker placeholder="Ano Inicial" open={calendarioAnoDe} onPanelChange={(value) => { setAnoDe(value.format('YYYY')), setCalendarioAnoDe(false) }}
          onOpenChange={abrirCalendarioAnoDe} format="YYYY" mode='year' value={moment(anoDe, 'YYYY')} />
        </Block>
        <Block style={{ width: '10%' }}>
          <DatePicker placeholder="Ano Final" open={calendarioAnoAte} onPanelChange={(value) => { setAnoAte(value.format('YYYY')), setCalendarioAnoAte(false) }}
          onOpenChange={abrirCalendarioAnoAte} format="YYYY" mode='year' value={moment(anoAte, 'YYYY')} />
        </Block>
        <Block style={{ width: '60%', fontSize: '20px' }}>
          {quantidade + " resultados encontrados"} 
        </Block>
      </Block>
    </Block>
  )
}

LivrosFilter.propTypes = {
  anoDe: PropTypes.number,
  anoAte: PropTypes.number,
  abrirCalendarioAnoDe: PropTypes.func,
  abrirCalendarioAnoAte: PropTypes.func,
  setCalendarioAnoDe: PropTypes.func,
  setCalendarioAnoAte: PropTypes.func,
  calendarioAnoDe: PropTypes.boolean,
  calendarioAnoAte: PropTypes.boolean,
  filtrarLivrosAno: PropTypes.func.isRequired,
  setAnoAte: PropTypes.func.isRequired,
  setAnoDe: PropTypes.func.isRequired,
  setBuscaLivro: PropTypes.func.isRequired,
  livros: PropTypes.array,
  pegarLivros: PropTypes.func.isRequired,
  buscaLivro: PropTypes.string,
}

export default LivrosFilter
