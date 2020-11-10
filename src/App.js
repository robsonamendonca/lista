import './App.css';
import {useState, useEffect} from 'react';

function App() {

 const [tarefas, setarTarefas] = useState([
    /* {
       id:0,
       tarefa: 'Minha tarefa 1',
       finalizada: false
     },
     {
       id:0,
       tarefa: 'Minha tarefa 2',
       finalizada: true
     },
     */ 
 ]);
 const [modal, setModal] = useState(false);

 const salvarTarefa = () => {
    //TODO: salva a tarefa
    var tarefa = document.getElementById('content-tarefa');
    
    setarTarefas([
       ...tarefas, 
       {
         id:  new Date().getTime(),
         tarefa: tarefa.value,
         finalizado: false
       }  
    ]);
    window.localStorage.setItem('tarefas',JSON.stringify([
       ...tarefas, 
       {
         id:  new Date().getTime(),
         tarefa: tarefa.value,
         finalizado: false
       }          
    ]));
    setModal(false);
 }
 
 const marcarConcluida = (id) => {
    let novasTarefas = tarefas.filter(function(val){
        if(val.id === id ){
           val.finalizada = true; 
        }
        return val;
    })
  
    setarTarefas(novasTarefas);
    window.localStorage.setItem('tarefas',JSON.stringify(novasTarefas));
 }
 
 const abrirModal = () => {
    setModal(!modal);
 }
 
 // const limpaDados = ()=> {
   // if(window.confirm("Deseja realmente limpar a lista?")){
       // window.localStorage.clear();   
   // }
   
 // }
 
 useEffect( ()=> {
    //Fazer uma chamada para API e preencher o estado de tarefas
    if(window.localStorage.getItem('tarefas') !== undefined){
       setarTarefas(JSON.parse(window.localStorage.getItem('tarefas')));
       console.log(window.localStorage.getItem('tarefas'));
    }
 },[])

  return (
    <div className="App">
      {
         modal?
         <div className="modal"> 
             <div className="modalContent">
                <h3> Adicionar sua tarefa:</h3>
                <input type="text" id="content-tarefa" />
                <buttom onClick={()=>salvarTarefa()}>Salvar</buttom>
             </div>
          </div>
          :
          <div></div>
      }
    
      <div onClick={()=>abrirModal()} className="addTarefa">+</div>
      {/* <div onClick={()=>limpaDados()} className="delTarefa">x</div>  */}
      
      <div className="boxTarefas">
         <h2> Minhas Tarefas do Dia! </h2>
         {
             tarefas.map((val)=> {
                 if(!val.finalizada){
                    return (
                      <p onClick={()=>marcarConcluida(val.id)}>{val.tarefa}</p>
                    );
                 }else {
                    return (
                       <p style={{textDecoration: 'line-through'}}>{val.tarefa}</p>
                    );
                 }     
              })                     
         }
      </div>
    </div>
  );
}

export default App;
