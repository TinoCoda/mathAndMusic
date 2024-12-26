const trackStyle=Object.freeze(
   {
      CIRCLE: 0,
      OVAL: 1,
      HYPERBOLE: 2,
   }
)
class Track {
    constructor(center, radius, hue) {
       this.center = center;
       this.radius = radius;
       this.hue = hue;
       this.period = Math.PI;
       this.style=trackStyle.CIRCLE;
    }
 
    getPositionOld(offset) {
       return {
          x: this.center.x + this.radius*0.9*Math.cos(offset), //* this.radius,
          y: this.center.y - Math.abs(Math.sin(offset)) * 0.7*this.radius,
          round: Math.floor(offset / this.period),
          progress: (offset % this.period) / this.period
       };
    }

    setTrackStyle(i)
    {
      const possibleStyles=Object.values(trackStyle);
      const selector= i % 5;
      if(possibleStyles.includes(selector)){
         this.style=selector;
      }
      else{
         this.style=trackStyle.CIRCLE;
      }

      
    }


    getPosition(offset) {
      let x=0;
      let y=0;
      let round=0;
      let progress=0;
      switch(this.style)
      {
         case trackStyle.CIRCLE:
            x = this.center.x + this.radius*Math.cos(offset);
            y = this.center.y - Math.abs(Math.sin(offset)) *this.radius;
            round = Math.floor(offset / this.period);
            progress = (offset % this.period) / this.period;
            break;
         case trackStyle.OVAL:
            x = this.center.x + this.radius*0.9*Math.cos(offset);
            y = this.center.y - Math.abs(Math.sin(offset)) * 0.5*this.radius;
            round = Math.floor(offset / this.period);
            progress = (offset % this.period) / this.period;
            break;
         case trackStyle.HYPERBOLE:
            x = this.center.x + this.radius*0.9/Math.cos(offset);
            y = this.center.y - Math.abs(Math.tan(offset)/Math.cos(1.4*offset)) * 0.7*this.radius;
            round = Math.floor(offset / this.period);
            progress = (offset % this.period) / this.period;
            break;
      }
      return {
         x: x,
         y: y,
         round: round,
         progress: progress
      };

   
    }
 
    draw(ctx) {
       ctx.beginPath();
       for (let a = 0; a < Math.PI * 2; a += 0.01) {
          const pos = this.getPosition(a);
          ctx.lineTo(pos.x, pos.y);
       }
       ctx.closePath();
       ctx.strokeStyle = `hsl(${this.hue}, 100%, 50%)`;
       ctx.stroke();
    }
 }