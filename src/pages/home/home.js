"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var SpielPhasen;
(function (SpielPhasen) {
    SpielPhasen[SpielPhasen["Laeuft"] = 0] = "Laeuft";
    SpielPhasen[SpielPhasen["Unentschieden"] = 1] = "Unentschieden";
    SpielPhasen[SpielPhasen["GewonnenR"] = 2] = "GewonnenR";
    SpielPhasen[SpielPhasen["GewonnenG"] = 3] = "GewonnenG";
})(SpielPhasen = exports.SpielPhasen || (exports.SpielPhasen = {}));
;
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl) {
        this.navCtrl = navCtrl;
        // Platz für Attribute der Klasse:
        this.spielFeld = [[], [], [], [], [], []]; // Ein Element kann " " oder "X" oder "O" beinhalten.
        this.SpielPhasen = SpielPhasen; // Damit HTML-Template Zugriff auf den Enum-Typ hat
        this.anzSteine = 21;
        console.log("Konstruktor der Klasse TicTacToePage wurde aufgerufen.");
        this.neuesSpiel();
    }
    HomePage.prototype.neuesSpiel = function () {
        console.log("Neues Spiel!");
        this.aktSpieler = "r";
        this.spielFeld = [[" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "]];
        this.gewinnerFeld = [[" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "],
            [" ", " ", " ", " ", " ", " ", " "]];
        this.status = SpielPhasen.Laeuft;
        this.anzSteineGelb = this.anzSteine;
        this.anzSteineRot = this.anzSteine;
    };
    HomePage.prototype.leeren = function () {
        var i, j;
        for (i = 0; i < this.spielFeld.length; i++) {
            for (j = 0; j < this.spielFeld[i].length; i++) {
                this.spielFeld[i][j] = " ";
            }
        }
    };
    HomePage.prototype.feldHintergrundFarbe = function (x, y) {
        if (this.gewinnerFeld[x][y] == "r") {
            return ("red");
        }
        else if (this.gewinnerFeld[x][y] == "g") {
            return ("yellow");
        }
        else {
            return ("");
        }
    };
    //Platz für Methoden der Klasse:
    HomePage.prototype.userZug = function (spalte) {
        var i;
        for (i = (this.spielFeld.length - 1); i >= 0; i--)
            if (this.spielFeld[i][spalte] == " ") {
                this.spielFeld[i][spalte] = this.aktSpieler;
                break;
            }
        this.gewinnerSteineTest(i, spalte);
        if (this.aktSpieler == "r") {
            this.anzSteineRot--;
            this.aktSpieler = "g";
        }
        else if (this.aktSpieler == "g") {
            this.anzSteineGelb--;
            this.aktSpieler = "r";
        }
        if (this.status == SpielPhasen.Laeuft && this.anzSteineRot == 0 && this.anzSteineGelb == 0) {
            this.status = SpielPhasen.Unentschieden;
        }
    };
    HomePage.prototype.gewinnerSteineTest = function (zeile, spalte) {
        var h = 1, v = 1, d = 1, g = 1;
        var x, y;
        x = zeile;
        y = spalte;
        while (y < 6 && this.spielFeld[x][++y] == this.aktSpieler) {
            h++;
        }
        y = spalte;
        while (y > 0 && this.spielFeld[x][--y] == this.aktSpieler) {
            h++;
        }
        y = spalte;
        while (x < 5 && this.spielFeld[++x][y] == this.aktSpieler) {
            v++;
        }
        x = zeile;
        while (x > 0 && this.spielFeld[--x][y] == this.aktSpieler) {
            v++;
        }
        x = zeile;
        while (x < 5 && y < 6 && this.spielFeld[++x][++y] == this.aktSpieler) {
            d++;
        }
        x = zeile;
        y = spalte;
        while (x > 0 && y > 0 && this.spielFeld[--x][--y] == this.aktSpieler) {
            d++;
        }
        x = zeile;
        y = spalte;
        while (x < 5 && y > 0 && this.spielFeld[++x][--y] == this.aktSpieler) {
            g++;
        }
        x = zeile;
        y = spalte;
        while (x > 0 && y < 6 && this.spielFeld[--x][++y] == this.aktSpieler) {
            g++;
        }
        x = zeile;
        y = spalte;
        if (h > 3 || v > 3 || d > 3 || g > 3) {
            if (this.aktSpieler == "r") {
                this.status = SpielPhasen.GewonnenR;
            }
            else if (this.aktSpieler == "g") {
                this.status = SpielPhasen.GewonnenG;
            }
            this.gewinnerFarbe(spalte, zeile, h, v, d, g);
        }
    };
    HomePage.prototype.gewinnerFarbe = function (spalte, zeile, h, v, d, g) {
        var x, y;
        x = zeile;
        y = spalte;
        this.gewinnerFeld[x][y] = this.aktSpieler;
        while (h > 3 && y < 6 && this.spielFeld[x][++y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        y = spalte;
        while (h > 3 && y > 0 && this.spielFeld[x][--y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        y = spalte;
        while (v > 3 && x < 5 && this.spielFeld[++x][y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        while (v > 3 && x > 0 && this.spielFeld[--x][y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        while (d > 3 && x < 5 && y < 6 && this.spielFeld[++x][++y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        y = spalte;
        while (d > 3 && x > 0 && y > 0 && this.spielFeld[--x][--y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        y = spalte;
        while (g > 3 && x < 5 && y > 0 && this.spielFeld[++x][--y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        y = spalte;
        while (g > 3 && x > 0 && y < 6 && this.spielFeld[--x][++y] == this.aktSpieler) {
            this.gewinnerFeld[x][y] = this.aktSpieler;
        }
        x = zeile;
        y = spalte;
    };
    HomePage.prototype.spalteVoll = function (spalte) {
        if (this.status != this.SpielPhasen.Laeuft) {
            return (true);
        }
        else if (this.spielFeld[0][spalte] == " ") {
            return (false);
        }
        else {
            return (true);
        }
    };
    HomePage = __decorate([
        core_1.Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        })
    ], HomePage);
    return HomePage;
}());
exports.HomePage = HomePage;
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
