// ## app.js ##
//
// This is where we set up our web application using Express. We create the
// app and set up routes which will respond to requests from the client's
// web browser.

const path = require('path');
const express = require('express');

// Create a new Express app
const app = express();

// Serve up our static assets from 'dist' (this includes our client-side
// bundle of JavaScript). These assets are referred to in the HTML using
// <link> and <script> tags.
app.use('/assets', express.static(path.resolve(__dirname, '..', 'dist')));

// Set up the index route
app.get('/', (req, res) => {
  // The HTML is pretty barebones, it just provides a mount point
  // for React and links to our styles and scripts.
  const htmlContent = `
    <!DOCTYPE html>

<style>
.idle
{
  background-color:#e7e7e7
}
.turn1
{
  background-color:#008CBA
}
.turn2
{
  background-color:#8C00BA
}

</style>

    <body>

		Clicked ID is :<a id="clicked"></a><br>
		Current Player:<a id="current">?</a><br>
		Winner : <a id="winner">?</a>
<br>

<table border=1>
<colgroup>
<col style="width: 30px">
<col style="width: 30px">
<col style="width: 30px">
<col style="width: 30px">
</colgroup>
<thead>
  <tr>
    <td></td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
</thead>
<tbody>
  <tr>
    <td >A</td>
    <td ><input type="button" id="A1" onClick="checkID()" class="idle" value=" " ></td>
    <td ><input type="button" id="A2" onClick="checkID()" class="idle" value=" "></td>
    <td ><input type="button" id="A3" onClick="checkID()" class="idle" value=" "></td>
  </tr>
  <tr>
    <td >B</td>
    <td ><input type="button" id="B1" onClick="checkID()" class="idle" value=" "></td>
    <td ><input type="button" id="B2" onClick="checkID()" class="idle" value=" "></td>
    <td ><input type="button" id="B3" onClick="checkID()" class="idle" value=" "></td>
  </tr>
  <tr>
    <td >C</td>
    <td ><input type="button" id="C1" onClick="checkID()" class="idle" value=" "></td>
    <td ><input type="button" id="C2" onClick="checkID()" class="idle" value=" "></td>
    <td ><input type="button" id="C3" onClick="checkID()" class="idle" value=" "></td>
  </tr>
</tbody>
</table>		
<br>
  <input type = "button" id="reset" onClick="location.reload()" value="Reset">
        <script>
		var count=0;
		const board=['1','2','3','4','5','6','7','8','9']; //assign unique initialisation values 
		//map the location - index
		// A1 = 0
		// A2 = 1
		// A3 = 2
		// B1 = 3
		// B2 = 4
		// B3 = 5
		// C1 = 6
		// C2 = 7
		// C3 = 8		
		
		
		function disableAll()
		{
		   document.getElementById("A1").disabled=true;
		   document.getElementById("A2").disabled=true;
		   document.getElementById("A3").disabled=true;
		   document.getElementById("B1").disabled=true;
		   document.getElementById("B2").disabled=true;
		   document.getElementById("B3").disabled=true;
		   document.getElementById("C1").disabled=true;
		   document.getElementById("C2").disabled=true;
		   document.getElementById("C3").disabled=true;
		}
	
		function checkWinner(val)
		{
			//alert(board);
			if (
				((board[0]==board[1])&&(board[0]==board[2]))||((board[3]==board[4])&&(board[3]==board[5]))||((board[6]==board[7])&&(board[6]==board[8])) ||
				((board[0]==board[3])&&(board[0]==board[6]))||((board[1]==board[4])&&(board[1]==board[7]))||((board[2]==board[5])&&(board[2]==board[8])) ||
				((board[0]==board[4])&&(board[0]==board[8]))||((board[2]==board[4])&&(board[2]==board[6]))
				)								
				{document.getElementById("winner").innerHTML=val;
				 disableAll();}
			//check draw condition?			
		}
		
		function updateArray(active)
		{			
			x = (active.id[0].charCodeAt(0)-65);
			y = (active.id[1]-1);
			pos=((y*3)+x);
			board[pos]=active.value;
			checkWinner(active.value);
		}
		
		function checkID()
		{
			const active=document.activeElement;			
			document.getElementById("clicked").innerHTML=active.id;			
			let current=document.getElementById("current").innerHTML;
			let val=active.value;
			if (val===" ")
			{				
				if ((current==="?")||(current==="O"))
				{
					active.classList.add("turn2")
					current="X";
				}
				else
				{
					active.classList.add("turn1")
					current="O"
				}
				active.value=current;
				updateArray(active);
			}
			else
			{
			   alert("No more move in this location");
			}
			console.log(current);
			const curr=document.getElementById("current");
			curr.innerHTML=current;
		}

	</script>
    </body>
</html>`;

  // Respond with the HTML
  res.send(htmlContent);
});

// Export the Express app
module.exports = app;
