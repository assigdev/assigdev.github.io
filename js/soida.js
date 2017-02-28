 var CirclePaint = {
    // options vars
     cross:{
         strokeColor: 'black'
     },
     sin_style:{
         strokeColor: 'blue',
         strokeWidth: 2
     },
    width: 2400,
    part_width: 1200,
    height:400,
    part_height: 200,
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

     _hatch_draw: function (start, end, color) {
        var path = new Path();
        path.strokeColor = color;
        path.add(start);
        path.add(end);
    },

    _text_draw: function (endHatch, textContent, styles, angle) {

        text = new PointText(endHatch);
        text.fontSize = styles.fontSize;
        text.fillColor = styles.fillColor;
        text.justification = 'center';
        text.content = textContent.toString();
        return text;
    },

     sin_draw: function () {
         var i,
             rad = 0,
             j=30,
             y=0,
             sin_ugla=0,
            center=new Point(this.part_width, this.part_height),
            sin = new Path();
         sin.add(center);
         sin.strokeColor = this.sin_style.strokeColor;
         for(i=this.width/2+30; i<=this.width-30; i+=30){
             rad = j*Math.PI/180;
             sin_ugla = Math.sin(rad).toFixed(1);
             if (sin_ugla<0){
                 y= sin_ugla * -150 +200;
             }
             else {
                 y = (1-sin_ugla) * 150 + 50;
             }
             sin.add(new Point(i,y));
             sin.smooth();

             console.log(Math.sin(rad).toFixed(1));
             console.log(j);
             console.log(y);
             j+=30;
         }
         for(i=this.width/2+30; i<=this.width-30; i+=30){
             rad = j*Math.PI/180;
             sin_ugla = Math.sin(rad).toFixed(1);
             if (sin_ugla<0){
                 y= sin_ugla * -150 +200;
             }
             else {
                 y = (1-sin_ugla) * 150 + 50;
             }
             sin.add(new Point(i,y));
             sin.smooth();

             console.log(Math.sin(rad).toFixed(1));
             console.log(j);
             console.log(y);
             j+=30;
         }

     },
     cos_draw: function () {
         var i,
             rad = 0,
             j=30,
             y=0,
             sin_ugla=0,
            center=new Point(this.part_width, 50),
            sin = new Path();
         sin.add(center);
         sin.strokeColor = this.sin_style.strokeColor;
         for(i=this.width/2+30; i<=this.width-30; i+=30){
             rad = j*Math.PI/180;
             sin_ugla = Math.cos(rad).toFixed(1);
             if (sin_ugla<0){
                 y= sin_ugla * -150 +200;
             }
             else {
                 y = (1-sin_ugla) * 150 + 50;
             }
             sin.add(new Point(i,y));
             sin.smooth();

             console.log(Math.cos(rad).toFixed(1));
             console.log(j);
             console.log(y);
             j+=30;
         }

     },

     cross_draw: function(){
      this._pl_draw(new Point(this.part_width, 50), new Point(this.part_width, 350) , 'x');
      this._pl_draw(new Point(0, this.part_height), new Point(this.width, this.part_height) , 'y');
    },
    _pl_draw: function (topPoint, bottomPoint, coord) {
        var i,j;
        var cross = new Path();
        cross.add(topPoint);
        cross.add(bottomPoint);
        cross.strokeColor = this.cross.strokeColor;
        if (coord === 'x') {
            j = 30;
            for(i=this.width/2+30; i<=this.width-30; i+=30){
                this._hatch_draw(new Point(i, this.part_height+4), new Point(i, this.part_height-4), 'black');
                this._text_draw( new Point(i, this.part_height+15),j,this.text.smallStyles, false);
                j+=30;
            }
            j = -30;
            for(i=this.width/2-30; i>=30; i-=30){
                this._hatch_draw(new Point(i, this.part_height+4), new Point(i, this.part_height-4), 'black');
                this._text_draw( new Point(i, this.part_height-15),j,this.text.smallStyles, false);
                j-=30;
            }
        }
        else {
            j =0.9;
            for(i=65; i<=335; i+=15){
                this._hatch_draw(new Point(this.part_width+4, i), new Point(this.part_width-4, i), 'black');
                if(j>0) {
                    this._text_draw(new Point(this.part_width+15, i + 5), j, this.text.smallStyles, false);
                }
                else if(j<0){
                    this._text_draw(new Point(this.part_width-15, i + 5), j, this.text.smallStyles, false);
                }
                j-=0.1;
                j = j.toFixed(1);
            }
        }

    }
};

CirclePaint.cross_draw();
CirclePaint.sin_draw();