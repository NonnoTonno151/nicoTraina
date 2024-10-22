import java.util.*;

public class Magazzino {
    private ArrayList<Prodotto> prodotti;

    // Costruttore
    public Magazzino() {
        prodotti = new ArrayList<>();
    }

    public void aggiungiProdotto(Prodotto prodotto) {
        prodotti.add(prodotto);
    }

    public void rimuoviProdotto(Prodotto prodotto) {
        prodotti.s(prodotto);
    }

    public void cercaProdotto(int codice) {
        prodotti.remove(prodotto);
    }

}