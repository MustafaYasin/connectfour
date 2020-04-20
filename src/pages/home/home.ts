import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

export enum SpielPhasen {Laeuft, Unentschieden, GewonnenR, GewonnenG};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Platz für Attribute der Klasse:
  spielFeld : string[][]=[[],[],[],[],[],[]]; // Ein Element kann " " oder "X" oder "O" beinhalten.
  gewinnerFeld : string[][];
  aktSpieler: string;   // "r" oder "g"
  status : SpielPhasen;   // Ein Attribut des Enum-Datentyps
  SpielPhasen = SpielPhasen; // Damit HTML-Template Zugriff auf den Enum-Typ hat
  anzSteine: number=21;
  anzSteineRot: number;
  anzSteineGelb: number;

  constructor(public navCtrl: NavController) {
    console.log("Konstruktor der Klasse TicTacToePage wurde aufgerufen.");
    this.neuesSpiel();
  }

    neuesSpiel():void {
    console.log("Neues Spiel!");
    this.aktSpieler = "r";
    this.spielFeld = [[" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "] ];
    this.gewinnerFeld=[[" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "],
                      [" ", " ", " "," "," "," "," "] ];
    this.status = SpielPhasen.Laeuft;
    this.anzSteineGelb=this.anzSteine;
    this.anzSteineRot=this.anzSteine;
  }

  leeren():void{
    let i,j:number;
    for(i=0;i<this.spielFeld.length;i++){
      for(j=0;j<this.spielFeld[i].length;i++){
        this.spielFeld[i][j]=" ";
      }
    }
  }
  
  feldHintergrundFarbe(x:number,y:number):string{
    if(this.gewinnerFeld[x][y]=="r"){
      return("red");
    }
    else if(this.gewinnerFeld[x][y]=="g"){
      return("yellow");
    }
    else {
      return("");
    }
  }

  //Platz für Methoden der Klasse:
userZug(spalte:number): void{
  let i: number;
  for(i=(this.spielFeld.length-1); i>=0; i--)
  if(this.spielFeld[i][spalte]==" "){
    this.spielFeld[i][spalte]=this.aktSpieler;
    break;
  }

 this.gewinnerSteineTest(i, spalte);
  if(this.aktSpieler=="r"){
    this.anzSteineRot--;
    this.aktSpieler="g";

  }


 else if(this.aktSpieler=="g"){
    this.anzSteineGelb--;
    this.aktSpieler="r";
 }

  if(this.status==SpielPhasen.Laeuft&&this.anzSteineRot==0&&this.anzSteineGelb==0){this.status=SpielPhasen.Unentschieden;}  
}

gewinnerSteineTest(zeile:number, spalte:number): void{

  let h=1, v=1, d=1, g=1;
  let x, y: number;

  x=zeile;
  y=spalte;

while(y<6&&this.spielFeld[x][++y]==this.aktSpieler){h++;}
y=spalte;
while(y>0&&this.spielFeld[x][--y]==this.aktSpieler){h++;}
y=spalte;

while(x<5&&this.spielFeld[++x][y]==this.aktSpieler){v++;}
x=zeile;
while(x>0&&this.spielFeld[--x][y]==this.aktSpieler){v++;}
x=zeile;

while(x<5&&y<6&&this.spielFeld[++x][++y]==this.aktSpieler){d++;}
x=zeile;
y=spalte;
while(x>0&&y>0&&this.spielFeld[--x][--y]==this.aktSpieler){d++;}
x=zeile;
y=spalte;

while(x<5&&y>0&&this.spielFeld[++x][--y]==this.aktSpieler){g++;}
x=zeile;
y=spalte;
while(x>0&&y<6&&this.spielFeld[--x][++y]==this.aktSpieler){g++;}
x=zeile;
y=spalte;


  if (h>3||v>3||d>3||g>3){
    if(this.aktSpieler=="r"){this.status=SpielPhasen.GewonnenR;}
  else  if(this.aktSpieler=="g"){this.status=SpielPhasen.GewonnenG;}
  this.gewinnerFarbe(spalte, zeile, h,v,d,g);
  }
}
gewinnerFarbe(spalte:number, zeile:number, h:number, v:number, d:number, g:number ): void{

let x, y: number;

  x=zeile;
  y=spalte;

this.gewinnerFeld[x][y]=this.aktSpieler;

while(h>3&&y<6&&this.spielFeld[x][++y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
y=spalte;
while(h>3&&y>0&&this.spielFeld[x][--y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
y=spalte;

while(v>3&&x<5&&this.spielFeld[++x][y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;
while(v>3&&x>0&&this.spielFeld[--x][y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;

while(d>3&&x<5&&y<6&&this.spielFeld[++x][++y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;
y=spalte;
while(d>3&&x>0&&y>0&&this.spielFeld[--x][--y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;
y=spalte;

while(g>3&&x<5&&y>0&&this.spielFeld[++x][--y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;
y=spalte;
while(g>3&&x>0&&y<6&&this.spielFeld[--x][++y]==this.aktSpieler){this.gewinnerFeld[x][y]=this.aktSpieler;}
x=zeile;
y=spalte;

 
}


spalteVoll(spalte:number): boolean{
  if(this.status!=this.SpielPhasen.Laeuft){return (true);}
  else if (this.spielFeld[0][spalte]==" "){return (false);}
  else { return (true);}
}

}










//===================================================================
//
// 
// 
// 
// 
// 
// 
// 
//===================================================================



/*
*/

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export enum spielPhasen {Laeuft, Unentschieden, GewonnenR, GewonnenG};
@Component({
selector: 'page-home',
templateUrl: 'home.html'
})
export class HomePage {
// Platz für Attribute der Klasse:
aktSpieler : string;
status : spielPhasen;
spielPhasen = spielPhasen;
anzSteineRot : number;
anzSteineGelb : number;
spielFeld : string[][] = [["
["
["
["
["
["
gewinnerFeld : string[][]=[["
["
["
["
["
["
zeilen : number;
spalten : number;
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
"
"
"
"
"
"
"
"
"
"
"
"
",
",
",
",
",
",
",
",
",
",
",
",
],
],
],
],
],
]];
],
],
],
],
],
]];
//===============Hier ist Platz für den ts-Code==================
constructor(public navCtrl: NavController){
this.neuesSpiel();
}
neuesSpiel(): void{
setzen
this.aktSpieler = "r";
this.anzSteineRot = 21;
this.anzSteineGelb = 21;
this.leeren();
this.status = spielPhasen.Laeuft;
this.zeilen = this.spielFeld.length;
this.spalten = this.spielFeld[0].length;
console.log("Neues Spiel wurde gestartet.")
}
leeren(): void {
for (let i=0; i<this.zeilen; i++){
for (let j=0; j<this.spalten; j++){
this.spielFeld[i][j]=" ";
}
}
for (let i=0; i<this.zeilen; i++){
for (let j=0; j<this.spalten; j++){
this.gewinnerFeld[i][j]=" ";
}
}
}
// neues Spiel wird gestartet
// alle Variablen auf Anfang
// Schleife von 0 bis Zeilenanzahl
// Schleife von 0 bis Spaltenanzahl
// Schleife von 0 bis Zeilenanzahl
// Schleife von 0 bis Spaltenanzahl
userZug(aktSpalte : number) : void{
let aktZeile : number;
for (let i=this.zeilen-1; i>=0; i--){
// von Spaltenlänge bis 0
runterzählen; von unten nach oben auf leeres Feld abchecken
if (this.spielFeld[i][aktSpalte]==" "){
// wenn aktuelles Feld im Array