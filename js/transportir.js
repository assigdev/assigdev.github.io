/**
 * Created by assig on 26.01.2017.
 */
var drag_count=0, prev_angle=0, drag_points =0, angles=[];
var CirclePaint = {
    // options vars
    circle: {
        leftSide: new Point(350, 200),
        styles: {
            center: new Point(200, 200),
            radius: 150,
            strokeColor: 'black',
            fillColor: 'white'
        }
    },
    angle_number: {
        circle_style:{
            center: new Point(380, 200),
            radius: 20,
            strokeColor: '#3385ff',
            fillColor: '#3385ff'
        }
    },
    hatch: {
        count: 36,
        length: 3,
        bigLength: 6,
        styles: {
            color: 'black',
            bigColor: 'red'
        }
    },
    text: {
        indent: {
            left: 30,
            right: 30
        },
        styles: {
            fillColor: 'black',
            fontSize: '15px'

        },
        smallStyles: {
            fillColor: 'green',
            fontSize: '10px'
        }
    },
    arrow: {
        styles: {
            strokeColor: 'red',
            strokeWidth: 10
        }

    },

    arrow_points: [
        new Point(320, 200),
        new Point(80, 200),
        new Point(290, 200),
        new Point(110, 200),
        new Point(260, 200),
        new Point(140, 200),
        new Point(230, 200),
        new Point(170, 200)
    ],

    // init vars
    circleObj: null,
    vector: null,
    startHatchVector: null,
    endHatchVector: null,
    bigStartHatchVector: null,
    bigEndHatchVector: null,

    //functions
    init: function () {
        this.circleObj = new Path.Circle(this.circle.styles);
        this.vector  = this.circle.leftSide - this.circle.styles.center;

        this.startHatchVector = this.vector.clone();
        this.endHatchVector = this.vector.clone();
        this.bigStartHatchVector = this.vector.clone();
        this.bigEndHatchVector = this.vector.clone();

        this.startHatchVector.length += this.hatch.length;
        this.endHatchVector.length -= this.hatch.length;
        this.bigStartHatchVector.length += this.hatch.bigLength;
        this.bigEndHatchVector.length -= this.hatch.bigLength;

    },

    draw : function () {
        var angle_number = 0;
        for(var i=1; i<=this.hatch.count; i++) {
            var startHatch, endHatch;
            angle_number -=10;
            if(i%3==0) {
                this.bigStartHatchVector.angle = angle_number;
                this.bigEndHatchVector.angle = angle_number;
                startHatch = this.bigStartHatchVector + this.circle.styles.center;
                endHatch = this.bigEndHatchVector + this.circle.styles.center;
                this._hatch_draw(startHatch, endHatch, this.hatch.styles.bigColor);
                angles[i]=this._text_draw(endHatch, angle_number, this.text.styles, true);
            }
            else {
                this.startHatchVector.angle = angle_number;
                this.endHatchVector.angle = angle_number;
                startHatch = this.startHatchVector + this.circle.styles.center;
                endHatch = this.endHatchVector + this.circle.styles.center;
                this._hatch_draw(startHatch, endHatch, this.hatch.styles.color);
                angles[i]=this._text_draw(endHatch, angle_number, this.text.smallStyles, true);
            }

        }
    },

    _hatch_draw: function (start, end, color) {
        var path = new Path();
        path.strokeColor = color;
        path.add(start);
        path.add(end);
    },

    _text_draw: function (endHatch, textContent, styles, angle) {
        var text, textVector, textPoint;
        if (angle === true) {
            textContent *= -1;
            if (textContent == 360) textContent = 0;


            textVector = endHatch - this.circle.styles.center;
            textVector.length += this.text.indent.right;
            textPoint = textVector + this.circle.styles.center;
            textContent += '\u00B0';
        }
        else {
            textPoint = endHatch;
        }
        text = new PointText(textPoint);
        text.fontSize = styles.fontSize;
        text.fillColor = styles.fillColor;
        text.justification = 'center';
        text.content = textContent.toString();
        return text;
    },

    _angle_number_draw: function () {
      var number_group = new Group();
        var numb_circle = new Path.Circle(this.angle_number.circle_style);

        text = new PointText(this.angle_number.circle_style.center);
            text.fontSize = '18px';
            text.fillColor = 'white';
            text.justification = 'center';
            text.content = '0\u00B0';
            text.position.y+=7;
        number_group.addChild(numb_circle);
        number_group.addChild(text);
        return number_group;
        },

    arrow_generate: function () {
        var arrow = new Path;
        var center = this.circle.styles.center;
        arrow.strokeColor =  '#F0FFFF';
        arrow.strokeWidth = this.arrow.styles.strokeWidth;
        arrow.add(center);
        arrow.add(this.circle.leftSide);
        var red_arrow = arrow.clone();
            red_arrow.strokeColor = 'red';
            red_arrow.strokeWidth = 2;
            arrow.opacity = 0.1;
        var sin = new Path();
            sin.strokeWidth = 4;
            sin.add(center);
            sin.add(center);
            sin.strokeColor = 'blue';
        var cos = sin.clone();



        var lines = [];
        for(var i=0; i<8; i++) {
            var line = new Path();
                line.strokeColor = 'green';
                line.strokeWidth = 4;
                for(var j=0; j<11; j++) {
                    line.add(this.arrow_points[i]);
                }
            lines[i]=line;
        }

        var group_number = this._angle_number_draw();
        group_number.onMouseDrag = function (event) {

            arrow_move(event, arrow, red_arrow, sin, cos, center, lines, group_number);
        };
        // red_arrow.onMouseDrag = function (event) {
        //     arrow_move(event, arrow, red_arrow, sin, cos, center, lines, group_number);
        // };

    },
    cross_draw: function(){
      this._pl_draw(new Point(200, 50), new Point(200, 350) , 'x');
      this._pl_draw(new Point(50, 200), new Point(350, 200) , 'y');
    },
    _pl_draw: function (topPoint, bottomPoint, coord) {
        var i;
        var cross = new Path();
        cross.add(topPoint);
        cross.add(bottomPoint);
        cross.strokeColor = this.circle.styles.strokeColor;
        if (coord === 'x') {
            for(i=65; i<=335; i+=15){
                this._hatch_draw(new Point(i, 204), new Point(i, 196), 'black');
            }
        }
        else {
            var j =0.9;
            for(i=65; i<=335; i+=15){
                this._hatch_draw(new Point(204, i), new Point(196, i), 'black');
                this._text_draw(new Point(215, i+5), j, this.text.smallStyles, false);
                j-=0.1;
                j = j.toFixed(1);
            }
        }

    }
};



