app.post('/remind', (req, res) => {
          const {email, sujet, heure,  contenu } = req.body;
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            
            auth: {
              user: 'relievo0projet2cp@gmail.com', // Votre adresse e-mail
              pass: 'benslimane' // Votre mot de passe e-mail
            }
          });
        
          
          if (!email || !sujet || !heure || !contenu) {
            return res.status(400).json({ message: 'Veuillez fournir toutes les données requises.' });
          }
        
          
          const heureRappel = new Date(heure);
        
          
          const mailOptions = {
            from: 'relievo0projet2cp@gmail.com',
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
          }, heureRappel - Date.now());
        
          
          res.status(201).json({ message: 'Rappel enregistré avec succès.' });
        });