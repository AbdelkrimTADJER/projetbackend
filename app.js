const express = require('express')
const morgan=require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Tasks = require('./Tasks')
const { render } = require('ejs')
const moment = require('moment');



const app = express()
app.set('view engine', 'ejs')
const dbURI = 'mongodb+srv://krimou:tadjer2005@nodetust.ncpkugy.mongodb.net/projet?retryWrites=true&w=majority&appName=nodetust'
mongoose.connect(dbURI)
 .then((result)  => app.listen(3000))
 .catch((err) => console.log(err))

app.use(morgan('tiny'))
app.use(express.urlencoded())

app.get('/reminder', function (req, res) {
  
    res.render('reminder')}
)

app.get('/tasks', function (req, res) {
    Tasks.find()
    
    .then((result) => {
      res.render('Tasks', {tasks : result })
    })
    .catch((err)=> {
      console.log(err)
    });  
    })



app.post('/addtask', function (req, res) {
    
        const task = new Tasks(req.body)
        task.save()
        .then((result) => {
          res.redirect('/tasks')
        })
        .catch((err)=> {
          console.log(err)
        });
      })   
  
  
app.post('/edit/:taskId', function(req, res) {

  const taskId = req.params.taskId;
  const update = req.body; 

  
  Tasks.findByIdAndUpdate(taskId, update)
      .then(() => {
          
          res.redirect('/tasks');
      })
      .catch((err) => {
          console.error(err);
          res.status(500).send("Une erreur s'est produite lors de la modification de la tâche.");
      });
});

app.post('/delete/:taskId', function(req, res) {
  const taskId = req.params.taskId;

  
  Tasks.findByIdAndDelete(taskId)
      .then(() => {
         
          res.redirect('/tasks');
      })
      .catch((err) => {
          
          console.error(err);
          res.status(500).send("Une erreur s'est produite lors de la suppression de la tâche.");
      });
});
    
                
       


app.post('/remind', (req, res) => {
    const { email, sujet, heure } = req.body;
    let contenu = ["c est le monment de", sujet];

    const transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'relievo0projet2cp@outlook.com', // Votre adresse e-mail
            pass: 'benslimane0' // Votre mot de passe e-mail
        }
    });

    if (!email || !sujet || !heure) {
        return res.status(400).json({ message: 'Veuillez fournir toutes les données requises.' });
    }

    // Convertir l'heure spécifiée en objet Date avec Moment.js
    const heureRappel = moment(heure, 'HH:mm').toDate();
    
    if (!moment(heureRappel, 'HH:mm', true).isValid()) {
        return res.status(400).json({ message: 'Veuillez fournir une heure valide au format HH:mm.' });
    }

    const maintenant = Date.now();
    const tempsJusqueHeureRappel = heureRappel.getTime() - maintenant;

    const mailOptions = {
        from: 'relievo0projet2cp@outlook.com',
        to: email,
        subject: sujet,
        text: contenu
    };

    const rappel = setTimeout(() => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Une erreur est survenue lors de l\'envoi de l\'e-mail.' });
            } else {
                console.log('E-mail envoyé: ' + info.response);
                return res.status(200).json({ message: 'E-mail envoyé avec succès.' });
            }
        });
    }, tempsJusqueHeureRappel);

    res.status(201).json({ message: 'Rappel enregistré avec succès.' });
});


        