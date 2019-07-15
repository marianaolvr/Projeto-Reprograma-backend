const {connect} = require('./reclamacoesRepository')
const reclamacoesModel = require('./reclamacoesSchema')

connect()

const getAll = async () => {
    return reclamacoesModel.find((error, reclamacoes) =>{
        if(error){
            console.error(error)
        }
        return reclamacoes
    })
}

const add = (reclamacao) => {
    console.log(reclamacao)
    const novaReclamacao = new reclamacoesModel(reclamacao)
    return novaReclamacao.save()
  }

module.exports = {
getAll,
add
}

