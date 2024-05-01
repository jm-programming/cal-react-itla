import './styles/calculadora.css'
import Boton from './Boton'
import { useState } from 'react'

const Calculadora = () => {

  const [data, setData] = useState({ operacion: '', resultado: '' })

  const escritura = (e) => {
    const valor = e.target.innerText
    const esOperador = valor === '+' || valor === '*' || valor === '/' || valor === '-' || valor === '%'
        
    if (data.operacion.length >= 10) return // evita que haya mas de 10 caracteres en el display
    if (valor === '+/-' && data.operacion === '') return // permite solo un signo de +/- en el display
    if(valor === '%'  &&  data.operacion.includes('%')) return // permite solo un signo de % en el display
   
    // si el display tiene la palabra error, la limpia seteando el numero recien ingresado
    if (data.operacion.includes('Error')) {
      setData({...data, operacion:valor})
    }
    //tomamos el resultado y concatena la nueva operacion
    else if (data.resultado !== '' && data.operacion === '' && esOperador) { 
      setData({...data, operacion:`${data.resultado}` + valor})
    }
    //toggle del signo +/-
    else if (valor === '+/-' && data.operacion !== '') {
      if (data.operacion.slice(0, 1) === '-') {
        setData({...data, operacion:`${data.operacion.slice(1, data.operacion.length)}`})
      } else {
        setData({...data, operacion:`-${data.operacion}`})
      }
    //en caso de no haber ningun error mostramos las operaciones
    } else {
      setData({
        ...data,
        operacion: `${data.operacion}` + valor
      })
    }

   
  }

  const eliminar = () => {
    setData({ ...data, operacion: data.operacion.slice(0, data.operacion.length - 1) })
  }

  const limpiar = () => {
    setData({ operacion: '', resultado: '' })
  }

  const resultado = () => {
    try {
      let resultado = ''
      //si la operacion es sacar porcentajes, destructuramos la cadena y la formatea para que eval realice correctamente la funcion
      if (data.operacion.includes('%')) {
        const valores = data.operacion.split('%')
        resultado = eval(`${valores[1]} *(${valores[0]}/100)`)
      } else {
       
        resultado = eval(data.operacion)
        console.log(resultado.toString());
      }
      setData({ ...data, resultado, operacion:''})
    } catch (error) {
      console.log(error);
      setData({ ...data, operacion: 'Error' })
    }
  }


  return (
    <main>


      <span className="resultado" >{data.resultado}</span>
      <span className="display">{data.operacion}</span>

      <Boton texto='C' clase='gris' handleClick={limpiar} />
      <Boton texto='+/-' clase='gris' handleClick={escritura} />
      <Boton texto='%' clase='gris' handleClick={escritura} />
      <Boton texto='/' clase='operacion' handleClick={escritura} />
      <Boton texto='7' clase='numero' handleClick={escritura} />
      <Boton texto='8' clase='numero' handleClick={escritura} />
      <Boton texto='9' clase='numero' handleClick={escritura} />
      <Boton texto='*' clase='operacion' handleClick={escritura} />
      <Boton texto='4' clase='numero' handleClick={escritura} />
      <Boton texto='5' clase='numero' handleClick={escritura} />
      <Boton texto='6' clase='numero' handleClick={escritura} />
      <Boton texto='-' clase='operacion' handleClick={escritura} />
      <Boton texto='1' clase='numero' handleClick={escritura} />
      <Boton texto='2' clase='numero' handleClick={escritura} />
      <Boton texto='3' clase='numero' handleClick={escritura} />
      <Boton texto='+' clase='operacion' handleClick={escritura} />
      <Boton texto='.' clase='numero' handleClick={escritura}/>
      <Boton texto='0' clase='numero' handleClick={escritura} />
      <Boton texto='◄' clase='numero' handleClick={eliminar} />
      <Boton texto='=' clase='numero' handleClick={resultado} />


    </main>
  )
}

export default Calculadora
