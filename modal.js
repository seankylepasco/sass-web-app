let editmodal = document.getElementById('editmodal')
let addmodal = document.getElementById('addmodal')

const closeModal = (buttonname) => {
    if(buttonname === 'editmodal'){
        editmodal.style.display = 'none'
    }
    else{
        addmodal.style.display = 'none'
    }
}

const openModal = (value) => {
    if(value === 'addmodal'){
        addmodal.style.display = 'block'
    }
    else{
        editmodal.style.display = 'block'
        document.getElementById('id').value = value
    }
}


window.onclick = function(event) {
    if (event.target == editmodal) {
        editmodal.style.display = "none"
    }
    if (event.target == addmodal){
        addmodal.style.display = "none"
    }
}