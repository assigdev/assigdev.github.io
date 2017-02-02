/**
 * Created by assig on 26.01.2017.
 */

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
            strokeWidth: 6
        }
    },

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
                this._text_draw(endHatch, angle_number, this.text.styles, true);
            }
            else {
                this.startHatchVector.angle = angle_number;
                this.endHatchVector.angle = angle_number;
                startHatch = this.startHatchVector + this.circle.styles.center;
                endHatch = this.endHatchVector + this.circle.styles.center;
                this._hatch_draw(startHatch, endHatch, this.hatch.styles.color);
                this._text_draw(endHatch, angle_number, this.text.smallStyles, true);
            }

        }
    },

    _hatch_draw: function (start, end, color) {
        var path = new Path();
        path.strokeColor = color;
        path.add(start);
        path.add(end);
        path.closed = true;
    },

    _text_draw: function (endHatch, textContent, styles, angle) {
        var text, textVector, textPoint;
        if (angle === true) {
            textContent *= -1;
            if (textContent == 360) textContent = 0;


            textVector = endHatch - this.circle.styles.center;

            if (endHatch.x < this.circle.styles.center.x) {
                textVector.length += this.text.indent.left;
            }
            else {
                textVector.length += this.text.indent.right;
            }

            textPoint = textVector + this.circle.styles.center;
        }
        else {
            textPoint = endHatch;
        }
        text = new PointText(textPoint);
        text.fontSize = styles.fontSize;
        text.fillColor = styles.fillColor;
        text.justification = 'center';
        text.content = textContent.toString();
    },
    arrow_generate: function () {
        var arrow = new Path;
        var center = this.circle.styles.center;
        arrow.strokeColor =  this.arrow.styles.strokeColor;
        arrow.strokeWidth = this.arrow.styles.strokeWidth;
        arrow.add(center);
        arrow.add(this.circle.leftSide);
        // arrow.closed = true;
        var sin = new Path();
        sin.add(center);
        sin.add(center);
        sin.strokeColor = 'blue';
        var cos = sin.clone();
        arrow.onMouseDrag = function (event) {
            var event_vector = event.point - center;
            var arrow_vector = arrow.segments[1].point - center;
            arrow_vector.angle = event_vector.angle;
            // ugol.innerText = event_vector.angle;
            var endHatch = arrow_vector + center;
            arrow.segments[1].point = endHatch;

            sin.segments[0].point.y = endHatch.y;
            sin.segments[1].point = endHatch;
            cos.segments[0].point.x = endHatch.x;
            cos.segments[1].point = endHatch;
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
        }
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