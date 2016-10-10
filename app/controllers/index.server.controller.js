module.exports = {
	render : function(req, res){
		if (req.session.lastVisit) {
			console.log('Last visited : ' +  req.session.lastVisit);
		}
		req.session.lastVisit = new Date();
		
		res.send("Hello World!!");
	}
}