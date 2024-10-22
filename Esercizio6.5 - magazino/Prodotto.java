import java.util.ArrayList;

public class Prodotto {
    public String nome;
    public int codice;
    public int quantita_totale;
    public int prezzo_unitario;


    public Prodotto(String nome, int codice, int quantita_totale, int prezzo_unitario) {
        this.nome = nome;
        this.codice = codice;
        this.quantita_totale = quantita_totale;
        this.prezzo_unitario = prezzo_unitario;
    }

    public int aggiornaQuantita(int quantita) {
        return this.quantita_totale += quantita;
    }

    public int calcolaValoreTotale() {
        return this.quantita_totale * this.prezzo_unitario;
    }
}
