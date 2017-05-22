// creating routes 

FlowRouter.route('/',{
	name:'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'home'});  // allocating home template dynamically to MainLayout
	}
});

FlowRouter.route('/contact-info/:uid',{
	name : 'info',
	action() {
		BlazeLayout.render('MainLayout', {main: 'contact_info'}) // allocating contact_info template dynamically to MainLayout
	}
});