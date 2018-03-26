
var NotifyClient = require('notifications-node-client').NotifyClient,
  notifyClient = new NotifyClient('waterabstraction-2232718f-fc58-4413-9e41-135496648da7-560a8a5d-0db4-42c9-946e-dbef158763e5');
var templateId = '79cd80a6-5ccd-4a11-881d-36a2633d22c2';
var personalisation = {};

notifyNumbers = [];
notifyNumbers.push('***REMOVED***'); // Me
notifyNumbers.push('***REMOVED***'); // Andrew
// notifyNumbers.push('***REMOVED***') ***REMOVED***
notifyNumbers.push('***REMOVED***'); // nick
notifyNumbers.push('***REMOVED***'); // kate
notifyNumbers.push('***REMOVED***'); // ash
// notifyNumbers.push('***REMOVED***') ***REMOVED***

for (n in notifyNumbers) {
  console.log(notifyNumbers[n]);

  notifyClient
  	.sendSms(templateId, notifyNumbers[n], {})
  	.then(response => console.log(response))
  	.catch(err => console.error(err))
  ;
}
