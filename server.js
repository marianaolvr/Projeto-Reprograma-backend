const express = require('express')
const server = express()
const controller = require('./reclamacoesController')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
// const client = require('rest-client')
// const json = require ('json')
const PORT = process.env.PORT || 3003

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (request, response) => {
  response.send('./')
})

const config = {
  host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: '2eb62da7bda58c',
      pass: '53ac1342852912' //this is a var stored in heroku, i dont recommend keeping a password string here
    }
}

const transporter = nodemailer.createTransport(config)

server.get("/reclamacoes", async (request, response) => {
  controller.getAll()
    .then(listaDeReclamacoes => response.send(listaDeReclamacoes))
})

server.post("/reclamacoes/send-email", (request, response) => {
  controller.add(request.body)
    .then(listaDeReclamacoes => response.send(listaDeReclamacoes))

  var body = request.body;
  var nomeCompleto = body.nomeCompleto;
  var instituicaoEnsino = body.instituicaoEnsino;
  var endereco = body.endereco;
  var email = body.email;

  var composedMessage = {
    text: 'Caro Ministro da Educação, \n\n' +
      `Eu, ${nomeCompleto} venho informar que a instituição de ensino ${instituicaoEnsino}, localizada no endereço ${endereco}, 
      descumpre a Lei Nº 11.645, de 10 de março de 2008, que obriga o ensino de história e cultura afro-brasileira, africana e 
      indígena e as lutas destes povos no Brasil. \n` +
      
      `Entendo que o descumprimento da lei empobrece o entendimento dos alunos sobre a cultura e a formação do País, fortalecendo 
      preconceitos e estigmas. Sendo a educação a base de toda sociedade, considero de extrema importância que a instituição citada 
      seja notificada e instruída a adequar seu currículo escolar.\n` +
      
      `Com a certeza de que o Ministério da Educação tem grande interesse em fazer valer a letra da lei federal, desde já agradeço o 
      esforço em fazer do Brasil um país justo e que valoriza a própria história e seu povo. \n\n`,
      subject: 'Escola não cumpre a Lei Federal 11.645'
  };

  transporter.sendMail({
    from: `${email}`,
    to: 'olvr.mariana@gmail.com',
    subject: composedMessage.subject,
    text: composedMessage.text
  }, (error, info) => {
    if(error){
      return response.status(400).send('falhou')
   }

   return response.status(200).send('enviou')
})

return response.sendStatus(200).end()
});

// response = RestClient.Resource.new("https://mailtrap.io/api/v1/inboxes.json?api_token=#{ENV['e1da925188bbca3e061a3cc315943edc']}").get

// first_inbox = JSON.parse(response)[0]

//   mailer.Base.delivery_method = smtp
//   mailer.Base.smtp_settings = {

// user_name = () => first_inbox['username'],
// password = () => first_inbox['password'],
// address = () => first_inbox['domain'],
// domain =() => first_inbox['domain'],
// port = () => first_inbox['smtp_ports'][0],
// authentication = () => plain
// }



server.listen(PORT)
console.info(`Rodando na porta ${PORT}`)



