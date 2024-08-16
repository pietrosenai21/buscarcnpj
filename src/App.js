   //bloco de importação de código 
   import { useState } from "react"; //usoState é um book de react
   import { FiSearch } from "react-icons/fi"; 
   import './style.css'; //importando o estilo da pagina
   import api from "./services/api" //importando api
   
   function App() { 
   
     const [input, setInput] = useState(''); //Serve para pegarmor o valor atual e atualizarmos 
     const [cnpj, setCNPJ] = useState ({}); //objeto variavel, recebendo via api
   
     async function handleSearch(){
   
       if(input === ''){ //verificando se o usuario preencheu o campo de CNPJ
     alert("Preencha algum CNPJ!") //se tiver vazio aparecerá esse aviso
     return; //retorna o erro 
       } 
   
     try{ // retorna o que o usuario quer que aconteça
     const response = await api.get(`${input}`) //receber valor de api,CNPJ
     setCNPJ (response.data) // guarda a variavel
     setInput ("") //faz zerar o valor de imput
   }catch{ //responsável para validar ou da uma informação de um erro
     alert("Erro ao buscar CNPJ!")
     setInput ("")
     }
   
       }
       return ( // feito para dar retorno
         <div className="container">
         <h1 className="title">Consultar CNPJ  </h1>
         
         <div className="containerInput">
         <input
           type="text"// informa o texto
           placeholder="Digite seu CNPJ..." // pede para o usuario digitar
           value={input} // dar valor
           onChange={(e) => setInput (e.target.value)}//faz a captura de tudo que for digitado 
           />
           <button className="buttonSearch" onClick={handleSearch}> 
             <FiSearch size={25} color= "#FFF" /> 
           </button>
           </div>
   
           {Object.keys(cnpj).length > 0 && (// ele verifica se tem algum objetivo no cnpj, se nAO tiver ele não vai aparecer nada
             <main className="main">
               <h2>Razão Social: {cnpj.razao_social}</h2>
               <span> Fundação: {cnpj.data_inicio_atividade}</span>
               <span> Situação: {cnpj.descricao_situacao_cadastral}</span>
               <span> Contato: {cnpj.ddd_fax}</span>
             </main>
           )}
           </div> //acaba a div
     );
   }
   
   export default App;//faz a exportação do app e da informação se ela foi exportada ou nao importada
