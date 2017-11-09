


var NotifyClient = require('notifications-node-client').NotifyClient,
 notifyClient = new NotifyClient('waterabstraction-2232718f-fc58-4413-9e41-135496648da7-560a8a5d-0db4-42c9-946e-dbef158763e5');
 var templateId='79cd80a6-5ccd-4a11-881d-36a2633d22c2'
 var personalisation={}

notifyNumbers=[];
notifyNumbers.push('+447446880860') //Me
notifyNumbers.push('+447468702418') //Andrew
//notifyNumbers.push('+447920460573') //Russell
notifyNumbers.push('+447824548299') //nick
notifyNumbers.push('+447506122166') //kate
notifyNumbers.push('+447468715721') //ash
//notifyNumbers.push('+447825853402') //Clare



for (n in notifyNumbers){
  console.log(notifyNumbers[n])

  notifyClient
  	.sendSms(templateId, notifyNumbers[n], {})
  	.then(response => console.log(response))
  	.catch(err => console.error(err))
  ;

}
