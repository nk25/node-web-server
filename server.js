const express =require("express");
const hbs =require("hbs");
const fs =require('fs');

var app = express();
hbs.registerPartials(__dirname+"/views/partials");

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('captaliseText',(text)=>{
	return text.toUpperCase();
});

app.set('view-engine','hbs');
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}:${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n',(err)=>{
		if (err) {
			console.log('Unable to append server.log file.');
		}
	});
	console.log(log);
	next();
});

// app.use((req,res,next)=>{
// res.render('maintenance.hbs',{
// 	pageTitle:'Maintenace'
// });
// });
app.use(express.static(__dirname + "/public"));

app.get('/', (req,res)=>{
res.render('home.hbs',{
	pageTitle:'Home Page',
	welcomeMessage : "Welcome to my first node js website"
})
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
	pageTitle: 'About Page',
});
});

app.get('/bad',(req,res)=>{
res.send({
 errorMessage : 'Unable to handle hte req',
});
});

app.listen(3000,()=>{
	console.log('Server is up and running');
});