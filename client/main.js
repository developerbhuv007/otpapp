Template.OtpsList.onCreated(function(){  // subscribing mongo collection to fetch data from
	var self = this;
	self.autorun(function() {
		self.subscribe('sentotps');
	});
});


Template.OtpsList.helpers({   // helper to fetch the otps list order by timestamp in descending order
	otps: ()=> {
		return otps.find({},{sort:{timestamp:-1}});	
	}	
});

Template.OtpsList.helpers({   // helper to get the count of sent otps records
	otpscount: ()=> {
		return otps.find({}).count();
	}
});

Template.registerHelper('count1', function(count) {  // to increment the index counter
 return count + 1; 
});

Template.ContactList.helpers({       // statis json for contacts List
	contacts: ()=> {
		return {'data':[{
						'first_name' : "Bhuvnesh",
						'last_name'  : "Varshney",
						'contact_number' : 9557932744,
						'uid'	: "bh1221"	
					},{
						'first_name' : "Himanshu",
						'last_name'  : "Khandelwal",
						'contact_number' : 9557932745,
						'uid'	: "hi1221"	
					},{
						'first_name' : "Ashish",
						'last_name'  : "Vicky",
						'contact_number' : 9557932746,
						'uid'	: "as1221"	
					},{
						'first_name' : "Rahul",
						'last_name'  : "Kumar",
						'contact_number' : 9557932747,
						'uid'	: "ra1221"	
					},{
						'first_name' : "Ravi",
						'last_name'  : "Varshney",
						'contact_number' : 9557932748,
						'uid'	: "ra2112"	
					}]
				};
	}
});

Template.contact_info.helpers({   // helper to show individual contact info
	info: ()=> {
		var uid = FlowRouter.getParam('uid');
		switch(uid){
            case 'bh1221': return {'first_name' : "Bhuvnesh",'last_name'  : "Varshney",'contact_number' : 9557932744};
            case 'hi1221': return {'first_name' : "Himanshu",'last_name'  : "Khandelwal",'contact_number' : 9557932745};
            case 'as1221': return {'first_name' : "Ashish",'last_name'  : "Vicky",'contact_number' : 9557932746};
            case 'ra1221': return {'first_name' : "Rahul",'last_name'  : "Kumar",'contact_number' : 9557932747};
            case 'ra2112': return {'first_name' : "Ravi",'last_name'  : "Varshney",'contact_number' : 9557932748};
        }
	}
});

Template.contact_info.events({   
	'click .open-insert-modal': function(e) {    // function to open the modal
		e.preventDefault();
		num = Math.floor(Math.random()*900000) + 100000;
		$(".otp-input").val("Hi. Your OTP is "+num);
		$(".otp-input").css("border-color","#ccc");
		$('#insertModal').modal({backdrop: "static"});
	},
	'click .send-otp': function(e) {       //   function to send the otp
			e.preventDefault();
			var content = $(".otp-input").val();
			$(".otp-input").css("border-color","#ccc");
			if(content==""){
				$(".otp-input").css("border-color","red");
				return false;
			}
			e.target.disabled = true;
			var contact = e.target.value;
			var body = {
				'val':content,
				'first_name':$("#first_name").text(),
				'last_name' : $("#last_name").text(),
				'contact_number' : $("#contact_number").text(),
				'otp' : num
			};
			Meteor.call('sendSMS',contact,body,function(error,response){    // method calling that actually calls the twilio api
				$(".otp-input").val("");
			  	$(".close").click();
			  	e.target.disabled = false;
				if(response && response.method_success){
					//call to success alert
					sAlert.success('OTP Sent');
				}else{
					//call error alert
					console.log(response);
					sAlert.error('Error Sending OTP!!');
				}
			});
	},
	'click #backButton': function(e){
		e.preventDefault();
		FlowRouter.go('/');
	}
	
});

Meteor.startup(function () { // alert configuration

    sAlert.config({
        effect: 'flip',
        position: 'top-right',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        // stack: {
        //     spacing: 10 // in px
        //     limit: 3 // when fourth alert appears all previous ones are cleared
        // }
        offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: false,
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
        onClose: _.noop //
        // examples:
        // onClose: function() {
        //     /* Code here will be executed once the alert closes. */
        // }
    });

});