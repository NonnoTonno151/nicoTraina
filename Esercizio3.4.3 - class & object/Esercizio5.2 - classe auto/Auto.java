class Auto {
    public String marca;
    public String modello;
    public String colore;

    // Costruttore
    public Auto(String marca, String modello, String colore) {
        this.marca = marca;
        this.modello = modello;
        this.colore = colore;
    }

    public void cambiaColore(String nuovoColore) {
        this.colore = nuovoColore;
    }

    public String getInfo() {
        return "Marca: " + marca + ", Modello: " + modello + ", Colore: " + colore;
    }
}
