
// addEventListener é uma funcao que é usada para escutar/ouvir eventos(nesse cado o evento -> DOMContentLoaded) que ocorrem em um Element(nesse caso o elemento -> document)

// document representa toda a estrutura da pagina HTML, assim podemos adicionar eventos, alterar estilo..

//  DOMContentLoaded é um evento que é disparado quando a estrutura da página HTML for carregada


document.addEventListener("DOMContentLoaded", function () {

    //acessando o id taskInput declarado no HTML
    const taskInput = document.getElementById("taskInput");
    console.log(taskInput);

    //acessando o id addTaskButton declarado no HTML
    const addTaskButton = document.getElementById("addTaskButton");
    console.log(addTaskButton)

    //acessando o id taskList declarado no HTML
    const taskList = document.getElementById("taskList");
    console.log(taskList);


    // função callback para adicionar a tarefa
    // o codigo que está dentro dela será executado assim que o evento DOMContentLoaded for disparado
    function addTask() {
        // aqui estamos amazenando o valor declarado no input
        // a funcao trim remove todos os espaços em branco. Isso ajuda a evitar que o usuário adicioine tarefas compostas apenas por espaço em branco
        const taskText = taskInput.value.trim();

        // condição para evitar tarefa vazia
        if (taskText === "") return;


        // aqui estamos adicionando um elemento <li> e atribuindo a ele uma classe (task-item)
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");

        // aqui estamos criando um elemento <span> que vai conter o texto da tarefa, e atribuimos a ele uma classe(task-text). Esse span contento o texto é atribuido ao item <li> 
        const taskTextSpan = document.createElement("span");
        taskTextSpan.classList.add("task-text");
        taskTextSpan.textContent = taskText;


        // aqui estamos criando um elemento <button>, depois declaramos um nome para botao e depois adicionamos a ele uma classe
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-button");


        const statusTarefa = document.createElement("button");
        statusTarefa.textContent = "Pendente";
        statusTarefa.classList.add("status-tarefa");



        // appendChild é um metodo para adicionar um elemento filho a outro elemento no DOM
        // Nesse caso o taskTextSpan(elemento filho) é adicionado ao elemento taskItem(elemento pai) assim segue para os outros elemento filho que precisam ser adicinoado na lista

        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(statusTarefa);
        taskItem.appendChild(deleteButton);
        

        // nesse caso estamos adicinando os itens do elemento <li> dentro da <ul>
        taskList.appendChild(taskItem);

        // limpando o campo 
        taskInput.value = "";


        // evento para marcar a tarefa como concluída
        // Nesse caso a funcao addEventListener "escuta" do evento clik no elemento taskTextSpan
        // O método classList.toggle("completed") adiciona a classe "completed" ao elemento se ela não estiver presente e a remove se ela já estiver presente.
        // essa ação ocorre quando ha um click acionando a função anônima 
        taskTextSpan.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
        });

        // Evento para remover a tarefa
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(taskItem);
        });

        // Evento para altarar o texto do status da tarefa
        statusTarefa.addEventListener("click", function(){
            statusTarefa.textContent = ("feito");
        })


    }


    // adicionando tarefa a lista
    // nesse caso fica fora da função pq só precisam ser configurada uma vez.Aguardando um clique ou o a tecla enter ser pressionada 
    addTaskButton.addEventListener("click", addTask);

});