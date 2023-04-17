const express = require ('express');
const expressHandlebars=require('express-handlebars');
const app = express();

// 핸들바 뷰 엔진 설정
app.engine('handlebars',expressHandlebars({
  defaultLayout:'main'
}));
app.set('view engine','handlebars');

const port =process.env.PORT||3000;

app.get('/',(req,res)=>res.render('home'));

app.get('/about',(req,res)=>{
  const randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about',{fortune:randomFortune});
});

app.use(express.static(__dirname+'/public'))

/* app.get('/',(req,res)=>{
  res.type('text/plain')
  res.send('Meadowlark Travel');
})

app.get('/about',(req,res)=>{
  res.type('text/plain')
  res.send('About Meadowlark Travel');
}) */
// 포춘 쿠키
const fortunes=[
  "Conquer your fears or they will conquer you.",
  "Rivers need springs.",
  "Do not fear what you don't know.",
  "You will have a pleasant surprise.",
  "Whenever possible,keep it simple.",

]


//커스텀 404 페이지
app.use((req, res)=>{
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found');
});

//커스텀 500 페이지
app.use((err, req, res, next)=>{
	console.error(err.message);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.listen(port,()=>console.log(
  `Express started on http://localhost:${port};`+
  `press Crtl-C to terminate.`
))