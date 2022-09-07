const urlBase = "https://api.github.com/users/";
let form = document.getElementById("formulario");

const request = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const getUser = async (user) => {
    const url = urlBase + user;
    let resultado = await request(url);
    return resultado;
};

const getRepo = async (user, pagina, cantidadRepos) => {
    const url = urlBase + user + "/repos?page=" + pagina + "&per_page=" +
            cantidadRepos;
    let resultado = await request(url);
    return resultado;
};

form.addEventListener("submit", async (event) => {
    event.preventDefault()

    let user = document
        .getElementById("nombre")
        .value
    let pagina = document
        .getElementById("pagina")
        .value;
    let cantidadRepos = document
        .getElementById("repoPagina")
        .value;

    Promise
        .all([
            getUser(user),
            getRepo(user, pagina, cantidadRepos)

        ])
        .then((respuesta) => {
            let array = "";
            respuesta[1].forEach((resultado) => {
                array += `<p><a href="${resultado.html_url}" target="_blank">${resultado.name}</a></p>`
            })
            document
                .getElementById("resultados")
                .innerHTML = `<div class="col text-left">
                <h4>Datos de Usuario</h4>
                <img class="img-fluid" src ="${respuesta[0]
                .avatar_url}"/>
                <p>Nombre de Usuario: "${respuesta[0]
                .name}"</p>
                <p>Nombre de Login: "${respuesta[0]
                .login}"</p>
                <p>Cantidad de Repositorios: "${respuesta[0]
                .public_repos}"</p>
                <p>Localidad: "${respuesta[0]
                .location}"</p>
                <p>Tipo de Usuario: "${respuesta[0]
                .type}"</p>
                </div>
                <div class="col text-right">
                <h4>Nombre de repositorios</h4>
                <ul>${array}</ul>
                </div>`
        })
        .catch(error => {
            alert("Usuario no existe")
        })
    });