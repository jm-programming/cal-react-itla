import './styles/boton.css'

const Boton = (parametros) => {
  const { texto, clase, handleClick } = parametros
  return <button className={clase} onClick={handleClick}> {texto} </button>

}

export default Boton