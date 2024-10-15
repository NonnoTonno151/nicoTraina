import java.util.*;

public class esercizio {
	public static void main(String[] arg) {
		Scanner input_user = new Scanner(System.in);

		float[] number = new float[7];
		float user_number = 0;		
		int count = 0;

		for(int i = 0; i < 7; i++) {
			if (i < 5) {
				System.out.print("Inserisci nota materia: ");	
			} else {
				System.out.print("Inserisci nota progetto: ");	
			}
			user_number = Float.parseFloat(input_user.nextLine());
			number[i] = user_number;
		}
		
		float nota1 = number[0];
		float nota2 = number[1];
		float nota3 = number[2];
		float nota4 = number[3];
		float nota5 = number[4];
		float p1    = number[5];
		float p2    = number[6];
		
		double media_note = nota1 * 0.10 + nota2 * 0.15 + nota3 * 0.20 + nota4 * 0.25 + nota5 * 0.3;
		double media_progetti = (p1+p2)/2;
		double nota_finale = (media_note + media_progetti)/2;
		
		System.out.println("Media delle note: " + media_note);
		System.out.println("Media dei progetti: " + media_progetti);
		System.out.println("Nota finale: " + nota_finale);

	}
}