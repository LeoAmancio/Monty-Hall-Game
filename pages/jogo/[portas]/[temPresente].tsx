import styles from "../../../src/styles/Jogo.module.css";
import { useEffect, useState } from "react"
import Porta from "../../../src/components/Porta"
import { atualizarPortas, criarPortas } from "../../../src/functions/portas"
import Link from "next/link"
import { useRouter } from "next/router";
export default function jogo() {
    const router = useRouter()

    const [valido, setValido] = useState(false)
    const [portas, setPortas] = useState([])
    
    useEffect(() => {
      const portas = +router.query.portas
      const temPresente = +router.query.temPresente

      const qtdePortasValida = portas >= 3 && portas <= 100
      const temPresenteValido = temPresente >=1 && temPresente <= portas

      setValido(qtdePortasValida && temPresenteValido)

    }, [portas])


    useEffect(() => {
      const portas = +router.query.portas
      const temPresente = +router.query.temPresente
      setPortas(criarPortas(portas, temPresente))

    }, [router?.query])


  function renderizarPortas() {
    return portas.map(porta => {
      return <Porta key={porta.numero} value={porta} 
      onChange={novaPorta => { setPortas(atualizarPortas(portas, novaPorta))}}/>
    })
  }



    return (
      <div className={styles.jogo}>
          <div className={styles.portas}>
            {renderizarPortas()}
          </div>
          <div className={styles.botoes}>
             <Link href="/">
                 <button>Reiniciar jogo</button>
             </Link>
          </div>
      </div>
    )
}