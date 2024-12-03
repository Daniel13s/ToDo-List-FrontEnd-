import fetchImages from "./fetchApis.js";

const tarefas = document.getElementById("tarefas");


async function displayTarefas() {
    const data = await fetchImages();
        try {
            const tarefaList = data.map(item => {
              if(item.status==true){
                return `
                <tr>
                  <td><h2>${item.name}</h2></td>
                  <td><p>ID: ${item._id}</p></td>
                  <td>Feito</td>
                </tr>
              `
              } else {
                return `
                <tr>
                  <td><h2>${item.name}</h2></td>
                  <td><p>ID: ${item._id}</p></td>
                  <td>Pendente</td>
                </tr>
              `
              }
            }).join('');
            tarefas.insertAdjacentHTML('beforeend', tarefaList);

        } catch (error) {
            console.error("Erro ao popular página", error);
        };
};

document.addEventListener("DOMContentLoaded", displayTarefas);

const formCriar = document.getElementById('updateFormCriar');

formCriar.addEventListener('submit', (event) => {

  const name = document.getElementById('nameCriar').value;
  var feitocriar = document.getElementById('feitoCriar');
  const status = feitocriar.checked;

  fetch(`https://todo-list-backend-production-3705.up.railway.app/tarefas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, status })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Exibir mensagem de sucesso ou erro para o usuário
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

const formAtualizar = document.getElementById('updateFormAtualizar');

formAtualizar.addEventListener('submit', (event) => {

  var feitoAtualizar = document.getElementById('feitoAtualizar');
  const idAtualizar = document.getElementById('idAtualizar').value;
  const status = feitoAtualizar.checked;

  fetch(`https://todo-list-backend-production-3705.up.railway.app/tarefas/${idAtualizar}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Exibir mensagem de sucesso ou erro para o usuário
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

const formDeletar = document.getElementById('updateFormDeletar');

formDeletar.addEventListener('submit', (event) => {
  
  const idDeletar = document.getElementById('idDeletar').value;

  fetch(`https://todo-list-backend-production-3705.up.railway.app/tarefas/${idDeletar}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, status })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Exibir mensagem de sucesso ou erro para o usuário
  })
  .catch(error => {
    console.error('Error:', error);
  });

});

var botaoCriar = document.getElementById("botaoCriar")
var botaoAtualizar = document.getElementById("botaoAtualizar")
var botaoDeletar = document.getElementById("botaoDeletar")

botaoCriar.addEventListener('click', funcaoCriar);

function funcaoCriar() {
  formCriar.style.display = "flex"
  formAtualizar.style.display = "none"
  formDeletar.style.display = "none" 
}

botaoAtualizar.addEventListener('click', funcaoAtualizar);

function funcaoAtualizar() {
  formCriar.style.display = "none"
  formAtualizar.style.display = "flex"
  formDeletar.style.display = "none"
}

botaoDeletar.addEventListener('click', funcaoDeletar);

function funcaoDeletar() {
  formCriar.style.display = "none"
  formAtualizar.style.display = "none"
  formDeletar.style.display = "flex"
}
