import { Meteor } from 'meteor/meteor';

var Future = Npm.require( 'fibers/future' ); 


Meteor.startup(() => {
  
});

Meteor.publish('sentotps', function(){  //publishing mongo collection data
	return otps.find({});
});

Meteor.methods({
    sendSMS : function(contact,body) {
    	var future = new Future();
    	var response = {}
	    twilio = Twilio("ACa778e98dbc521b00df12f806d2977eaa", "614dac9cd0cb8414f6c7dcdb02453966");
		twilio.sendSms({
			to: '+919971792703',  //recipient number
		    from: '+18583041279', // sender number in this case twilio one
		    body: body['val'] // sms content
		},Meteor.bindEnvironment(function(err, responseData) {
		    if (!err) { 
		    	var date = new Date();
		    	date.setHours(date.getHours()+5);
    			date.setMinutes(date.getMinutes() + 30);

		     	otps.insert({
			      	"name" : body['first_name']+ " " +body['last_name'],
			      	"contact_number" : body['contact_number'],
			      	"timestamp" : date.toJSON(),
			      	"otp" : body['otp']
			    });

			    response['method_success'] = true;
			    response['msg'] = "OTP Sent Successfully";
			    response['data'] = responseData;
			    future.return(response);
		    }else{
		    	response['method_success'] = false;
			    response['msg'] = "Error Sending OTP!! Please try again!!";
			    response['data'] = err;
			    future.return(response);
		    }   
		   	
		}));
		return future.wait();  //wait till function completes its execution 
    }
});