CirclePaint.init();
CirclePaint.cross_draw();
CirclePaint.draw();

CirclePaint.arrow_generate();



function arrow_move(event, arrow, red_arrow, sin, cos, center, lines, number_group)  {

    var event_vector = event.point - center;
    var arrow_vector = arrow.segments[1].point - center;
    arrow_vector.angle = event_vector.angle;
    // ugol.innerText = event_vector.angle;
    var endHatch = arrow_vector + center;

    arrow.segments[1].point = endHatch;
    red_arrow.segments[1].point = endHatch;


    sin.segments[0].point.y = endHatch.y;
    sin.segments[1].point = center;
    cos.segments[0].point.x = endHatch.x;
    cos.segments[1].point = center;
    var y = sin.segments[0].point.y;
    y = 200 - y;
    y /=150;
    sin_text.innerText = y.toFixed(3);
    var x = cos.segments[0].point.x;
    x = x-200;
    x /=150;
    cos_text.innerText = x.toFixed(3);

    var audio = new Audio('assets/tik4.mp3 ');
    if(parseInt(arrow_vector.angle.toFixed(2))%10==0){
        audio.play();
    }
    // drag_line(event, arrow_vector.angle);
    // line_paint(lines, arrow_vector, center);
    //
    var number_group_vector = arrow_vector.clone();
        number_group_vector.length = arrow_vector.length + 30;
    number_group.position = number_group_vector + center;
    number_group.children[1].content=parseInt(drag_count)+ '\u00B0';
}


function drag_line(event, angle) {
    var raz_angle;
    if(angle<=0) {
        if(prev_angle>20) {
                prev_angle = prev_angle - 360;
        }
       raz_angle = angle - prev_angle;
       raz_angle *= -1;
        drag_count += raz_angle;
    }
    else{
       if(prev_angle<-20) {
           prev_angle = 360+prev_angle;
       }
        raz_angle = prev_angle - angle;

        drag_count += raz_angle;
    }
    prev_angle = angle;
    drag_points = parseInt(drag_count/180);

}

function line_paint(lines, arrow_vector, center) {
    var razn_arrow = 30;
    var line = lines[Math.abs(drag_points)];
    change_angles();
    switch (Math.abs(drag_points)){
        case 2:
        case 3: razn_arrow = 60; break;
        case 4:
        case 5: razn_arrow = 90; break;
        case 6:
        case 7: razn_arrow = 120;
    }
    var line_vector = arrow_vector.clone();
        line_vector.length = line_vector.length-razn_arrow;
        line.segments[10].point = line_vector + center;
    var middle_line_vector = line_vector.clone();
    var i, angle;
        if (line_vector.angle<=0 && drag_count>=0 || line_vector.angle>0 && drag_count<0) {
            for (i = 1; i < 10; i++) {
                middle_line_vector.angle = line_vector.angle * 0.1 * i;
                line.segments[i].point = middle_line_vector + center;
            }
        }
        else if(line_vector.angle<=0 && drag_count<0){
             angle = -180 - line_vector.angle;
            for (i = 1; i < 10; i++) {
                middle_line_vector.angle = -180 - angle * 0.1 * i;
                line.segments[i].point = middle_line_vector + center;

            }
        }
        else {
            angle = 180 - line_vector.angle;
            for (i = 1; i < 10; i++) {
                middle_line_vector.angle = 180 - angle * 0.1 * i;
                line.segments[i].point = middle_line_vector + center;

            }
        }
        // line.selected = true;

        line.smooth({ type: 'catmull-rom' });

    var before_line = lines[Math.abs(drag_points-1)]


}


    function change_angles() {
        console.log(drag_points+' change_angles');
        var points = drag_points;
        if(drag_points<0) points -=1;
        if (points%2===0)
        for(var i=1; i<=CirclePaint.hatch.count; i++) {
            angles[i].content = 10*i+360*points/2;
            angles[i].content += '\u00B0';
        }
    }