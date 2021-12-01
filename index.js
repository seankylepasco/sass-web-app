let data
let baseUrl = 'http://localhost/sass-web-app/api/'
const getRequest = async (url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    })
    return response.json()
}

getRequest(baseUrl+'tests', null)
    .then(
        result => {
            data = result.payload
            let dataholder = document.getElementById('dataholder')
            let htmlstring = ''
            for(let index=0; index < data.length; index++){
                let name = String(data[index].name)
                let id = String(data[index].id)
                htmlstring += "<div class='card container col' ><h1>"+name+"</h1>"
                +'<div class="row"> <button id="edit" onclick=openModal('+ id +')>edit</button> <button onclick=deleteData('+ id +')>remove</button> </div> </div>'
            }    
            dataholder.innerHTML = htmlstring
        }
    )
let object = {
    id: '',
    name: ''
}
let emptyobject = {
    id: '',
    name: ''
}
const insertData = () => {
    let name =  document.getElementById('name').value
    object.name = name
    object = JSON.stringify(object)
    getRequest(baseUrl+'insert', object)
    .then( result => { 
        closeModal('addmodal')
        window.location.reload()
        object = emptyobject
    })
}   

const updateData = () => {
    let name =  document.getElementById('editname').value
    object.name = name
    object.id = document.getElementById('id').value
    object = JSON.stringify(object)
    getRequest(baseUrl+'update', object)
    .then( result => {
        closeModal('editmodal')
        window.location.reload()
        object = emptyobject
    })
}

const deleteData = (id) => {
    getRequest(baseUrl+'delete/'+id, id)
    .then( result => {
        window.location.reload()
        object = emptyobject
    })
}