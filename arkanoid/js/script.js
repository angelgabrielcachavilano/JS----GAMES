document.addEventListener("DOMContentLoaded", () => {
    console.log("init");
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d'); // 2D context rendering

    canvas.with = 448
    canvas.height = 460

    /* Variables del juego */
    let counter = 0;

    /* VARIABLES DE LA PELOTA */
    // tamaño de la pelota
    const ballRadius = 3;
    // pos de la pelota
    let x = canvas.width/2;
    let y = canvas.height -30;
    // velocidad de la pelota
    let dx = -2;
    let dy = -2;

    /* VARIABLES DE LA PALETA*/
    const paddleHeight = 10;
    const paddleWidth = 50;
    const PADDLE_SENSITIVITY = 7; // velocidad de movimiento
    let paddlex = (canvas.width - paddleWidth) / 2;
    let paddley = (canvas.height - paddleHeight - 10);

    let rightPressed = false;
    let leftPressed = false;

    function drawBall(){
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2) // anguo de inicio y final, ultimos 2 parametros
        ctx.fillStyle = '#fff'; // color
        ctx.fill();
        ctx.closePath(); // para obtimizar rendimiento y no tener problemas de trazado
    }
    function drawPaddle(){
        ctx.fillStyle = '#09f'; // color
        ctx.fillRect(
            paddlex, // posicion x donde se empieza a dibujar
            paddley, // posicion y donde se empieza a dibujar
            paddleWidth, // ancho del dibujo
            paddleHeight // alto del dibujo
        )
    }
    function drawBricks(){}
    function collisionDetection(){}
    function ballMovement(){
        // la pelota toca la pala
        const isBallSameXasPaddle = x > paddlex && x < paddlex + paddleWidth;
        const isBallTouchingPaddle = y + dy > paddley;

        if (isBallSameXasPaddle && isBallTouchingPaddle) {
            dy = -dy; // cambia la direccion de la pelota
        }// la pelota toca el suelo
        else if ( y + dy > canvas.height - ballRadius) {
            console.log("game over");
            document.location.reload();
        }

        // para rebotar los movimientos en los laterales
        if( x + dx > canvas.width - ballRadius /* pared derecha*/
             || x + dx < ballRadius /*pared izquierda*/ ){
                dx = -dx;
        }
        // rebotar en la parte de arriba
        if (y + dy < ballRadius) {
            dy = -dy;
        }
        // mover la pelota
        x += dx;
        y += dy;
    }
    function paddleMovement(){
        if( rightPressed && paddlex < canvas.width - paddleWidth){
            paddlex += PADDLE_SENSITIVITY;
        } else if (leftPressed && paddlex > 0){
            paddlex -= PADDLE_SENSITIVITY;
        }
    }
    function cleanCanvas(){
        ctx.clearRect( 0, 0, canvas.width, canvas.height)
    }
    function initEvents(){
        document.addEventListener('keydown', keydownHandler);
        document.addEventListener('keyup', keyupHandler);

        function keydownHandler(e){
            const { key } = e;
            if( key == 'Right' || key == 'ArrowRight'){
                rightPressed = true;
            } else if ( key == 'Left' || key == 'ArrowLeft'){
                leftPressed = true;
            }
        }
        function keyupHandler(e){
            const { key } = e;
            if( key == 'Right' || key == 'ArrowRight'){
                rightPressed = false;
            } else if ( key == 'Left' || key == 'ArrowLeft'){
                leftPressed = false;
            }
        }
    }

    function draw(){
        // console.log('hi');
        // limpiar el canvas antes de dibujar
        cleanCanvas();
        // hay que dibujar los elementos
        drawBall();
        drawPaddle();
        drawBricks();
        // drawScore()

        // colisiones y movimientos
        collisionDetection();
        ballMovement();
        paddleMovement();

        // mover la bola
        window.requestAnimationFrame(draw);
        // requestAnimationFrame llama a una funcion antes que se vuelva repintar, recursiva
        // se usa para la mayoria de juegos
    }

    draw();
    initEvents();
    //console.log("width: " canvas.width + " ball " + y + dx)
});
