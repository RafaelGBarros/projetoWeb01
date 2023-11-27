const getSpell = async (spellName) =>{
    //const spellName = document.querySelector('#spellName')

    const divResult = document.querySelector('#result')
    const divTitle = document.querySelector('#title')
    const divClasses = document.querySelector('#classes')
    const divDesc = document.querySelector('#desc')
    const divNav = document.querySelector('#nav')
    const divRequest = document.querySelector('#requestArea')
    const divInicialText = document.querySelector('#incialText')

    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${spellName}`, {
        method: 'GET'
    })
    

    console.log(spellName.value)//teste de entrada

    if(response.ok){
        const data = await response.json()
        console.log(data)
            
        divTitle.innerHTML = ''
        divClasses.innerHTML = ''
        divDesc.innerHTML = ''
        divNav.innerHTML = ''
        divRequest.innerHTML = ''
        divInicialText.innerHTML = ''


        divTitle.innerHTML = `<h2>${data.name}</h2>`

        data.classes.map((classe)=>{
            divClasses.innerHTML += `
            <div id="resultClass" style="display: flex; flex-direction: row;">
            <a id="tagClass" style="width: max-content; cursor: pointer;" onclick="getClassInfo('${classe.index}');">${classe.name}</a>
            </div>
        ` 
        })
        divDesc.innerHTML = `<p>${data.desc}</p>`
        divNav.innerHTML = `<button class="cleanAll" onclick="backAll()">Voltar ao inicio</button>`


    } else {
        if(response.status === 404){
            divResult.innerHTML = `
            <p>Parece que ainda nao deciframaos esta magia!</p>
            <button class="cleanAll" onclick="backAll()">Voltar ao inicio</button>
            `
            
        } else {
            divResult.innerHTML = '<p>Erro na requisição...</p>'
        }
    } 
}


const getClassInfo = async (classIndex) =>{
    //const spellName = document.querySelector('#spellName')

    const divResult = document.querySelector('#result')
    const divTitle = document.querySelector('#title')
    const divClasses = document.querySelector('#classes')
    const divDesc = document.querySelector('#desc')
    const divNav = document.querySelector('#nav')
    const divRequest = document.querySelector('#requestArea')
    const divInicialText = document.querySelector('#incialText')



    const response = await fetch(`https://www.dnd5eapi.co/api/classes/${classIndex}/spells`, {
        method: 'GET'
    })
    

    console.log(classIndex)

    if(response.ok){
        const data = await response.json()
        console.log(data)
            
        divTitle.innerHTML = ''
        divClasses.innerHTML = ''
        divDesc.innerHTML = ''
        divNav.innerHTML = ''
        divRequest.innerHTML = ''
        divInicialText.innerHTML = ''

        let spellsOfClass = {

        }

        data.results.map((spell)=>{
            spellsOfClass += spell.name

        })
        divTitle.innerHTML = classIndex

        console.log(spellsOfClass)


        divDesc.innerHTML = `
        
        <label for="spellList">Escolha uma lista de ${classIndex}</label>
        <select id="spellList">
        ${
            spellsOfClass.map((spell)=>{
                `<option> ${spell.index} </option>`

            })

        }
        
        </select>
        `

        divNav.innerHTML = `<button class="cleanAll" onclick="backAll()">Voltar ao inicio</button>`

    } else {
        if(response.status === 404){
            divResult.innerHTML = `
            <p>Parece que ainda nao deciframaos esta magia!</p>
            <button class="cleanAll" onclick="backAll()">Voltar ao inicio</button>
            `
            
        } else {
            divResult.innerHTML = '<p>Erro na requisição...</p>'
        }
    } 
}























const backAll = () => {
    location.reload()
}
