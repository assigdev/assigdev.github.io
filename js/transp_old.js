var ugol = document.getElementById('ugol');

var center = new Point(200,300);
var radius = 150;
var myCircle = new Path.Circle(center, radius);
myCircle.strokeColor = 'blue';

var leftSide = new Point(50,300);
var vector = leftSide - center;
var startShVector = vector.clone();
var endShVector = vector.clone();
startShVector.length -= 3;
endShVector.length += 3;

var bigStartShVector = vector.clone();
var bigEndShVector = vector.clone();
bigStartShVector.length -= 6;
bigEndShVector.length += 6;


var angle_number =0;
for(var i=1; i<=36; i++){
    var startSh, endSh, text, text_point, text_vector;
    var path = new Path();
    angle_number +=10;
    if(i%3==0) {
        bigStartShVector.angle = angle_number;
        bigEndShVector.angle = angle_number;
        startSh = bigStartShVector + center;
        endSh = bigEndShVector + center;
        path.strokeColor = 'red';


        text_vector = endSh - center;
        if(endSh.x<200){
            text_vector.length += 25;
        }
        else {
            text_vector.length += 20;
        }

        text_point = text_vector + center;
        text = new PointText(text_point);
        text.content = angle_number.toString();
        text.fillColor = 'black';
    }
    else {
        startShVector.angle = angle_number;
        endShVector.angle = angle_number;
        startSh = startShVector + center;
        endSh = endShVector + center;
        path.strokeColor = 'blue';
    }
    path.add(startSh);
    path.add(endSh);
    path.closed = true;
}

var audio = new Audio('assets/tik4.mp3 ');
var strelka = new Path();
strelka.add(center);
strelka.add(leftSide);
strelka.strokeColor = 'red';
strelka.strokeWidth = 14;
strelka.onMouseDrag = function(event) {
    var event_vector = event.point - center;
    var strelka_vector = strelka.segments[1].point - center;
    strelka_vector.angle = event_vector.angle;
    if(parseInt(strelka_vector.angle)%10==0){
        audio.play();
        console.log('***************');
    }
    var endSh = strelka_vector + center;
    strelka.segments[1].point = endSh;
};
