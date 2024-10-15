import java.util.Queue;

public class Main {
    public static void main(String[] args) {
        Auto a1 = new Auto("BMW", "102-2", "bianco pittura");
        Auto a2 = new Auto("AUDI", "1-2", "viola mare");
        Auto a3 = new Auto("TOYOTA", "43", "rosso sangue");

        System.out.println(a1.getInfo());
        System.out.println(a2.getInfo());
        System.out.println(a3.getInfo());

    }
}

