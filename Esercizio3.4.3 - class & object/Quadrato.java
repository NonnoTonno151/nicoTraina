public class Quadrato {
    public static void main(String[] args) {
        GetQuadrato q1 = new GetQuadrato(10);

        System.out.println("Area quadrato: " + q1.getArea());
        System.out.println("Perimetro quadrato: " + q1.getPerimeter());

        q1.draw();
        System.out.println("Dimensione quadrato: " + q1.getDimension());

    }
}



