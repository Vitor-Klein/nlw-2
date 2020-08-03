import React from 'react'

import whatsappIcon from '../../assets/images/icons/whatsapp.svg'
import "./styles.css"

function TeacherItem() {
  return(
    <article className="teacher-item">
          <header>
            <img src="https://avatars0.githubusercontent.com/u/57869377?s=460&u=5d31347c073fd89d97a0065c1772edeba48def10&v=4" alt="Vitor Klein"/>
            <div>
              <strong>Vitor Hugo Klein</strong>
              <span>Quimica</span>
            </div>
          </header>

          <p>
            texto explicativo sobre a 
            <br/> <br/>
            minah carreira enquento professor de quimica
          </p>

          <footer>
            <p>Preço por hora:
            <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="whatsapp"/>
              Entrar em contato
            </button>
          </footer>
        </article>
  )
}

export default TeacherItem
