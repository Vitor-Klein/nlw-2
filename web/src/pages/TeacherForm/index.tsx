import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'

import Input from '../../components/input';
import PageHeader from '../../components/page-header';
import Textarea from '../../components/Textarea'
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'
import api from '../../services/api';


function TeacherForm()  {
  const history = useHistory()

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')
  
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from:'', to: ''}
  ])

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems, 
      { week_day: 0, from:'', to: ''}
    ])
  }

  function setScheduleItemValue(position: number, field: string, value: string) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if(index === position){
        return {...scheduleItem, [field]: value }
      }

      return scheduleItem

      
    })
    setScheduleItems(updatedScheduleItems)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api.post('classes', {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() => {
      alert('Cadastro realizado com sucesso!')

      history.push('/')
    }).catch(() => {
      alert('errono codastro!')
    })
  }

  return(
    <div id="page-teacher-form" className="container">
      <PageHeader 
        title="Que incrivel que voce quer dar aulas"
        description="O primeiro passo é preencher esse formulario de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input 
              name="name" 
              label="Nome completo" 
              value={name} 
              onChange={(e) => { setName(e.target.value) }} 
            />
            <Input 
              name="avatar" 
              label="Avatar"
              value={avatar} 
              onChange={(e) => { setAvatar(e.target.value) }} 
            />
            <Input 
              name="whatsapp" 
              label="Whatsapp"
              value={whatsapp} 
              onChange={(e) => { setWhatsapp(e.target.value) }} 
            />
            <Textarea 
              name="bio" 
              label="Biografia"
              value={bio} 
              onChange={(e) => { setBio(e.target.value) }} 
            />
        </fieldset>

        <fieldset>
            <legend>Sobre a aula</legend>

            <Select 
              name="subject" 
              label="Materia" 
              value={subject} 
              onChange={(e) => { setSubject(e.target.value) }} 
              options={[
                { value: 'Artes', label: 'Artes' },
                { value: 'Biologia', label: 'Biologia' },
                { value: 'Ciencias', label: 'Ciencias' },
                { value: 'Educação fisica', label: 'Educação fisica' },
                { value: 'Fisica', label: 'Fisica' },
                { value: 'Geografia', label: 'Geografia' },
                { value: 'Historia', label: 'Historia' },
                { value: 'Matematica', label: 'Matematica' },
                { value: 'Portugues', label: 'Portugues' },
                { value: 'Quimica', label: 'Quimica' },
              ]}
            />
            <Input 
              name="cost" 
              label="Custo da sua hora por aula"
              value={cost} 
              onChange={(e) => { setCost(e.target.value) }}  
            />
        </fieldset>

        <fieldset>
          <legend>
            Horarios Disponiveis
            <button type="button" onClick={addNewScheduleItem}>
              + Novo horario
            </button>
          </legend>

          {scheduleItems.map((scheduleItem, index) => {
            return (
              <div key={scheduleItem.week_day} className="schedule-item">
              <Select 
                name="week_day" 
                label="Dia da semana" 
                value={scheduleItem.week_day}
                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                options={[
                  { value: '0', label: 'Domingo' },
                  { value: '1', label: 'Segunda-feira' },
                  { value: '2', label: 'Terça-feira' },
                  { value: '3', label: 'Quarta-feira' },
                  { value: '4', label: 'Quinta-feira' },
                  { value: '5', label: 'Sexta-feira' },
                  { value: '6', label: 'Sabado' },
                ]}
              />

              <Input 
                name="from" 
                label="Das" 
                type="time"
                value={scheduleItem.from}
                onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
              /> 

              <Input 
                name="to" 
                label="Até" 
                type="time"
                value={scheduleItem.to}
                onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
              />

            </div>
            )
          })}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="aviso importante"/>
            Importante! <br />
            Preencha todos os dados
          </p>
          <button type="submit">
              Salvar cadastro
          </button>
        </footer>
       </form>
      </main>
    </div>
  );
}

export default TeacherForm;