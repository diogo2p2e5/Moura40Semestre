
import './App.css'
import editIcon from "../src/assets/editIcon.svg"
import trashIcon from "../src/assets/tabler_trash.svg"
import { use, useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  //States / variaveis
  const [tasklist, setTasklist] = useState([])
  const [taskValue, setTaskValue] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [idToEdit, setIdToEdit] = useState(0)



  //funções
  //CRUD - Post Get Put/Patch Delete



  // Get - busca todas tarefa
  const getTasks = async () => {
    try {
      //Retorna  a requisição (header/body data)
      const APIReturn = await axios.get("http://localhost:3000/taskpoint")
      const APIData = await APIReturn.data
      // atualizar o state
      setTasklist(APIData)

    } catch (error) {
      console.log(error);

    }
  }

  // Get {id} - busca uma tarefa por id
  const getTasksById = async (id) => {
    alert(`Função getTasksById em desenvolvimento ${id}`)
  }

  // Post - cadastra uma tarefa
  const postTask = async (e) => {
    e.preventDefault()
    //valida o state/formulario
    if (taskValue.trim().length == 0) {
      alert("Preencher o campo valor")
      return false
    }
    try {
      const APIreturn = await axios.post("http://localhost:3000/taskpoint", {
        descricao : taskValue

      })
      //limpar campo de formulario
      setTaskValue("")
      getTasks()
    } catch (error) {
      console.log(error);
      

      alert("Erro ao cadastrar")
    }

  }

  // Put - Pré editar a tarefa
  const putTasks = (item) => {
    setEditMode(true)
    setIdToEdit(item.id)
    setTaskValue(item.descricao)


  }
  // Put - atualiza uma tarefa
  const confirmPutTask = async (e) => {
    e.preventDefault()
    if (taskValue.trim().length == 0) {
      alert("Preencha a descrição da tarefa");
      return false
    }
    try {
      const APIReturn = await axios.put(`http://localhost:3000/taskpoint/${idToEdit}`, {descricao : taskValue}) 
      setIdToEdit(0)
      setTaskValue("")
      setEditMode(false)
      alert("A tarefa foi editada")
      getTasks();

    } catch (error) {
      alert("Erro ao editar")
      console.log(error);
      
    }    
  }
  
  // Delete - apaga uma tarefa
  const deleteTask = async (id) => {
    //perguntar ao usuario se quer excluir
    const querexcluir = confirm("Atenção: quer realmente excluir op registro ")
    if (!querexcluir) return false;

     try {
      const APIreturn = await axios.delete(`http://localhost:3000/taskpoint/${id}`, {
        descricao : taskValue
      })
      alert("Tarefa excluida com sucesso")
      getTasks()
    } catch (error) {
      console.log(error);
      

      alert("Erro ao deletar")
    }

  }

  //effects 
  //ciclo de vida do componente
  //onMount - quando o componente for montado
  useEffect(() => {
    //carrega os dados quando o componente for montado
    getTasks()

  }, [])





  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>
      <main className="body-section">
        <form className="cad-task" onSubmit={editMode ? confirmPutTask : postTask}>
          <input
            className="card-task__entry"
            type="text"
            placeholder="Adicione uma tarefa"
            value={taskValue}
            onChange={(e) => {
              //atualiza o valor do state
              setTaskValue(e.target.value)
            }}
          />
          {/*o paragrafo é só para ver o valor do state, vamos apagar!!*/ }
          <p>{taskValue}</p>

          <button className="card-task__btn-confirm">Adicionar</button>
             
             {
               editMode && <button 
               className="card-task__btn-confirm"
               type="button"
               onClick={() => {
                //zera os states responsáveis pela edição e então some com o botão
                setTaskValue("")
                setIdToEdit(0)
                setEditMode(false)
               }}
               >Cancelar</button>
             }

        </form>
        <section className="card-list">

          {
            tasklist.map((t) => {
              return (
                <article className="cardtask" key = {t.id}>
                  <p className="card">
                    {t.descricao}
                  </p>
                  <div className="cardtask__icon-box">

                    <div className="cardlist__icon">
                      <img
                        src={editIcon}
                        className="cardlist__edit-icon"
                        alt="imagen de um lápis. Função de editar a tarefa"
                        onClick={() => {
                          //variável "t" é o item/objeto completo
                          putTasks(t)
                        }}
                      />

                    </div>

                    <div className="cardlist__icon">
                      <img
                        src={trashIcon}
                        className="cardlist__delete-icon"
                        alt="imagem de uma lixeira. Função de excluir a tarefa"
                        onClick={() => {
                          deleteTask(t.id)
                        }}
                      />

                    </div>

                  </div>

                </article>
              )
            })
          }



        </section>
      </main>

      <footer className="footer-list">
        <p className="footer-list__right-text">2026, React LIst - todos os direitos reservados</p>
      </footer>

    </>
  );
}

export default App
