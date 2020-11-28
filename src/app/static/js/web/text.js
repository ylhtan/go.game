function gameDoneText(text) {
	// ctx.fillStyle = "#000000";
    // ctx.fillRect(canvasRect.width/2-canvasRect.width/4,canvasRect.height/2-canvasRect.height/4,canvasRect.width/2,canvasRect.height/2);
    ctx.font = "bold 50px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillStyle = "#FFE66F";
    ctx.fillText(text, canvasRect.width/2, canvasRect.height/2 );
}