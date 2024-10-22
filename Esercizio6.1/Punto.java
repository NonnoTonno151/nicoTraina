public class Punto {
    public Double x;
    public Double y;

    public Punto(Double x, Double y) {
        this.x = x;
        this.y = y;
    }

    public double calcolaDistanza() {
        return Math.sqrt(Math.pow((x - x), 2) + Math.pow((y - y), 2));
    }

    public String determinaQuadrante() {
        if (this.x < 0) {
            if (this.y < 0) {
                return "Quadrante 3";
            } else {
                return "Quadrante 1";
            }
        } else if (this.y < 0) {
            return "Quadrante 2";
        } else {
            return "Quadrante 4";
        }
    }

    public String toString() {
        String cordinata = "(" + this.x + ", " + this.y + ")";
        String distanza = String.valueOf(calcolaDistanza());
        String quadrante = this.determinaQuadrante();
        return cordinata + " - " + quadrante + " - " + distanza;
    }
}
