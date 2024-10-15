class GetQuadrato {
    public int side;

    public GetQuadrato(int side) {
        if (side < 0) {
            System.out.println("Il lato del quadrato non deve essere minore di 0");
        }
        this.side = side;
    }

    public int getArea() {
        return side * side;
    }

    public int getPerimeter() {
        return side * 4;
    }

    public void draw() {
        for (int riga = 1; riga <= side; riga++) {
            for (int colonna = 1; colonna <= side; colonna++) {
                if ((colonna == 1 || colonna == side) || (riga == 1 || riga == side)) {
                    System.out.print(" * ");
                } else {
                    System.out.print("   ");
                }
            }
            System.out.println(" ");
        }
    }

    public String getDimension() {
        return side + "x" + side;
    }

}

